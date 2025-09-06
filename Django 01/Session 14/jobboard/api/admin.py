from django.contrib import admin
from .models import Users, Jobs

# Register your models here.
class adminUser(admin.ModelAdmin):
    list_display = ('id', 'username', 'email', 'date', 'isEmployer')

admin.site.register(Users, adminUser)
admin.site.register(Jobs)