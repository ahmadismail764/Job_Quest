from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from .models import Job, Application
from user.models import UserAccount

from .forms import ApplicationForm

# Create your views here.


def listJobs(request):
    return render(request, 'joblisting.html', {'jobs': Job.objects.all()})
def job_detail(request, job_id):
    job = get_object_or_404(Job, id=job_id)
    return render(request, 'jobdetail.html', {'job': job})

def apply_for_job(request, job_id):
    job = get_object_or_404(Job, id=job_id)
    if request.method == 'POST':
        form = ApplicationForm(request.POST)
        if form.is_valid():
            current_user = UserAccount.objects.get(user=request.user)
            application = form.save(commit=False)
            application.job = job
            application.user = current_user
            # job.applied_users.add(current_user)
            current_user.applied_jobs.add(job)
            application.save()
            return redirect('job_detail', job_id=job.id)
    else:
        form = ApplicationForm()
    return render(request, 'jobapp.html', {'form': form, 'job': job})
