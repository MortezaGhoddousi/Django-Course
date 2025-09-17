from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('check-login/', views.checkLogin, name='check-login'),
    path('check-emp-login/', views.checkEmpLogin, name='check-emp-login'),
    path('register-emp/', views.UploadLogoView.as_view(), name='upload-logo'),
    path('login/', views.login, name='login'),
    path('emp-login/', views.empLogin, name='emp-login'),
    path('jobs/', views.jobs, name='jobs'),
    path('send-cv/', views.sendCV, name='send_cv'),
    path('jobs/<int:id>/', views.handleJobs, name='handle'),
    path('cv/<int:id>/add/', views.addCV, name='add_cv'),

]