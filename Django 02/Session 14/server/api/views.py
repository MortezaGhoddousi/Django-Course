# from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt
# import json
from .models import User

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer

# Create your views here.
# @csrf_exempt
@api_view(['POST'])
def add_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    # if request.method == 'POST':
    #     try:
    #         data = json.loads(request.body)
    #         user = User.objects.create(username=data['username'], password=data['password'],
    #                             email=data['email'], phone=data['phone'])
    #         return JsonResponse({'success': True, "userID": user.id})
    #     except:
    #         return JsonResponse({'success': False, "error": "the email must be unique"})
    # else:
    #     return JsonResponse({'success': False, "error": "method is not correct"})
@api_view(['GET'])
def get_all_user(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

@api_view(['GET'])
def get_user(request, id):
    try:
        user = User.objects.get(id=id)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = UserSerializer(user)
    return Response(serializer.data, status=status.HTTP_200_OK)
    # try:
    #     user = User.objects.get(id=id)
    #     userRespone = {
    #         'username': user.username,
    #         'password': user.password,
    #         'email': user.email,
    #         'phone': user.phone,
    #         'date': user.date,
    #         'id': user.id,
    #     }
    #     return JsonResponse(userRespone)
    # except:
    #     return JsonResponse({"error": "id not found"})

# @csrf_exempt
@api_view(['PUT'])
def update_user(request, id):
    try:
        user = User.objects.get(id=id)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = UserSerializer(user, data=request.data, partial=True)  # partial=True → allows partial update
    if serializer.is_valid():
        serializer.save()
        return Response({'success': True, 'updated_user': serializer.data}, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    # if request.method == 'PUT':
    #     try:
    #         data = json.loads(request.body)      
    #         user = User.objects.get(id=id)
    #         if 'username' in data:
    #             user.username = data['username']
    #         elif 'password' in data:
    #             user.password = data['password']
    #         elif 'email' in data:
    #             user.email = data['email']
    #         elif 'phone' in data:
    #             user.phone = data['phone']
    #         user.save()
    #         return JsonResponse({"success": True})
    #     except:
    #         return JsonResponse({"error": "id not found"}, status=404)
    # else:
    #     return JsonResponse({'success': False, "error": "method is not correct"})


@api_view(['DELETE'])  
def delete_user(request, id):
    try:
        user = User.objects.get(id=id)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    
    user.delete()
    return Response({'success': True, 'message': 'User deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
    # if request.method == 'DELETE':
    #     try:
    #         user = User.objects.get(id=id)
    #         user.delete()
    #         return JsonResponse({"success": True})
    #     except:
    #         return JsonResponse({"error": "id not found"}, status=404)
    # else:
    #     return JsonResponse({'success': False, "error": "method is not correct"})


