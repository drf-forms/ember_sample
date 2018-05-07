from functools import reduce

from django.db import models

from crm.models import Company
from products.models import Product


INVOICE_TYPES = (
    ('ci', 'Client'),
    ('si', 'Supplier'),
)

INVOICE_STATES = (
    ('draft', 'Draft'),
    ('open', 'Open'),
    ('paid', 'Paid'),
)


class Invoice(models.Model):

    date = models.DateField(auto_now_add=True)
    invoice_type = models.CharField(max_length=2, choices=INVOICE_TYPES)
    related_party = models.ForeignKey(Company, related_name='invoices', on_delete=models.CASCADE)
    state = models.CharField(max_length=5, choices=INVOICE_STATES)

    @property
    def sign(self):
        if self.invoice_type == 'si':
            return '-'
        return ''

    @property
    def total(self):
        rv = 0
        for line in self.lines.all():
            rv += line.total
        return rv

    def __str__(self):
        return 'Invoice #{} - {} ({}{})'.format(self.id, self.related_party, self.sign, self.total)


class InvoiceLine(models.Model):

    invoice = models.ForeignKey(Invoice, related_name='lines', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, related_name='+', on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    position = models.PositiveSmallIntegerField(default=0)

    @property
    def total(self):
        return self.quantity * self.product.price

    def __str__(self):
        return '{} X {}'.format(self.quantity, self.product.name)
