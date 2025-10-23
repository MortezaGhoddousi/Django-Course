from django.http import HttpResponse

def homepage(request):
    return HttpResponse("Hello Farnoush. This is your home page on this site")

def about(request):
    return HttpResponse("About page")