from django.shortcuts import render

def home(request):
    return render(request , 'homepage.html')

def signup(request):
    return render(request , 'signup.html')

def login(request):
    return render(request , 'login.html')

def admindashboard(request):
    return render(request , 'admindashboard.html')

def userdashboard(request):
    return render(request , 'userdashboard.html')

def admindashboard(request):
    return render(request , 'admindashboard.html')

def userdashboard(request):
    return render(request , 'userdashboard.html')
