# Generated by Django 2.2.5 on 2019-09-16 06:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0005_auto_20190916_0610'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todo',
            name='Added',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
