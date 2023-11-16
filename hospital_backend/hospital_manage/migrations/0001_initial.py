# Generated by Django 4.2.6 on 2023-11-12 13:29

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Departments',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('slug', models.SlugField()),
                ('description', models.TextField(max_length=1000)),
            ],
        ),
        migrations.CreateModel(
            name='Doctors',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('slug', models.SlugField()),
                ('speciality', models.CharField(max_length=50)),
                ('image', models.ImageField(upload_to='doctors')),
                ('department', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='hospital_manage.departments')),
            ],
        ),
        migrations.CreateModel(
            name='Timings',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timing', models.DateField(choices=[(datetime.date(2023, 11, 12), datetime.date(2023, 11, 12)), (datetime.date(2023, 11, 13), datetime.date(2023, 11, 13)), (datetime.date(2023, 11, 14), datetime.date(2023, 11, 14)), (datetime.date(2023, 11, 15), datetime.date(2023, 11, 15)), (datetime.date(2023, 11, 16), datetime.date(2023, 11, 16)), (datetime.date(2023, 11, 17), datetime.date(2023, 11, 17)), (datetime.date(2023, 11, 18), datetime.date(2023, 11, 18)), (datetime.date(2023, 11, 19), datetime.date(2023, 11, 19)), (datetime.date(2023, 11, 20), datetime.date(2023, 11, 20)), (datetime.date(2023, 11, 21), datetime.date(2023, 11, 21))], max_length=100)),
                ('token', models.IntegerField()),
                ('doctor', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='hospital_manage.doctors')),
            ],
            options={
                'unique_together': {('timing', 'doctor')},
            },
        ),
        migrations.CreateModel(
            name='Hospitals',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, unique=True)),
                ('slug', models.SlugField()),
                ('location', models.CharField(max_length=50)),
                ('description', models.TextField(max_length=1000)),
                ('image', models.ImageField(null=True, upload_to='hospitals/')),
                ('email', models.EmailField(max_length=254)),
                ('phone', models.CharField(max_length=10)),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='doctors',
            name='hospital',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='hospital_manage.hospitals'),
        ),
        migrations.AddField(
            model_name='doctors',
            name='user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.CreateModel(
            name='Booking',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, unique=True)),
                ('phone', models.BigIntegerField(unique=True)),
                ('address', models.CharField(max_length=500)),
                ('booked_at', models.DateField(auto_now_add=True)),
                ('is_saved', models.CharField(choices=[('P', 'Pending'), ('A', 'Approved'), ('F', 'Failed')], default='P', max_length=50)),
                ('token', models.IntegerField(default=0)),
                ('doctor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='hospital_manage.doctors')),
                ('hospital', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='hospital_manage.hospitals')),
                ('timing', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='hospital_manage.timings')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('doctor', 'timing', 'token')},
            },
        ),
    ]