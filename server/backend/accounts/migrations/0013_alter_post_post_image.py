# Generated by Django 4.0.6 on 2022-11-24 10:00

import accounts.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0012_post_liked_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='post_image',
            field=models.ImageField(blank=True, null=True, upload_to=accounts.models.post_pic),
        ),
    ]
