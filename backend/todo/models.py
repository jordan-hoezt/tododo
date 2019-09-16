from django.db import models
from django.utils.timezone import datetime

# Create your models here.

class Todo(models.Model):
	title = models.CharField(max_length=120, blank=False)
	description = models.TextField(blank=True)
	completed = models.BooleanField(default=False)
	date = models.DateTimeField(name='Added', default=datetime.now())

	def __str__(self):
		return self.title


