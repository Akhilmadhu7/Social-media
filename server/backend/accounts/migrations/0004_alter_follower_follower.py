# Generated by Django 4.0.6 on 2022-11-18 13:15

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_follower'),
    ]

    operations = [
        migrations.AlterField(
            model_name='follower',
            name='follower',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
