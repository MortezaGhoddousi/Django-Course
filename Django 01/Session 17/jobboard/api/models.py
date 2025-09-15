from django.db import models

# Create your models here.
class Users(models.Model):
    password = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    date = models.DateTimeField(auto_now_add=True)
    
class UserEmp(models.Model):
    password = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    image = models.ImageField(upload_to='images/')
    title = models.CharField(max_length=100)
    date = models.DateTimeField(auto_now_add=True)
   
class Jobs(models.Model):
    employer = models.IntegerField()
    title = models.CharField(max_length=100)
    city = models.CharField(max_length=255)
    price = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
