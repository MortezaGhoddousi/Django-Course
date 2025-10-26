from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('articles/', include("articles.urls")),
    path('home', views.homepage),
    path('about', views.about)
]
