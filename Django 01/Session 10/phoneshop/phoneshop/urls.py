from django.contrib import admin
from django.urls import path, include
from . import views
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.homepage, name='home'),
    path('subscribe/', views.subscribe, name='subscribe'),
    path('addProduct/', views.addProduct, name='add'),
    path('accounts/',include('accounts.urls')),
]

urlpatterns += staticfiles_urlpatterns()
