from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from .models import Job
from user.models import UserAccount
from .forms import ApplicationForm, JobForm, SearchForm
from django.db.models import Q
from .services import process_job, process_application


@login_required(login_url='login')
def job_list(request):
    return render(request, 'joblisting.html', {'jobs': Job.objects.all()})

@login_required(login_url='login')
def job_search(request):
    form = SearchForm(request.GET)
    if form.is_valid():
        form.keyword = request.GET.get("keyword", "").strip().lower()
        form.experience = request.GET.get("experience", "").strip()

        jobs = Job.objects.all()
        if form.keyword:
            jobs = jobs.filter(
                Q(title__icontains=form.keyword) |
                Q(company_name__icontains=form.keyword)
            )

        if form.experience:
            try:
                form.experience = int(form.experience)
                jobs = jobs.filter(years_of_experience__lte=form.experience)
            except ValueError:
                pass
        context = {'jobs': jobs, 'form': form}
        return render(request, 'joblisting.html', context)
    else:
        form = SearchForm()
        context = {'jobs': Job.objects.all(), 'form': form}
        return render(request, 'joblisting.html', context)

@login_required(login_url='login')
def job_detail(request, job_id):
    job = get_object_or_404(Job, id=job_id)
    return render(request, 'jobdetail.html', {'job': job, 'user': UserAccount.objects.get(user=request.user)})


@login_required(login_url='login')
def apply_for_job(request, job_id):
    job = get_object_or_404(Job, id=job_id)
    form = ApplicationForm(request.POST)
    if form.is_valid():
        current_user = UserAccount.objects.get(user=request.user)
        application = form.save(commit=False)
        application.job = job
        application.applicant = current_user
        application.save()
        return redirect('job-detail', job_id=job.id)
    return render(request, 'jobapp.html', {'form': form})


@login_required(login_url='login')
def post_job(request):
    form = JobForm(request.POST)
    if form.is_valid():
        current_user = UserAccount.objects.get(user=request.user)
        job = form.save(commit=False)
        job.posted_by = current_user
        job.save()
        # going to the JobDetails page
        return redirect('job-detail', job_id=job.id)
    return render(request, 'jobpost.html', {'form': form})

def contact(request):
    return render(request, 'contact.html')

def add_job(request):
    if request.method == 'POST':
        process_job(request.POST)
    return render(request, 'add_job.html')

def add_application(request):
    if request.method == 'POST':
        process_application(request.POST)
    return render(request, 'add_application.html')

