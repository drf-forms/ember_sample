# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-08-30 13:59
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('products', '0001_initial'),
        ('crm', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Invoice',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(auto_now_add=True)),
                ('invoice_type', models.CharField(choices=[('ci', 'Client'), ('si', 'Supplier')], max_length=2)),
                ('state', models.CharField(choices=[('draft', 'Draft'), ('open', 'Open'), ('paid', 'Paid')], max_length=5)),
                ('related_party', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='invoices', to='crm.Company')),
            ],
        ),
        migrations.CreateModel(
            name='InvoiceLine',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.PositiveIntegerField()),
                ('position', models.PositiveSmallIntegerField(default=0)),
                ('invoice', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='lines', to='accounting.Invoice')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='+', to='products.Product')),
            ],
        ),
    ]
