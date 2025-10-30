from django.urls import path
from . import views

app_name = 'articleAppName'

urlpatterns = [
    path('', views.article_list, name="list"),
    path('<slug:slugVariable>/', views.article_detail, name='detail'),
]
