from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.contrib.auth import logout as auth_logout
from .forms import UserRegistrationForm
from .forms import LoginForm
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_protect
from .models import *
from .forms import *
from jobs.models import Job


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
                UserAccount.objects.create(
                    user=user,
                    type_job=user_type,
                    company_name=company_name,
                    email=email
                )
                user.save()
            else:
                UserAccount.objects.create(
                    user=user,
                    type_job=user_type,
                    email=email
                )

            return redirect('login')  # Redirect to the login URL

    else:
        form = UserRegistrationForm()

    return render(request, 'signup.html', {'form': form})


def logout_view(request):
    auth_logout(request)
    return redirect('home')


def home(request):
    return render(request, 'homepage.html')

# @login_required


def admindashboard(request):
    company = Company.objects.get(user=request.user)
    jobs = Job.objects.filter(company=company)
    awards = Award.objects.filter(company=company)
    certs = Certification.objects.filter(company=company)
    context = {
        'company': company,
        'jobs': jobs,
        'awards': awards,
        'certs': certs,
    }
    return render(request, 'admindashboard.html', context)


# @login_required
def userdashboard(request):
    return render(request, 'userdashboard.html')


def add_award(request):
    if request.method == 'POST':
        form = AwardForm(request.POST)
        if form.is_valid():
            # Process the form data
            name = form.cleaned_data['name']
            purpose = form.cleaned_data['purpose']
            provider = form.cleaned_data['provider']
            date = form.cleaned_data['date']
            Award.objects.create(name=name, purpose=purpose,
                                 provider=provider, date=date)
            # Redirect to admin dashboard after successful submission
            return redirect('admin_dashboard')
    else:
        form = AwardForm()
    return render(request, 'add_award.html', {'form': form})


def add_certificate(request):
    if request.method == 'POST':
        title = request.POST.get('title')
        where = request.POST.get('where')
        start = request.POST.get('start')
        end = request.POST.get('end')
        Certification.objects.create(
            title=title, where=where, start=start, end=end)
        return redirect('admindashboard')
    return redirect('admindashboard')
