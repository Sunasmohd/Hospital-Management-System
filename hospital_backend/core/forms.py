from hospital_manage.models import *
from django import forms

class BookingForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super(BookingForm, self).__init__(*args, **kwargs)
        self.fields['p_name'].widget.attrs.update({'class': 'form-input','placeholder':'Enter Patient Name'})
        self.fields['p_phno'].widget.attrs.update({'class': 'form-input','placeholder':'Enter Contact No'})
        self.fields['p_address'].widget.attrs.update({'class': 'form-input','placeholder':'Enter Address/Pin Code/Landmark'})


        
        


    class Meta:
        model = Booking
        # fields = '__all__'
        exclude = ['dept_name','hosp_name','doc_name','is_saved','token','timing']

        labels = {
            'p_name' : 'Name' ,
            'p_phno' : 'Contact No',
            'p_address' : 'Address',
        }
        
        
        
