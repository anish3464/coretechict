from django.shortcuts import render
def home(request):
    return render(request, 'home.html')

def services(request):
    return render(request, 'services.html')

def digital_infrastructure(request):
    return render(request, 'services/digital_infrastructure.html')

def cloud_datacenter(request):
    return render(request, 'services/cloud_datacenter.html')

def cyber_security(request):
    return render(request, 'services/cyber_security.html')

def managed_services(request):
    return render(request, 'services/managed_services.html')

def consulting(request):
    return render(request, 'services/consulting.html')

from .forms import ContactForm

def contact(request):
    form = ContactForm()

