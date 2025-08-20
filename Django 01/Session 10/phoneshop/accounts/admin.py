from django.contrib import admin
from .models import User, Subscriber

# Register your models here.

class SubscriberAdmin(admin.ModelAdmin):
    list_display = ('email', 'date')

admin.site.register(User)
admin.site.register(Subscriber, SubscriberAdmin)
