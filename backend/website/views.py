from django.shortcuts import render

# Create your views here.
def home(request):
    return render(request, 'home.html')

def services(request):
    return render(request, 'services.html')

def cyber_security(request):
    return render(request, 'services/cyber_security.html')

def network_security(request):
    return render(request, 'services/network_security.html')

def collaboration(request):
    return render(request, 'services/collaboration.html')

def digital_transformation(request):
    return render(request, 'services/digital_transformation.html')

from .forms import ContactForm

def contact(request):
    form = ContactForm()
    return render(request, 'contact.html', {'form': form})

