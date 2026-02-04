"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from website.views import home, services, contact, digital_infrastructure, cloud_datacenter, cyber_security, managed_services, consulting
from django.contrib import admin
from django.urls import path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home, name='home'),
    path('services/', services, name='services'),
    path('contact/', contact, name='contact'),
    path('services/digital-infrastructure/', digital_infrastructure, name='digital_infrastructure'),
    path('services/cloud-datacenter/', cloud_datacenter, name='cloud_datacenter'),
    path('services/cyber-security/', cyber_security, name='cyber_security'),
    path('services/managed-services/', managed_services, name='managed_services'),
    path('services/consulting/', consulting, name='consulting'),
]
