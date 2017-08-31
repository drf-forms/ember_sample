from django.db import models


PRODUCT_TYPE = (
    ('p', 'Product'),
    ('s', 'Service'),
)

PERIODS = (
    ('1m', '1 month'),
    ('3m', '3 months'),
    ('1y', '1 year'),
)


class Category(models.Model):

    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']


class Product(models.Model):

    name = models.CharField(max_length=255)
    category = models.ForeignKey(Category, related_name='products')
    sale_type = models.CharField(max_length=1, choices=PRODUCT_TYPE)
    period = models.CharField(max_length=2, choices=PERIODS, blank=True, null=True)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    picture = models.ImageField(null=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return '{} ({})'.format(self.name, self.price)
