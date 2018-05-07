from drf_auto_endpoint.endpoints import Endpoint
from drf_auto_endpoint.router import router, register

from .models import Product, Category


@register
class ProductEndpoint(Endpoint):
    model = Product

    page_size = 10
    list_display = ['picture', 'name', 'category', 'sale_type', 'price' ]
    search_fields = ['name', ]
    filter_fields = ['category_id', ]
    ordering_fields = ['name', ]

router.register(Category)
