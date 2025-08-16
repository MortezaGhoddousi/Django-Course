from django.db import models

# Create your models here.
class Product(models.Model):
    title = models.CharField()
    price = models.FloatField()
    category = models.CharField()
    img = models.CharField()
    def __str__(self):
        return self.title