from django.views.decorators.http import require_POST 
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password, check_password
import json
from django.http import JsonResponse
from .models import Users, Jobs
from django.contrib.auth import login

# Create your views here.
@csrf_exempt
@require_POST
def register(request):
    data = json.loads(request.body)
    try:
        if Users.objects.filter(email=data.get('email')).exists():
            return JsonResponse({'success': False, 'message': 'Email already registered'}, status=400)
                   
        user = Users.objects.create(
            username=data.get('username'),
            password=make_password(data.get('password')),
            email=data.get('email'),
            isEmployer=data.get('isEmployer')
        )

        request.session['userID'] = user.id
        return JsonResponse({'success': True, 'message': 'New user added', 'userID': user.id}, status=201)
    except:
        return JsonResponse({'success': False, 'message': 'There are some issues on storing data'}, status=400)

@csrf_exempt
@require_POST
def login(request):
    data = json.loads(request.body)
    try:
        try:
            user = Users.objects.get(username=data.get('username'))
        except:
            return JsonResponse({'success': False, 'message': 'Invalid username'}, status=404)

        if check_password(data.get('password'), user.password):
            request.session['userID'] = user.id
            return JsonResponse({'success': True, 'message': 'user Logged In', 'userID': user.id, 'isEmployer': user.isEmployer}, status=201)
        else:
            return JsonResponse({'success': False, 'message': 'Invalid password'}, status=404)
    except:
        return JsonResponse({'success': False, 'message': 'There are some issues on storing data'}, status=400)

@csrf_exempt
def jobs(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        try:    
            user = Users.objects.get(id=request.session['userID'])
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
                return JsonResponse({'success': False, 'message': 'user has no access to add new job'}, status=401)

        except:
            return JsonResponse({'success': False, 'message': 'There are some issues on storing data'}, status=400)
    else:
        jobs = Jobs.objects.all().values()
        return JsonResponse(list(jobs), status=200, safe=False)


def handleJobs(request, id):
    if request.method == 'GET':
        try:
            job = jobs.objects.get(id=id)
            return JsonResponse({'success': True, 'jobs': job})
        except:
            return JsonResponse({'success': False})

    if request.method == 'DELETE':
        try:
            if not id:
                return JsonResponse({'success': False, 'message': 'id not fount'})
            job = jobs.objects.get(id=id)
            job.delete()
            return JsonResponse({'success': True, 'message': 'done! job deleted'})
        except:
            return JsonResponse({'success': False, 'message': 'data is wrong'})


    # if request.method == 'PUT':



