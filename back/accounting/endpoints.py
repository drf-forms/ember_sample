from django.urls import reverse
from django.contrib.contenttypes.models import ContentType
from django.shortcuts import get_object_or_404

from rest_framework.response import Response

from levit_report.models import Document

from drf_auto_endpoint.endpoints import Endpoint
from drf_auto_endpoint.decorators import custom_action
from drf_auto_endpoint.router import router, register

from .models import Invoice, InvoiceLine


@register
class InvoiceEndpoint(Endpoint):

    model = Invoice
    list_display = ['id', 'invoice_type', 'related_party', 'total', 'state', ]
    filter_fields = ['related_party_id', 'state', ]

    custom_actions = [
        {
            'type': 'modelMethod',
            'method': 'makeDraft',
            'icon_class': 'fa fa-fire',
            'btn_class': 'btn btn-warning',
            'text': 'Make draft',
            'display_condition': {
                'operator': 'eq',
                'value': 'open',
                'property_path': 'state',
            },
        }, {
            'type': 'modelMethod',
            'method': 'open',
            'icon_class': 'fa fa-check',
            'btn_class': 'btn btn-default',
            'text': 'Open',
            'display_condition': {
                'operator': 'in',
                'value': ['draft', 'paid'],
                'property_path': 'state',
            },
            'allowBulk': True,
        }
    ]

    @custom_action(method='POST', icon_class='fa fa-money', btn_class='btn btn-success', text='Pay',
                   pushPayload=True, allowBulk=True,
                   display_condition={'operator': 'eq', 'value': 'open', 'property_path': 'state', })
    def pay(self, request, pk):
        obj = get_object_or_404(self.model, pk=pk)
        obj.state = 'paid'
        obj.save()
        serializer = self.get_serializer(obj)
        rv = {}
        rv[self.get_url()] = [serializer.data, ]
        return Response(rv)

    def get_custom_actions(self):
        ct = ContentType.objects.get_for_model(self.model)
        return [{
            'type': 'download',
            'url': reverse('print', kwargs={ 'slug': report.slug, 'object_id': ':id'}),
            'icon_class': 'fa fa-download',
            'btn_class': 'btn btn-primary',
            'text': 'Download {}'.format(report.name),
        } for report in ct.reports.all()] + super(InvoiceEndpoint, self).get_custom_actions()

    def get_bulk_actions(self):
        ct = ContentType.objects.get_for_model(self.model)
        return [{
            'type': 'download',
            'url': reverse('print', kwargs={ 'slug': report.slug}),
            'icon_class': 'fa fa-download',
            'btn_class': 'btn btn-primary',
            'text': 'Download {}'.format(report.name),
        } for report in ct.reports.all()]


router.register(InvoiceLine, list_me=False)
