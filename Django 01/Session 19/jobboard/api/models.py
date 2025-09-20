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
    user_ids = models.JSONField(default=list, blank=True)
   
class Jobs(models.Model):
    employer = models.IntegerField()
    title = models.CharField(max_length=100)
    city = models.CharField(max_length=255)
    price = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
    
class CV(models.Model):
    related_id = models.IntegerField(unique=True)
    file = models.FileField(upload_to='cvs/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"CV {self.id} for entity {self.related_id}"
