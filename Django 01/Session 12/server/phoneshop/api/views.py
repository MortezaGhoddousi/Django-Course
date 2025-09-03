from django.http import JsonResponse
from products.models import Product, UserProduct
from django.shortcuts import get_object_or_404
from accounts.models import Subscriber
import json
from django.views.decorators.csrf import csrf_exempt

def getUPS(user_id):
    userProduct = UserProduct.objects.filter(userID=user_id)
    ups = []
    for i in userProduct:
        ups.append({"productID": i.productID, "number": i.number})
    return ups

# Create your views here.
def products(request):
    allProducts = Product.objects.values()
    return JsonResponse(list(allProducts), safe=False)

@csrf_exempt
def userAllProducts(request): 
    if request.method == 'POST':
        data = json.loads(request.body)
        userID = data.get('userID')
        ups = getUPS(userID)
        return JsonResponse({"ups": ups})


@csrf_exempt
def subscribe(request):
    if request.method == "POST":
        data = json.loads(request.body)
        email = data.get("email")
        subscriber = Subscriber()
        subscriber.email = email
        subscriber.save()
        return JsonResponse({"success": True})

@csrf_exempt   
def addProduct(request):
    if request.method == 'POST':
        userProduct = UserProduct()
        data = json.loads(request.body)
        userProduct.userID = data['userID']
        userProduct.productID = data['productID']
        userProduct.save()
        return JsonResponse({"success": True})

@csrf_exempt   
def increase(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        userID = data.get('userID')  #data['userID']
        productID = data.get('productID')  #data['productID']
        userProduct = UserProduct.objects.get(userID = userID, productID = productID)
        userProduct.number = userProduct.number + 1
        userProduct.save()
        return JsonResponse({"success": True})
    
@csrf_exempt   
def decrease(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        userID = data.get('userID')  #data['userID']
        productID = data.get('productID')  #data['productID']
        userProduct = UserProduct.objects.get(userID = userID, productID = productID)
        if userProduct.number > 1:
            userProduct.number = userProduct.number - 1
            userProduct.save()
        else:
            userProduct.save()
        return JsonResponse({"success": True})
    
@csrf_exempt   
def delete(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        userID = data.get('userID')  #data['userID']
        productID = data.get('productID')  #data['productID']
        user_product = get_object_or_404(UserProduct, userID=userID, productID=productID)
        user_product.delete()
        return JsonResponse({"success": True, "message": "product is deleted"})




