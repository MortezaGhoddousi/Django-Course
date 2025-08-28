from django.http import JsonResponse
from products.models import Product, UserProduct
from accounts.models import Subscriber
import json


# Create your views here.
def products(request):
    allProducts = Product.objects.values()
    return JsonResponse(list(allProducts), safe=False)

def subscribe(request):
    if request.method == "POST":
        data = json.loads(request.body)
        email = data.get("email")
        subscriber = Subscriber()
        subscriber.email = email
        subscriber.save()
        return JsonResponse({"success": True})
    
def addProduct(request):
    if request.method == 'POST':
        userProduct = UserProduct()
        data = json.loads(request.body)
        userProduct.userID = data['userID']
        userProduct.productID = data['productID']
        userProduct.save()
        return JsonResponse({"success": True})



