# Generated by Django 4.0.6 on 2022-12-13 05:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0002_alter_chatmodel_reciever_alter_chatmodel_sender'),
    ]

    operations = [
        migrations.RenameField(
            model_name='chatmodel',
            old_name='sender',
            new_name='username',
        ),
    ]