from django.shortcuts import render
from django.http import HttpResponse
from .forms import ApplicationForm
from .models import Application
from .models import Job

# Create your views here.


def application(request):
    if request.method == 'POST':
        form = ApplicationForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            # return HttpResponse('Application submitted successfully')
    else:
        form = ApplicationForm()
    return render(request, 'jobapp.html', {'form': form})


def displayJob(request):
    return render(request, 'jobdetail.html')


def listJobs(request):
    return render(request, 'joblisting.html', {'jobs': Job.objects.all()})


def getJob(request, id):
    return render(request, 'jobdetail.html', {'job': Job.objects.get(pk=id)})
