# from django.http import HttpResponse
from django.shortcuts import render

def homepage(request):
    # return HttpResponse("Hello Farnoush. This is your home page on this site")
    return render(request, "homepage.html")

def about(request):
    # return HttpResponse("About page")
    return render(request, "about.html")