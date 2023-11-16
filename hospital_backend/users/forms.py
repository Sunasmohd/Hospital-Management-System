from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django import forms

from crispy_forms.helper import FormHelper
from hospital_manage.models import *



class UserForm(UserCreationForm):
    def __init__(self, *args, **kwargs):
        super(UserCreationForm, self).__init__(*args, **kwargs)
        self.fields['username'].widget.attrs.update({'placeholder':'Enter Username'})
        self.fields['email'].widget.attrs.update({'placeholder':'Enter Email'})
        self.fields['password1'].widget.attrs.update({'placeholder':'Enter Password'})
        self.fields['password2'].widget.attrs.update({'placeholder':'Confirm Password'})

    class Meta:
        model = User
        fields = ['username','email','password1','password2'] 
        
        
class HospitalForm(forms.ModelForm):
         
    class Meta:
        model = Hospitals
        fields = '__all__'
        labels = {
                'hosp_name':'Hospital Name',
                'hosp_loc' : 'Hospital Location',
                'hosp_desc' : 'About Hospital',
                'hosp_img' : 'Hospital Image',
                'user_id':'User ID'
            }
            
            
class DoctorForm(forms.ModelForm):

    class Meta:
        model = Doctors
        exclude = ['hosp_name']
        labels = {
                'doc_name':'Doctor Name',
                'doc_spec' : 'Doctor Specialization',
                'dept_name' : 'Department Name',
                'doc_img' : 'Doctor Image',
                'user_id':'User ID',
                'available_details':'Working Time'
            }
     
       
    
            




class docTimingsForm(forms.ModelForm):
    class Meta:
        model = Timings
        exclude = ['doc_name','timing']



