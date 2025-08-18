from django.shortcuts import render
from products.models import Product
def homepage(request):
    products = Product.objects.all()
    loggedIn = False
    if 'user_id' in request.session:
        user_id = request.session['user_id']
        loggedIn = True
    return render(request, 'home.html', {'products': products, 'loggedIn': loggedIn})