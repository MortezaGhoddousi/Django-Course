from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('upload-logo/', views.UploadLogoView.as_view(), name='upload-logo'),
    path('login/', views.login, name='login'),
    path('jobs/', views.jobs, name='jobs'),
    path('jobs/<int:id>/', views.handleJobs, name='handle'),
]