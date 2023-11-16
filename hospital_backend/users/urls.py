from django.urls import path
from .views import *


urlpatterns = [
       
        
]


urlpatterns = [
    path('dashboard/',dashboard,name='dashboard'),
    path('patient/<str:pk>',patient,name='patient_app'),
    path('user/<str:pk>',user_patient,name='user_app'),
    path('updateuser/<str:pk>',update_user,name='update_user'),
    path('deleteuser/<str:pk>',delete_user,name='delete_user'),
    
    path('delete/<str:pk>',delete_patient,name='delete_app'),
    path('login/',login_user,name='login_app'),
    path('register/',register_user,name='register_app'),
    path('logout/',logout_user,name='logout_app'),
    path('managerhome/',manager_home,name='manager_app'),
    path('managerhosp/',manager_hosp,name='manager_app2'),
    path('updatehosp/<str:pk>',update_hosp,name='updatehosp_app'),
    path('updatedoc/<str:pk>',update_doc,name='updatedoc_app'),
    
    path('managerdoc/',manager_doc,name='manager_app3'),
    path('managerdocTimings/<str:pk>',manager_doc_timings,name='manager_app4'),
    path('deletedocTimings/<str:pk>',delete_doc_timings,name='deletedoct_app'),
    

]