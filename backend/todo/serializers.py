from rest_framework import serializers
from django.core.serializers.json import DjangoJSONEncoder
from .models import Todo

class Todoserializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ['id', 'title', 'description', 'completed', 'added_date']
        read_only_fields = ['added_date']
