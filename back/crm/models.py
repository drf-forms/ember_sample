from django.db import models
from django.db.models import Q


MECHANISM_CHOICES = (
    ('phone', 'Fixed phone'),
    ('mobile', 'Mobile phone'),
    ('email', 'E-Mail'),
    ('other', 'Other'),
)


class Company(models.Model):
    name = models.CharField(max_length=255)
    website = models.URLField(max_length=255, null=True, blank=True)
    default_contact = models.ForeignKey('crm.Contact', null=True, related_name='+')
    is_client = models.BooleanField(default=True)
    is_supplier = models.BooleanField(default=False)
    notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name


class Contact(models.Model):
    short_name = models.CharField(max_length=255, null=True, blank=True)
    long_name = models.CharField(max_length=255)
    company = models.ForeignKey(Company, related_name='employees')

    @property
    def default_mechanism(self):
        try:
            return self.contactmechanisms.first().__str__()
        except models.Model.DoesNotExist:
            return ''

    def __str__(self):
        return self.short_name if self.short_name else self.long_name


class ContactMechanism(models.Model):
    contact = models.ForeignKey(Contact, related_name='contactmechanisms')
    mechanism_type = models.CharField(max_length=6, choices=MECHANISM_CHOICES)
    value = models.CharField(max_length=255)
    position = models.PositiveSmallIntegerField(default=0)

    def __str__(self):
        return "{}: {}".format(self.mechanism_type, self.value)

    class Meta:
        ordering = ['position']


class Segment(models.Model):
    name = models.CharField(max_length=255)
    companies = models.ManyToManyField(Company, related_name='segments', blank=True)

    def __str__(self):
        return self.name
