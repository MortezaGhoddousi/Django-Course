from django.shortcuts import render, redirect
from .models import User
from django.contrib.auth import login

def signup(request):
    if request.method == 'POST':
        user = User()
        user.username = request.POST['username']
        user.password = request.POST['password']
        user.save()
        request.session['user_id'] = user.id
        return redirect('home')
    return render(request,'signup.html')
def login (request):
    error = False
    if request.method == 'POST':
        username = request.POST.get('username')       
        password = request.POST.get('password')       
        authenticated_user = User.objects.filter(username=username, password=password).exists()
        if authenticated_user:
            user = User.objects.get(username=username, password=password)
            request.session['user_id'] = user.id
            return redirect('home')
        else:
            error = True
            
    return  render(request,'login.html', {'error': error})

def signout(request):
    request.session.pop('user_id', None)
    return redirect('login')
