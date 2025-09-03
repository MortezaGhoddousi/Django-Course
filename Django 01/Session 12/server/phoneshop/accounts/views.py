from .models import User
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def signup(request):
    if request.method == 'POST':

        data = json.loads(request.body)
        username = data.get("username")
        password = data.get("password")

        user = User()
        user.username = username
        user.password = password
        user.save()
        return JsonResponse({
                "success": True,
                "message": "Logged in",
                "userID": user.id,
            })
    
@csrf_exempt
def login(request):
    print(request.method)
    if request.method == "POST":
        data = json.loads(request.body)
        username = data.get("username")
        password = data.get("password")

        try:
            user = User.objects.get(username=username, password=password)
            return JsonResponse({
                "success": True,
                "message": "Logged in",
                "userID": user.id,
            })
        except User.DoesNotExist:
            return JsonResponse({
                "success": False,
                "message": "Invalid username or password"
            })
    return JsonResponse({"success": False, "message": "Invalid request"}, status=400)
            

