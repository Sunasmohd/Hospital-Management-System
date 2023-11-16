from django.urls import path,re_path
from .views import *
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [

   path('',home2,name='myapp_home'),
   path('mybookings/',mybooking,name='myapp_booking'),
   path('mybookings2/<str:pk>',mybooking2,name='myapp_booking2'),


   
   path('hospitals',hospitals,name='myapp_hospitals'),
   path('doctors',doctors,name='myapp_doctors'),
   path('doctors/<str:pk>',doc_det,name='myapp_doctord'),
   
   path('dept',dept,name='myapp_dept'),
   path('dept/<str:pk>',dept_det,name='myapp_deptd'),
   path('delhosp/<str:pk>',delete_hosp,name='myapp_delete1'),
   path('deldoc/<str:pk>',delete_doc,name='myapp_delete2'),
   path('deldept/<str:pk>',delete_dep,name='myapp_delete3'),

   
   path('hospitals/<str:pk>',hosp_det,name='myapp_hospitald'),
   
   path('book_now/',booknow,name='myapp_book'),
   path('book_now/<int:hospital_id>',get_doctors,name='myapp_gd'),
   path('book_now/update/<str:pk>/<int:hospital_id>',update_patient,name='update_app'),
   
   path('book_now/tok/<int:timings>',get_tokens,name='get_tokens'),
   path('book_now/timing/<int:doctor_id>',get_timings,name='get_timings'),

   path('approve/<str:pk>',approve_patient,name='approve_app'),
   # path('api/hosp',HospitalDRF.as_view(),name='api_hosp')
   

   
]