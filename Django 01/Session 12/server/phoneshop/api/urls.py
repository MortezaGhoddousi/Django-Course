from django.urls import path
from . import views

urlpatterns = [
    path('products/', views.products),
    path('userallproducts/', views.userAllProducts),
    path('subscribe/', views.subscribe),
    path('addProduct/', views.addProduct),
    path('increaseProduct/', views.increase),
    path('decreaseProduct/', views.decrease),
    path('deleteProduct/', views.delete),
]