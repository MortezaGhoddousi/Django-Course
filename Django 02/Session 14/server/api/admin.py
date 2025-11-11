from django.contrib import admin
from .models import User

class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'password', 'email', 'phone', 'date')

# Register your models here.
admin.site.register(User, UserAdmin)