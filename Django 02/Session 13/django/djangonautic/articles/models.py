from django.db import models
from django.contrib.auth.models import User

class ArticleDB(models.Model):
    title = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    body = models.TextField()
    date = models.DateTimeField(auto_now_add=True)
    thumb = models.ImageField(default='default.png', blank=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, default=1)

    def __str__(self):
        return self.title
    
    def snippet(self):
        return self.body[:50] + ('...' if len(self.body) > 50 else '')