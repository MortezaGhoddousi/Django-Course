from django.contrib import admin
from django.urls import path, include
from . import views
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.homepage, name='home'),
    path('products/', views.product, name='products'),
    path('about/', views.about, name='about'),
    path('blog/', views.blog, name='blog'),
    path('contact/', views.contact, name='contact'),
    path('card/', views.card, name='card'),
    path('subscribe/', views.subscribe, name='subscribe'),
    path('addProduct/', views.addProduct, name='add'),
    path('accounts/',include('accounts.urls')),
]

urlpatterns += staticfiles_urlpatterns()
