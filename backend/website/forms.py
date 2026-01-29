from django import forms

class ContactForm(forms.Form):
    name = forms.CharField(max_length=100)
    phone = forms.CharField(max_length=20)
    email = forms.EmailField()
    company = forms.CharField(max_length=100, required=False)
    message = forms.CharField(widget=forms.Textarea)
