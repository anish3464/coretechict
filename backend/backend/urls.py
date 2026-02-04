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
from website.views import home, services, contact, datacenter_infrastructure, cyber_security, enterprise_networking
from django.contrib import admin
from django.urls import path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home, name='home'),
    path('services/', services, name='services'),
    path('contact/', contact, name='contact'),
    path('services/cyber-security/', cyber_security),
    path('services/enterprise-networking/', enterprise_networking),
    path('services/datacenter-infrastructure/', datacenter_infrastructure),
]
