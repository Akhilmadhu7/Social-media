# Generated by Django 4.0.6 on 2022-12-13 19:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0012_rename_notified_user_notifications_notify_receiver_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='notifications',
            name='thread_name',
            field=models.CharField(blank=True, max_length=120, null=True),
        ),
    ]