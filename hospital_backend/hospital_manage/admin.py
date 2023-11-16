from django.contrib import admin
from .models import *
from datetime import date
from django.contrib import messages
# Register your models here.


@admin.register(Timings)
class TimingAdmin(admin.ModelAdmin):
  list_display = ['timing','doctor']
  actions = ['clear_outdated_dates']
  today = date.today()
  
  def clear_outdated_dates(self,request,queryset):
    update_dates = queryset.filter(timing__lt=today)
    deleted_count = update_dates.count()
    update_dates.delete()
    self.message_user(request,f'{deleted_count} previous date deleted',messages.SUCCESS)
    

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
  actions = ['update_booking_status']
  
  def update_booking_status(self,request,queryset):
    update_booking = queryset.update(is_saved='A') 

    self.message_user(request,f'{update_booking} bookings are approved',messages.SUCCESS)
    
@admin.register(Hospitals)
class HospitalsAdmin(admin.ModelAdmin):
  prepopulated_fields = {
    'slug' : ['name']
  }
  
@admin.register(Doctors)
class DoctorsAdmin(admin.ModelAdmin):
  prepopulated_fields = {
    'slug' : ['name']
  }
  
@admin.register(Departments)
class DepartmentsAdmin(admin.ModelAdmin):
  prepopulated_fields = {
    'slug' : ['name']
  }