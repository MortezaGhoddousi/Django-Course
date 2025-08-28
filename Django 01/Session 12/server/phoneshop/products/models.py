from django.db import models

# Create your models here.
class Product(models.Model):
    title = models.CharField(max_length=100)
    price = models.FloatField()
    category = models.CharField(max_length=100)
    img = models.CharField(max_length=200)
    
    def __str__(self):
        return self.title
    
class UserProduct(models.Model):
    userID = models.IntegerField()
    productID = models.IntegerField()
    number = models.IntegerField(default=1)
