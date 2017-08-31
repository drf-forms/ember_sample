from drf_auto_endpoint.endpoints import Endpoint
from drf_auto_endpoint.router import router, register

from .models import Company, Contact, ContactMechanism, Segment


@register
class ContactEndpoint(Endpoint):
    model = Contact
    fields = ['__str__', 'id', 'short_name', 'long_name', 'company', 'contactmechanisms',
              'default_mechanism']
    list_display = ['long_name', 'company', ]
    search_fields = ['long_name', 'short_name', ]
    filter_fields = ['company_id', ]
    oredering_fields = ['long_name', ]


@register
class CompanyEndpoint(Endpoint):
    model = Company
    list_display = ['name', 'is_supplier', 'is_client', ]
    list_editable = ['is_supplier', 'is_client', ]
    search_fields = ['name', ]
    filter_fields = ['is_supplier', 'is_client', ]
    ordering_fields = ['name', ]
    save_twice = True


router.register(ContactMechanism, list_me=False)
router.register(Segment)
