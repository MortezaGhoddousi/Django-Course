from django.views.decorators.http import require_POST 
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password, check_password
import json
from django.http import JsonResponse
from .models import Users, Jobs, UserEmp
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser
from .serializers import UserEmpSerializer

# Create your views here.
@csrf_exempt
@require_POST
def register(request):
    data = json.loads(request.body)
    try:
        if Users.objects.filter(email=data.get('email')).exists():
            return JsonResponse({'success': False, 'message': 'Email already registered'})

        if data.get('password'):
            user = Users.objects.create(
                password=make_password(data.get('password')),
                email=data.get('email'),
            )
            return JsonResponse({'success': True, 'message': 'New user added', 'userID': user.id}, status=201)
        else:
            return JsonResponse({'success': False, 'message': 'Password needed'}, status=400)

    except Exception as e:
        return JsonResponse({'success': False, 'message': f'There are some issues on storing data: {str(e)}'}, status=400)


@csrf_exempt
@require_POST
def checkLogin(request):
    data = json.loads(request.body)
    try:
        if Users.objects.filter(email=data.get('email')).exists():
            return JsonResponse({'message': 'Email already registered', 'exists': True})
        else:
            return JsonResponse({'message': 'Email not registered', 'exists': False})
    except:
        return JsonResponse({'message': f'Error checking email', 'exists': False}, status=500)

@csrf_exempt
@require_POST
def checkEmpLogin(request):
    data = json.loads(request.body)
    try:
        if UserEmp.objects.filter(email=data.get('email')).exists():
            return JsonResponse({'message': 'Email already registered', 'exists': True})
        else:
            return JsonResponse({'message': 'Email not registered', 'exists': False})
    except:
        return JsonResponse({'message': f'Error checking email', 'exists': False}, status=500)


class UploadLogoView(APIView):
    parser_classes = [MultiPartParser]

    def post(self, request):
        serializer = UserEmpSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({'image_url': user.image.url, 'userID-emp': user.id}, status=201)
        else:
            return Response(serializer.errors, status=400)

@csrf_exempt
@require_POST
def login(request):
    data = json.loads(request.body)
    try:
        try:
            user = Users.objects.get(email=data.get('email'))
        except Users.DoesNotExist:
            return JsonResponse({'success': False, 'message': 'Invalid email'}, status=404)

        if check_password(data.get('password'), user.password):
            request.session['userID'] = user.id
            return JsonResponse({
                'success': True, 
                'message': 'User logged in', 
                'userID': user.id, 
            }, status=200)
        else:
            return JsonResponse({'success': False, 'message': 'Invalid password'}, status=401)
    except Exception as e:
        return JsonResponse({'success': False, 'message': f'Login error: {str(e)}'}, status=500)


@csrf_exempt
@require_POST
def empLogin(request):
    data = json.loads(request.body)
    try:
        try:
            user = UserEmp.objects.get(email=data.get('email'))
        except UserEmp.DoesNotExist:
            return JsonResponse({'success': False, 'message': 'Invalid email'}, status=404)

        if data.get('password')==user.password:
            request.session['userID'] = user.id
            return JsonResponse({
                'success': True, 
                'message': 'User logged in', 
                'userID-emp': user.id, 
            }, status=200)
        else:
            return JsonResponse({'success': False, 'message': 'Invalid password'}, status=401)
    except Exception as e:
        return JsonResponse({'success': False, 'message': f'Login error: {str(e)}'}, status=500)



@csrf_exempt
def jobs(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        try:    
            user = Users.objects.get(id=request.session.get('userID'))
            if user.isEmployer:
                job = Jobs.objects.create(
                    employer=request.session['userID'],
                    title=data.get('title'),
                    description=data.get('description'),
                    location=data.get('location'),
                    salary=data.get('salary'),
                )
                return JsonResponse({'success': True, 'message': 'New job added'}, status=201)
            else:
                return JsonResponse({'success': False, 'message': 'User has no access to add new job'}, status=403)

        except Exception as e:
            return JsonResponse({'success': False, 'message': f'Error creating job: {str(e)}'}, status=400)
    else:
        jobs_list = Jobs.objects.all().values()
        return JsonResponse(list(jobs_list), status=200, safe=False)


def handleJobs(request, id):
    if request.method == 'GET':
        try:
            job = Jobs.objects.get(id=id)  # Fixed: Jobs instead of jobs
            # Convert model instance to dictionary
            job_data = {
                'id': job.id,
                'title': job.title,
                'description': job.description,
                'location': job.location,
                'salary': job.salary,
                'employer': job.employer,
                # Add other fields as needed
            }
            return JsonResponse({'success': True, 'job': job_data})
        except Jobs.DoesNotExist:
            return JsonResponse({'success': False, 'message': 'Job not found'}, status=404)
        except Exception as e:
            return JsonResponse({'success': False, 'message': f'Error: {str(e)}'}, status=500)

    elif request.method == 'DELETE':
        try:
            if not id:
                return JsonResponse({'success': False, 'message': 'ID not found'}, status=400)
            job = Jobs.objects.get(id=id)  # Fixed: Jobs instead of jobs
            job.delete()
            return JsonResponse({'success': True, 'message': 'Job deleted successfully'})
        except Jobs.DoesNotExist:
            return JsonResponse({'success': False, 'message': 'Job not found'}, status=404)
        except Exception as e:
            return JsonResponse({'success': False, 'message': f'Delete error: {str(e)}'}, status=500)

    # if request.method == 'PUT':
    #     # Implementation for updating jobs