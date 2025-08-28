from django.shortcuts import render, redirect
from products.models import Product, UserProduct
from django.forms.models import model_to_dict
import json
from django.http import JsonResponse

def getUPS(user_id):
    userProduct = UserProduct.objects.filter(userID=user_id)
    ups = []
    for i in userProduct:
        ups.append(i.productID)
    return ups


def card(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            userID = data.get("userID")
            
            if not userID:
                return JsonResponse({
                    "success": False,
                    "message": "UserID is required"
                }, status=400)
            
            ups = getUPS(userID) 
            products = Product.objects.filter(id__in=ups)
            
            products_data = [model_to_dict(product) for product in products]
            
            return JsonResponse({
                "success": True,
                "products": products_data
            })
            
        except json.JSONDecodeError:
            return JsonResponse({
                "success": False,
                "message": "Invalid JSON"
            }, status=400)
        except Exception as e:
            return JsonResponse({
                "success": False,
                "message": f"Server error: {str(e)}"
            }, status=500)
    
    return JsonResponse({
        "success": False,
        "message": "Only POST method allowed"
    }, status=405)

