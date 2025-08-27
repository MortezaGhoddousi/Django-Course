from django.shortcuts import render, redirect
from products.models import Product, UserProduct
from accounts.models import Subscriber
import json

def getUPS(user_id):
    userProduct = UserProduct.objects.filter(userID=user_id)
    ups = []
    for i in userProduct:
        ups.append(i.productID)
    return ups

def homepage(request):
    products = Product.objects.all()
    loggedIn = False
    if 'user_id' in request.session:
        user_id = request.session['user_id']
        loggedIn = True
    ups = getUPS(user_id)
    return render(request, 'home.html', {'products': products[0:3], 'loggedIn': loggedIn, 'userProduct': ups, 'badge': len(ups)})

def product(request):
    products = Product.objects.all()
    loggedIn = False
    if 'user_id' in request.session:
        user_id = request.session['user_id']
        loggedIn = True
    ups = getUPS(user_id)
    return render(request, 'products.html', {'products': products, 'loggedIn': loggedIn, 'userProduct': ups, 'badge': len(ups)})

def about(request):
    loggedIn = False
    if 'user_id' in request.session:
        user_id = request.session['user_id']
        loggedIn = True
    ups = getUPS(user_id)
    return render(request, 'about_us.html', {'loggedIn': loggedIn, 'badge': len(ups)})

def blog(request):
    loggedIn = False
    if 'user_id' in request.session:
        user_id = request.session['user_id']
        loggedIn = True
    ups = getUPS(user_id)
    return render(request, 'blog.html', {'loggedIn': loggedIn, 'badge': len(ups)})

def contact(request):
    loggedIn = False
    if 'user_id' in request.session:
        user_id = request.session['user_id']
        loggedIn = True
    ups = getUPS(user_id)
    return render(request, 'contact_us.html', {'loggedIn': loggedIn, 'badge': len(ups)})

def card(request):
    loggedIn = False
    if 'user_id' in request.session:
        user_id = request.session['user_id']
        loggedIn = True
    ups = getUPS(user_id)
    products = Product.objects.filter(id__in=ups)
    return render(request, 'card.html', {'loggedIn': loggedIn, "products": products, 'badge': len(ups)})

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