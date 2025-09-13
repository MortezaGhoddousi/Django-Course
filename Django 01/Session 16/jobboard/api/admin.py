from django.contrib import admin
from .models import Users, Jobs, UserEmp

# Register your models here.
class adminUser(admin.ModelAdmin):
    list_display = ('id', 'email', 'date')

class adminUserEmp(admin.ModelAdmin):
    list_display = ('id', 'title', 'email', 'date')

admin.site.register(Users, adminUser)
admin.site.register(UserEmp, adminUserEmp)
admin.site.register(Jobs)