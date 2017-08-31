from django.contrib.contenttypes.models import ContentType
from django.core.urlresolvers import reverse

from levit_report.models import Document


class WithDocumentsMixin(object):

    def get_custom_actions(self):
        ct = ContentType.objects.get_for_model(self.model)
        return [{
            'type': 'download',
            'slug': 'download_{}'.format(report.slug),
            'url': reverse('print', kwargs={'slug': report.slug, 'object_id': ':id'}),
            'icon_class': 'fa fa-download',
            'btn_class': 'btn btn-primary',
            'text': 'Download {}'.format(report.name),
        } for report in ct.reports.all()] + super(WithDocumentsMixin, self).get_custom_actions()

    def get_bulk_actions(self):
        ct = ContentType.objects.get_for_model(self.model)
        return [{
            'type': 'download',
            'slug': 'download_{}'.format(report.slug),
            'url': reverse('print', kwargs={'slug': report.slug}),
            'icon_class': 'fa fa-download',
            'btn_class': 'btn btn-primary',
            'text': 'Download {}'.format(report.name),
        } for report in ct.reports.all()] + super(WithDocumentsMixin, self).get_bulk_actions()
