from django.shortcuts import render,HttpResponse,redirect,get_object_or_404
from hospital_manage.models import *
from .forms import *
from django.contrib.auth.decorators import login_required
from .decorators import unauthorized_users,allowed_users,admin_only,unauthorized_access
from django.http import JsonResponse
from django.db.models import Q
from django.contrib.auth.decorators import login_required
from rest_framework.response import Response
from hospital_manage.serializers import HospitalSerializer
from rest_framework.views import APIView


def home2(request):
    if request.user.groups.exists():
        group = request.user.groups.all()[0].name
        user = User.objects.get(id=request.user.id)
        context={'group':group,'user':user}
        return render(request,'home.html',context)
    else:
        return render(request,'home.html')
        


# class HospitalDRF(APIView):
#     def get(self,request):
#         hosp = Hospitals.objects.all()
#         serializer = HospitalSerializer(hosp,many=True)
#         return Response(serializer.data)

def hospitals(request):
    
    # endpoint = 'http://127.0.0.1:8000/api/hosp'
    
    # res = requests.get(endpoint)
    
    # data = res.json()
    
    q = request.GET.get('q') if request.GET.get('q') != None else ''
    hospital =  Hospitals.objects.filter(
        Q(hosp_name__icontains=q) | 
        Q(hosp_loc__icontains=q) 
    )
    group = None
    if request.user.is_authenticated:
        group = request.user.groups.all()[0].name
    
    context = {
        'hospital': hospital,'group':group,
    }
    return render(request,'hospitals.html',context)
   




def doctors(request):
    q = request.GET.get('q') if request.GET.get('q') != None else ''
    doctor =  Doctors.objects.filter(
        Q(doc_name__icontains=q) | 
        Q(doc_spec__icontains=q) |
        Q(hosp_name__hosp_name__icontains = q)
    )
    group = None
    if request.user.is_authenticated:
        group = request.user.groups.all()[0].name
        
    context = {
        'doctor': doctor,'group':group
    }
    return render(request,'doctors.html',context)
   




def dept(request):
    q = request.GET.get('q') if request.GET.get('q') != None else ''
    dept =  Departments.objects.all()
    group = None
    
        
    context = {
        'dept': dept,'group':group
    }
    return render(request,'departments.html',context)
   
        
        


def hosp_det(request,pk):
    action = 'hosp'
    hosp_det = Hospitals.objects.get(id=pk)
    doc_det = Doctors.objects.filter(hosp_name = hosp_det.pk)
    
    hosp = hosp_det.user_id
    if request.user.is_authenticated:
        group = request.user.groups.all()[0].name
        
       
        hosp_det = Hospitals.objects.get(id=pk)
        doc_det = Doctors.objects.filter(hosp_name = hosp_det.pk)

        context={
                    'hosp_det' : hosp_det, 'doc_det' : doc_det, 'action' : action,'group':group
                }
        return render(request,'hospital_details.html',context)
    else:
        context={
                    'hosp_det' : hosp_det, 'doc_det' : doc_det, 'action' : action
                }
        return render(request,'hospital_details.html',context)
           
            


def dept_det(req,pk):
    action = 'dept'
    dept_det = Departments.objects.get(id=pk)
    

    doc_det = Doctors.objects.filter(department = dept_det.pk)
   


    context={
        'dept_det' : dept_det,'doc_det':doc_det,'action':action
    }
    return render(req,'hospital_details.html',context)



def doc_det(request,pk):
    
    action = 'doc'
    doc = Doctors.objects.get(id=pk)
    docTiming = Timings.objects.filter(doc_name=doc)
    docs = docTiming.count()
    doct = doc.user_id
    hosp_det = Hospitals.objects.filter(id = doc.hosp_name_id)
    dept_det = Departments.objects.filter(id = doc.dept_name_id)
    
    if request.user.is_authenticated:
        group = request.user.groups.all()[0].name
        
        
        doc = Doctors.objects.get(id=pk)
        hosp_det = Hospitals.objects.filter(id = doc.hosp_name_id)
        dept_det = Departments.objects.filter(id = doc.dept_name_id)


        context={
            'hosp_det':hosp_det,'dept_det':dept_det ,'action':action,'doc':doc,'group':group,
            'docs':docs,'docTiming':docTiming
        }
        return render(request,'hospital_details.html',context)
    else:
        context={
            'hosp_det':hosp_det,'dept_det':dept_det ,'action':action,'doc':doc
            }
        return render(request,'hospital_details.html',context)
        

unauthorized_access
@allowed_users(allowed_roles=['Hospital Manager','Admin'])

def delete_hosp(req,pk):
    group = req.user.groups.all()[0].name
    hosp = Hospitals.objects.get(id=pk)
    hosp.delete()
    return redirect('myapp_hospitals')

unauthorized_access
@allowed_users(allowed_roles=['Hospital Manager','Admin'])

def delete_doc(req,pk):
    group = req.user.groups.all()[0].name
    hosp = Doctors.objects.get(id=pk)
    hosp.delete()
    return redirect('myapp_doctors')


unauthorized_access
@allowed_users(allowed_roles=['Hospital Manager','Admin'])

def delete_dep(req,pk):
    group = req.user.groups.all()[0].name
    hosp = Departments.objects.get(id=pk)
    hosp.delete()
    return redirect('myapp_dept')


unauthorized_access
def mybooking(request):
    user_id = request.user
    user_bookings = Booking.objects.filter(user_id=user_id)
    context = {
        'user_bookings':user_bookings
    }
    return render(request,'mybookings.html',context)

unauthorized_access
def mybooking2(request,pk):
    user_bookings = Booking.objects.filter(id=pk)
    
    patientid = Booking.objects.get(id=pk)
    print(patientid.id)

    print(user_bookings)
    user = request.user
    for u in user_bookings:
        if u.is_saved == 'Pending':
            doctor = Doctors.objects.all()
            
            context = {
                'user_bookings':user_bookings,'doctor':doctor
            }
            return render(request,'mybookings2.html',context)
        else:
            return redirect('/patient/'+str(patientid.id))
            

@unauthorized_access
def booknow(request):

    form = BookingForm()
    # doctors = Doctors.objects.values('hosp_name').distinct()
    doctors = Doctors.objects.all()
    # hosp = [Hospitals.objects.get(id = d['hosp_name'])for d in doctors]
    hosp = Hospitals.objects.all()
        
    if request.method == 'POST':
        form = BookingForm(request.POST)
        if form.is_valid():
                
            booking = form.save(commit=False)
                
            hospital_id = request.POST.get('hospitalSelect')
            hospital = Hospitals.objects.get(id=hospital_id)
            doctor_id = request.POST.get('doctorSelect')
            doctor = Doctors.objects.get(id=doctor_id)
            token = request.POST.get('tokenSelect')
            timing = request.POST.get('timingSelect')

            
            if token == 'Sorry, Tokens are over..!!':
                return HttpResponse('Token Error!!')
            else:
                booking.token = token
            booking.timing = timing


            usr_id = request.user
            booking.user_id = usr_id
            booking.hosp_name = hospital
            booking.doc_name = doctor
                
                
                
                
            booking.save()

            return redirect('myapp_home')
        else:
            return HttpResponse(f'Not Saved')
        
    context = {'doctors':doctors, 'hosp':hosp,'form':form}        
    return render(request,'booknow.html',context)



# def is_ajax(request):
#     return request.META.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest'


def get_doctors(request,hospital_id):
    if request.path == '/favicon.ico':
        return HttpResponse(status=204)
    hospitals = get_object_or_404(Hospitals, id=hospital_id)
    doctors = Doctors.objects.filter(hosp_name=hospitals)
    doctor_list = []
    for doctor in doctors:
        doctor_list.append(
            {
                'id':doctor.id,
                'doc_name':doctor.doc_name
            }
        )
    print(doctor_list)
    return JsonResponse({'doctors':doctor_list})



def get_timings(request,doctor_id):
    if request.path == '/favicon.ico':
        return HttpResponse(status=204)
    doctors = get_object_or_404(Doctors, id=doctor_id)
    timingsss = Timings.objects.filter(doc_name=doctors)
    
    bookings = Booking.objects.filter(doc_name=doctors)
    print('ss',timingsss)

    
    timing_list = []
    for time in timingsss:
        timing_list.append(
            {'id':time.id,'name':time.timing}
            
        )
    
            
    print(timing_list)
    return JsonResponse({'timings':timing_list})
    

def get_tokens(request,timings):
  
    timing = get_object_or_404(Timings, id=timings)
    doctors = get_object_or_404(Doctors,id=timing.doc_name.id)
    tokens = timing.token
 
 
    bookings = Booking.objects.filter(
        Q(doc_name=doctors) & Q(timing=timing.id)
    )
    
    token_list = []

    for token in range(1,int(tokens)+1):
        is_booked = False
        for booking in bookings:
            
            if int(booking.token) == token:
               
                is_booked = True
                break
            
        if not is_booked:
            token_list.append({'id':token})
            
    
            
    # print(token_list)
    return JsonResponse({'tokens':token_list})
    
    # if is_ajax(request):
    #     doctors = Doctors.objects.filter(hosp_name=hospital).values('id', 'doc_name')
    #     return JsonResponse({'data': list(doctors)})
    # return HttpResponse('Wrong request')

@unauthorized_access
# @allowed_users(allowed_roles=['Hospital Manager','Admin'])
def update_patient(request,pk,hospital_id):
    action = 'update'
    
    booking = Booking.objects.get(id=pk)
    
    user_id = booking.user_id
    
    doctors = Doctors.objects.all()
    print(doctors)

    hosp = Hospitals.objects.get(id=hospital_id)
    print(hosp)
    
    doc = Doctors.objects.filter(hosp_name=hospital_id)
    
    time = Timings.objects.get(id=int(booking.timing))
    
    booking2 = Booking.objects.filter(
        Q(doc_name=booking.doc_name) & Q(timing = time.id)
    )
    
    print(booking2)
    tokens = time.token
    # bookingtok = int(booking.token)
    token_list = []
    for token in range(1,int(tokens)+1):
        is_booked = False
        for book in booking2:
            print(type(book.token),type(booking.token))
            
            if book.token == token:
                is_booked = True
                
                

        if token == booking.token:
            print('1' , booking.token)
            token_list.append(
                
                booking.token
                
            )
            

        elif not is_booked :
            print('2' , book.token,token)
            
            token_list.append(
                token
            )
    

    
    initial = {
        'hospitalSelect' : booking.hosp_name_id,
        'doctorSelect' : booking.doc_name_id,

    }
    
    form = BookingForm(instance=booking)
    if request.method=="POST":
        form = BookingForm(request.POST,instance=booking)
        
        # form = BookingForm(instance=booking)
        if form.is_valid: 
            bookingf = form.save(commit=False)
            hospital_id = request.POST.get('hospitalSelect')
            hospital = Hospitals.objects.get(id=hospital_id)
            doctor_id = request.POST.get('doctorSelect')
            doctor = Doctors.objects.get(id=doctor_id)
            timings = request.POST.get('timingSelect')
            tokenn = request.POST.get('tokenSelect')
            print(tokenn)
            


            
            bookingf.user_id = user_id
            bookingf.hosp_name = hospital
            bookingf.doc_name = doctor
            bookingf.is_saved = 'Pending'
            bookingf.timing = timings
            bookingf.token = tokenn
            bookingf.save()
            
            return redirect('/patient/' +str(booking.id))
    
    context = {
        'form': form,'action':action,'doctor_list':doctors,'hosp':hosp,'initial':initial,
        'selected_hosp':booking.hosp_name_id,'selected_doc':booking.doc_name_id,
        'selected_time':int(booking.timing),'selected_token':booking.token,
        'doc':doc,'time':time,'token_list':token_list
    }
    return render(request,'booknow.html',context)


@allowed_users(allowed_roles=['Hospital Manager','Admin'])
@unauthorized_access
def approve_patient(request,pk):
    user_bookings = Booking.objects.get(id=pk)
    user_bookings.is_saved = 'Approved'
    user_bookings.save()
    return redirect('manager_app')
   