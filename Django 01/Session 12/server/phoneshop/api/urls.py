from django.urls import path
from . import views

urlpatterns = [
    path('products/', views.products),
    path('subscribe/', views.subscribe),
    path('addProduct/', views.addProduct),
]