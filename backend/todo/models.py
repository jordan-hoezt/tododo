from django.db import models
from django.utils.timezone import now, datetime

now = datetime.now()

# Create your models here.

class Todo(models.Model):
    title = models.CharField(max_length=120, blank=False)
    description = models.TextField(blank=True)
    completed = models.BooleanField(default=False)
    added_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
