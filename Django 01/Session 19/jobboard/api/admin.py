from django.contrib import admin
from .models import Users, Jobs, UserEmp, CV

# Register your models here.
class adminUser(admin.ModelAdmin):
    list_display = ('id', 'email', 'date')

class adminUserEmp(admin.ModelAdmin):
    list_display = ('id', 'title', 'email', 'date')



admin.site.register(Users, adminUser)
admin.site.register(UserEmp, adminUserEmp)
admin.site.register(Jobs)

@admin.register(CV)
class CVAdmin(admin.ModelAdmin):
    list_display = ('id', 'related_id', 'file', 'uploaded_at')