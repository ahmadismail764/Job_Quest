# Generated by Django 5.0.6 on 2024-05-24 00:30

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='application',
            name='experience',
            field=models.IntegerField(validators=[django.core.validators.MinValueValidator(
                0), django.core.validators.MaxValueValidator(60)]),
        ),
        migrations.AlterField(
            model_name='job',
            name='salary',
            field=models.DecimalField(decimal_places=2, max_digits=10, validators=[
                                      django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(999999999.99)]),
        ),
        migrations.AlterField(
            model_name='job',
            name='years_of_experience',
            field=models.IntegerField(validators=[django.core.validators.MinValueValidator(
                0), django.core.validators.MaxValueValidator(60)]),
        ),
    ]