from django.shortcuts import render

# Create your views here.
def home(request):
    return render(request, 'home.html')

def services(request):
    return render(request, 'services.html')

def cyber_security(request):
    return render(request, 'services/cyber_security.html')

def enterprise_networking(request):
    return render(request, 'services/enterprise_networking.html')

def datacenter_infrastructure(request):
    return render(request, 'services/datacenter_infrastructure.html')

from .forms import ContactForm

def contact(request):
    form = ContactForm()
    return render(request, 'contact.html', {'form': form})

