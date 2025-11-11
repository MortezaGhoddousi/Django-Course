from django.db import models

# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=150)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=10)
    date = models.DateTimeField(auto_now_add=True)

