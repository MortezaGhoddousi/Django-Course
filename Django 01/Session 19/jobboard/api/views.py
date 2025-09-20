from django.views.decorators.http import require_POST 
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password, check_password
import json
from django.http import JsonResponse
from .models import Users, Jobs, UserEmp, CV
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
    print(data)
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
            user = UserEmp.objects.get(id=data.get('userID'))
            if user:
                job = Jobs.objects.create(
                    title=data.get('title'),
                    city=data.get('city'),
                    price=data.get('price'),
                    employer=data.get('userID')
                )
                return JsonResponse({'success': True, 'message': 'New job added'}, status=201)
            else:
                return JsonResponse({'success': False, 'message': 'User has no access to add new job'}, status=403)

        except Exception as e:
            return JsonResponse({'success': False, 'message': f'Error creating job: {str(e)}'}, status=400)
    else:
        jobs_list = Jobs.objects.all().values()
        editedJobList = []
        for job in jobs_list:
            user = UserEmp.objects.get(id=job['employer'])
            image_url = user.image.url if user.image else None
            if image_url:
                full_image_url = request.build_absolute_uri(image_url)
            else:
                full_image_url = None

            temp = {
                "id": job['id'],
                "title": job['title'],
                'city': job['city'],
                'price': job['price'],
                'date': job['created_at'],
                'image': full_image_url,
                'company': user.title,
            }
            editedJobList.append(temp)
        return JsonResponse(editedJobList, status=200, safe=False)


def handleJobs(request, id):
    if request.method == 'GET':
        try:
            jobs = Jobs.objects.filter(employer=id).values('title', 'city', 'price')
            jobs_list = list(jobs) 
            
            if not jobs_list:
                return JsonResponse({'success': False, 'message': 'No jobs found'}, status=404)

            return JsonResponse({'success': True, 'jobs': jobs_list})
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

@csrf_exempt 
@require_POST
def addCV(request, id):
    uploaded_file = request.FILES.get('file')
    if not uploaded_file:
        return JsonResponse({"error": "No file provided"}, status=400)
    
    if uploaded_file.content_type != 'application/pdf':
        return JsonResponse({"error": "Only PDF files are allowed"}, status=400)

    cv = CV.objects.create(related_id=id, file=uploaded_file)
    return JsonResponse({"message": "CV uploaded successfully", "cv_id": cv.id})


@csrf_exempt
@require_POST
def sendCV(request):
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON"}, status=400)

    userID = data.get('userID')
    title = data.get('title')
    id = data.get('id')

    print(id)

    if not userID or not title:
        return JsonResponse({"error": "Missing userID or title"}, status=400)

    try:
        user = UserEmp.objects.get(title=title)
    except UserEmp.DoesNotExist:
        return JsonResponse({"error": "title not found"}, status=404)

    # Make sure user_ids is a list
    if not isinstance(user.user_ids, list):
        user.user_ids = []

    # Optionally, check if userID is already present to avoid duplicates
    if userID not in user.user_ids:
        user.user_ids.append([userID, id])
        user.save()

    return JsonResponse({"success": "data added"}, status=200)

def getCV(request, id, appID):
    userEMP = UserEmp.objects.get(id=id)
    users = []
    for i in userEMP.user_ids:
        if i[1]==appID:
            user = Users.objects.get(id=int(i[0]))
            try:
                cv_path = CV.objects.get(related_id=user.id)
                userDict = {
                    'email': user.email,
                    'cv': f'http://localhost:8000/media/{cv_path.file}'
                }
                users.append(userDict)
            except:
                pass

    return JsonResponse(users, safe=False, status=200)

def getAllRequests(request, id):
    userEMP = Jobs.objects.filter(employer=id).values()
    return JsonResponse(list(userEMP), safe=False, status=200)
