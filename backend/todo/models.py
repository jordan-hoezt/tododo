from django.db import models
from django.utils.timezone import now, datetime

# Create your models here.

class Todo(models.Model):
	title = models.CharField(max_length=120, blank=False)
	description = models.TextField(blank=True)
	completed = models.BooleanField(default=False)
	date = models.DateTimeField(name='Added', default=now)

	def __str__(self):
		return self.title


