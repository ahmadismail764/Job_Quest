from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.contrib.auth import logout as auth_logout
from .forms import UserRegistrationForm
from .forms import LoginForm
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_protect


@csrf_protect
def login_user(request):
    error_message = None
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                if user.is_staff:
                    return redirect('admindashboard')
                else:
                    return redirect('userdashboard')
            else:
                error_message = "Invalid username or password. Please try again."
    else:
        form = LoginForm()

    return render(request, 'login.html', {'form': form, 'error_message': error_message})


def signup(request):
    if request.method == 'POST':
        form = UserRegistrationForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            email = form.cleaned_data['email']
            password = form.cleaned_data['password']
            user_type = form.cleaned_data['type_job']
            company_name = form.cleaned_data.get('company_name')

            # Check if the username already exists
            if User.objects.filter(username=username).exists():
                return render(request, 'signup.html', {'form': form, 'error_message': 'Username already exists. Please choose a different username.'})

            if user_type == 'admin' and not company_name:
                return render(request, 'signup.html', {'form': form, 'error_message': 'Company Name is required for Company Admin.'})

            user = User.objects.create_user(
                username=username, email=email, password=password)
            if user_type == 'admin':
                # Create Company Admin user
                user.is_staff = True
                user.save()
            
            return redirect('login')  # Redirect to the login URL

    else:
        form = UserRegistrationForm()

    return render(request, 'signup.html', {'form': form})


def logout_view(request):
    auth_logout(request)
    return redirect('home')


def home(request):
    return render(request, 'homepage.html')


@login_required
def admindashboard(request):
    return render(request, 'admindashboard.html')


@login_required
def userdashboard(request):
    return render(request, 'userdashboard.html')
