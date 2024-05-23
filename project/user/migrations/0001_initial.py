# Generated by Django 5.0.6 on 2024-05-23 16:17

import django.core.validators
import django.db.models.deletion
import django.utils.timezone
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='UserAccount',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type_job', models.CharField(default='user', max_length=50)),
                ('company_name', models.CharField(blank=True, max_length=255, null=True)),
                ('email', models.EmailField(default='default@default.com', max_length=254)),
                ('user', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50)),
                ('purpose', models.CharField(max_length=100)),
                ('date', models.DateField(default=django.utils.timezone.now, null=True)),
                ('user_account', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='user.useraccount')),
            ],
        ),
        migrations.CreateModel(
            name='License',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('where', models.CharField(max_length=100)),
                ('when', models.CharField(max_length=100)),
                ('user_account', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='user.useraccount')),
            ],
        ),
        migrations.CreateModel(
            name='Exper',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('company', models.CharField(max_length=100)),
                ('start', models.DateField(null=True)),
                ('end', models.DateField(default=django.utils.timezone.now, null=True)),
                ('user_account', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='user.useraccount')),
            ],
        ),
        migrations.CreateModel(
            name='Education',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(choices=[('high_school', 'High School'), ('bachelor', 'Bachelor'), ('master', 'Master'), ('doctorate', 'Doctorate')], max_length=20)),
                ('institute', models.CharField(max_length=100)),
                ('start', models.CharField(max_length=100)),
                ('end', models.DateField(default=django.utils.timezone.now, null=True)),
                ('user_account', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='user.useraccount')),
            ],
        ),
        migrations.CreateModel(
            name='Cert',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('where', models.CharField(max_length=100)),
                ('start', models.DateField(default=django.utils.timezone.now, null=True)),
                ('end', models.DateField(default=django.utils.timezone.now, null=True)),
                ('user_account', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='user.useraccount')),
            ],
        ),
        migrations.CreateModel(
            name='Award',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(db_index=True, max_length=100)),
                ('purpose', models.CharField(db_index=True, max_length=100)),
                ('provider', models.CharField(db_index=True, max_length=100)),
                ('date', models.DateField(db_index=True)),
                ('user_account', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='user.useraccount')),
            ],
        ),
        migrations.CreateModel(
            name='Skill',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(db_index=True, max_length=100)),
                ('level', models.PositiveSmallIntegerField(default=3, validators=[django.core.validators.MaxValueValidator(100), django.core.validators.MinValueValidator(1)])),
                ('user_account', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='skills', to='user.useraccount')),
            ],
            options={
                'unique_together': {('user_account', 'name')},
            },
        ),
        migrations.CreateModel(
            name='Interest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(db_index=True, max_length=100)),
                ('since', models.DateField(default=django.utils.timezone.now, null=True)),
                ('user_account', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='interests', to='user.useraccount')),
            ],
            options={
                'unique_together': {('user_account', 'title')},
            },
        ),
    ]
