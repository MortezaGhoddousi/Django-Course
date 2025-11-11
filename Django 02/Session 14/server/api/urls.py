from django.urls import path
from . import views

urlpatterns = [
    path('add-user/', views.add_user, name='add'),
    path('get-all-user/', views.get_all_user, name='all'),
    path('get-user/<int:id>/', views.get_user, name='getUser'),
    path('update/<int:id>/', views.update_user, name='update'),
    path('delete/<int:id>/', views.delete_user, name='delete'),
]