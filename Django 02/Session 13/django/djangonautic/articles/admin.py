from django.contrib import admin
from .models import ArticleDB

# Register your models here.

class ArticleAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "slug", "date")

admin.site.register(ArticleDB, ArticleAdmin)
