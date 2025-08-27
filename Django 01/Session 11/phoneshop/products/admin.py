from django.contrib import admin
from .models import Product, UserProduct

class adminProduct(admin.ModelAdmin):
    list_display = ('id', 'title', 'price', 'category')

class adminUserProduct(admin.ModelAdmin):
    list_display = ('userID', 'productID', 'number')

admin.site.register(Product, adminProduct)
admin.site.register(UserProduct, adminUserProduct)
