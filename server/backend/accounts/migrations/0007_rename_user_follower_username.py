# Generated by Django 4.0.6 on 2022-11-18 17:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0006_alter_follower_user'),
    ]

    operations = [
        migrations.RenameField(
            model_name='follower',
            old_name='user',
            new_name='username',
        ),
    ]