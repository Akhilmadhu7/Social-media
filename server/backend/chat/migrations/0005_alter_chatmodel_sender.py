# Generated by Django 4.0.6 on 2022-12-13 05:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0004_remove_chatmodel_username_chatmodel_sender_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chatmodel',
            name='sender',
            field=models.CharField(blank=True, max_length=120, null=True),
        ),
    ]
