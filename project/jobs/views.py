from django.shortcuts import render
from django.http import HttpResponse
from .forms import ApplicationForm

# Create your views here.

def application(request):
    if request.method == 'POST':
        form = ApplicationForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return HttpResponse('Application submitted successfully')
    else:
        form = ApplicationForm()
    return render(request, 'jobs/application.html', {'form': form})
