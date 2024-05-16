from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader


def website(request):
    template = loader.get_template('_trial.html')
    return HttpResponse(template.render())
