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


from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.core.mail import send_mail
from django.conf import settings

@csrf_exempt
def chat_submit(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            name = data.get('name')
            email = data.get('email')
            company = data.get('company')
            requirements = data.get('requirements')

            subject = f'New Chat Inquiry from {name} ({company})'
            message = f'''
            New inquiry received from the website chat widget:

            Name: {name}
            Email: {email}
            Company: {company}
            
            Requirements:
            {requirements}
            '''
            
            try:
                send_mail(
                    subject,
                    message,
                    settings.DEFAULT_FROM_EMAIL if hasattr(settings, 'DEFAULT_FROM_EMAIL') else 'noreply@coretechict.com',
                    [settings.ADMIN_EMAIL if hasattr(settings, 'ADMIN_EMAIL') else 'admin@coretechict.com'],
                    fail_silently=False,
                )
                return JsonResponse({'status': 'success', 'message': 'Inquiry sent successfully!'})
            except Exception as e:
                 print(f"Email sending failed: {str(e)}")
                 return JsonResponse({'status': 'success', 'message': 'Inquiry received!'})

        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
    
    return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=405)

