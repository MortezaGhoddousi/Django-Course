from django.shortcuts import render, redirect
from products.models import Product, UserProduct
from accounts.models import Subscriber
import json

def homepage(request):
    products = Product.objects.all()
    loggedIn = False
    if 'user_id' in request.session:
        user_id = request.session['user_id']
        loggedIn = True
    return render(request, 'home.html', {'products': products[0:3], 'loggedIn': loggedIn})

def subscribe(request):
    if request.method == "POST":
        email = request.POST.get('email')
        subscriber = Subscriber()
        subscriber.email = email
        subscriber.save()
        return redirect('home')
    
def addProduct(request):
    if request.method == 'POST':
        userProduct = UserProduct()
        data = json.loads(request.body)
        userProduct.userID = data['userId']
        userProduct.productID = data['productId']
        userProduct.save()
        return redirect('home')