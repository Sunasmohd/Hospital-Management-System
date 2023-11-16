from django.shortcuts import render,redirect,HttpResponse
from hospital_manage.models import *
from core.forms import *
from django.contrib.auth.forms import UserCreationForm
from .forms import *
from django.db.models import Q
from django.contrib.auth import authenticate,login,logout
from django.contrib.auth.decorators import login_required
from core.decorators import unauthorized_users,allowed_users,admin_only,unauthorized_access
from django.contrib.auth.models import Group
from django.forms import ModelForm
from django.contrib.auth.hashers import make_password

# Create your views here.





@unauthorized_access
@admin_only
def dashboard(req):
        group = req.user.groups.all()[0].name
    
        managers = Group.objects.filter(name='Hospital Manager')
        total_managers = User.objects.filter(groups__in = managers).count()
        total_hospitals = Hospitals.objects.all().count()
        total_doctors = Doctors.objects.all().count()
        total_dept = Departments.objects.all().count()
                
        form = UserForm()       
        patients = Booking.objects.all().order_by('-id')[0:5]
        users = User.objects.all()
        total_patients = Booking.objects.all().count()
        context = {
            'total_hospitals' : total_hospitals,'total_doctors':total_doctors,
            'total_dept':total_dept,'patients':patients,'total_patients':total_patients
            ,'total_managers':total_managers,'form':form,'users':users,'group':group
        }
        return render(req,'dashboard.html',context)
                
           
        
        


@unauthorized_access
@allowed_users(['Admin','Hospital Manager'])
def patient(request,pk):
    group = request.user.groups.all()[0].name
    patient = Booking.objects.get(id=pk)
    if group == 'Hospital Manager':
    
        hos = Hospitals.objects.get(user_id=request.user)
        if hos == patient.hosp_name:
        
            context={
            'patient':patient,'hos':hos
            }
            return render(request,'patient.html',context)
        else: 
            return redirect('myapp_home')
    else :
        context={
            'patient':patient
            }
        return render(request,'patient.html',context)

    

@unauthorized_access
def user_patient(request,pk):
    q = request.GET.get('q') if request.GET.get('q') != None else ''
    
    group = request.user.groups.all()[0].name
    patient = Booking.objects.filter(user_id=pk)
    if q:
        patient = patient.filter(   
            Q(p_name__icontains = q) |
            Q(hosp_name__hosp_name__icontains = q) |
            Q(doc_name__doc_name__icontains = q) |
            Q(date__icontains = q) |
            Q(is_saved__icontains = q) 
        )
    patient_count = Booking.objects.filter(user_id=pk).count()
    
    if group == 'Admin':
        users = User.objects.get(id=pk)
        doc = Doctors.objects.filter(user_id = users)
        hos = Hospitals.objects.filter(user_id = users)
        # abc = users.groups.values().get()['name']
        
        context={
          'hos':hos, 'patient1':patient,'patient_count':patient_count,'users':users,'group':group,'doc':doc
        }
        return render(request,'user_patient.html',context)
    elif group == 'Users' or 'Hospital Manager':
        users = User.objects.get(id = pk)
        
        doc = Doctors.objects.filter(user_id = users)
        
        if q:
            doc = doc.filter(
                Q(doc_name__icontains=q)
            )
        
        hos = Hospitals.objects.filter(user_id = users)

        if users == request.user:
            context={
            'hos':hos,'patient1':patient,'patient_count':patient_count,'users':users,'doc':doc
            }
            return render(request,'user_patient.html',context)
        else:
            return redirect('myapp_home')
    

@unauthorized_access
def update_user(request,pk):
    group = request.user.groups.all()[0].name
    users = User.objects.get(id=pk)
    form = UserForm(instance=users)
    if request.method == 'POST':
        form = UserForm(request.POST, instance=users)
        if form.is_valid():
            # Update the user's profile
            user = form.save(commit=False)
            user.save()

            # Update the user's password if it was included in the form
            password1 = form.cleaned_data.get('password1')
            password2 = form.cleaned_data.get('password2')
            if password1 and password2 and password1 == password2:
                user.set_password(password1)
                user.save()
                if group == 'Admin':
                    return redirect('dashboard')
                else:
                    return redirect('myapp_home')
                    
        else:
            return HttpResponse('form not valid')
    context = {
        'users':users,'form':form
    }
    return render(request,'register.html',context)

@unauthorized_access
@admin_only
def delete_user(request,pk):
    user = User.objects.get(id=pk)
    user.delete()
    return redirect('myapp_home')


@unauthorized_access
def delete_patient(req,pk):
    booking = Booking.objects.filter(id=pk)
    booking.delete()
    return redirect('dashboard')


@unauthorized_users   
def login_user(req):
    if req.method == 'POST':
            username = req.POST.get('username').lower()
            password = req.POST.get('password')
            
            user = authenticate(req,username=username,password=password)
            
            if user is not None:
                login(req,user)
                return redirect('dashboard')

    return render(req,'login.html')


@unauthorized_users
def register_user(req):
    form = UserForm()
    
    if req.method=='POST':
        form = UserForm(req.POST)
        print(form)
        if form.is_valid():
            user = form.save(commit=False)
            user.username = user.username.lower()
            user.save()
            if(user.username.startswith('manager')):
                group = Group.objects.get(name='Hospital Manager')
                user.groups.add(group)
            else:
                group = Group.objects.get(name='Users')
                user.groups.add(group)
            return redirect('login_app')  
        else :
            return HttpResponse('Form is invalid')
    context = {'form' : form
    }
    return render(req,'register.html',context)


def logout_user(req):
    logout(req)
    return redirect('login_app')


# @unauthorized_access
# def home(req):
#     group = req.user.groups.all()[0].name
#     context = {'group':group}
#     return render(req,'home.html',context)


@unauthorized_access
@allowed_users(allowed_roles=['Hospital Manager','Admin'])
def manager_home(request):
    group = request.user.groups.all()[0].name
    user_hospital = Hospitals.objects.filter(user_id=request.user.id)
    total_hospitals = Hospitals.objects.filter(user_id=request.user.id).count()
    
    user_doctor = Doctors.objects.filter(user_id=request.user.id)
    total_doctors = Doctors.objects.filter(user_id=request.user.id).count()

    total_booking = [Booking.objects.filter(hosp_name = u.id).count() for u in user_hospital]

    if  user_hospital.exists() and user_doctor.exists():
        user_display3 = [Booking.objects.filter(hosp_name = u.id)for u in user_hospital]
        context = {
        'user_hospital':user_hospital,'user_doctor':user_doctor,'user_display3':user_display3
        ,'total_booking':total_booking,'total_hospitals':total_hospitals,'total_doctors':total_doctors
        }
        return render(request,'manager.html',context)
    elif not user_hospital.exists():
        return redirect('manager_app2')
    elif not user_doctor.exists():
        return redirect('manager_app3')
    else:
        return redirect('manager_app4')


@unauthorized_access
@allowed_users(allowed_roles=['Hospital Manager','Admin'])
def manager_hosp(request):
    if request.method== 'GET':
        group = request.user.groups.all()[0].name
        form = HospitalForm()
        hosp = Hospitals.objects.all()
        user_hospital = Hospitals.objects.filter(user_id=request.user.id)
        if user_hospital.exists():
            return redirect('manager_app3')
        else:
            context = {'group':group,'form':form,'hosp':hosp}
            return render(request,'manager_2hosp.html',context) 
    
    
    if request.method=='POST':
        form = HospitalForm(request.POST,request.FILES)
        if form.is_valid():
            booking = form.save(commit=False)
            usr_id = request.user
            booking.user_id = usr_id
            booking.save()
            
            return redirect('manager_app')
        else:
            HttpResponse('Not Saved')


@unauthorized_access
@allowed_users(allowed_roles=['Hospital Manager','Admin'])
def update_hosp(request,pk):
    action = 'update'
    group = request.user.groups.all()[0].name
    hos = Hospitals.objects.get(id=pk)
    form = HospitalForm(instance=hos)
    hosp = Hospitals.objects.all()
    
    if request.method=="POST":
        form = HospitalForm(request.POST,request.FILES,instance=hos)
        
        if form.is_valid(): 
            booking = form.save(commit=False)
            usr_id = request.user
            booking.user_id = usr_id
            booking.save()
            return redirect('/hospitals/' +str(hos.id))
            
    context = {'group':group,'form':form,'hosp':hosp}

    return render(request,'manager_2hosp.html',context)






@allowed_users(allowed_roles=['Hospital Manager','Admin'])
def manager_doc(request):
    if request.method== 'GET':
        group = request.user.groups.all()[0].name
        form = DoctorForm()
        doc = Doctors.objects.all()
        user_hospital = Hospitals.objects.filter(user_id = request.user.id)
        user_doctor = [Doctors.objects.filter(user_id=u.user_id)for u in user_hospital]
        
        context = {'group':group,'form':form,'doc':doc,'user_doctor':user_doctor,'user_hospital':user_hospital}
        return render(request,'manager_3doc.html',context) 
    
    
    if request.method=='POST':
        form = DoctorForm(request.POST,request.FILES)
        if form.is_valid():
            booking = form.save(commit=False)
            usr_id = request.user
            hosp_name = request.POST.get('hospital')
            hosp = Hospitals.objects.get(hosp_name=hosp_name)
            booking.hosp_name = hosp
            booking.user_id = usr_id
            booking.save()
            
            return redirect('/managerdocTimings/'+str(booking.id))
        else:
            return HttpResponse('Not Saved')
               
               
@allowed_users(allowed_roles=['Hospital Manager','Admin'])
def manager_doc(request):
    
    if request.method== 'GET':
        group = request.user.groups.all()[0].name
        form = DoctorForm()
        doc = Doctors.objects.all()
        user_hospital = Hospitals.objects.filter(user_id = request.user.id)
        user_doctor = [Doctors.objects.filter(user_id=u.user_id)for u in user_hospital]
        
        context = {'group':group,'form':form,'doc':doc,'user_doctor':user_doctor,'user_hospital':user_hospital}
        return render(request,'manager_3doc.html',context) 
    
    
    if request.method=='POST':
        form = DoctorForm(request.POST,request.FILES)
        if form.is_valid():
            booking = form.save(commit=False)
            usr_id = request.user
            hosp_name = request.POST.get('hospital')
            hosp = Hospitals.objects.get(hosp_name=hosp_name)
            booking.hosp_name = hosp
            booking.user_id = usr_id
            booking.save()
            
            return redirect('/managerdocTimings/'+str(booking.id))
        else:
            return HttpResponse('Not Saved')
        
@unauthorized_access
@allowed_users(allowed_roles=['Hospital Manager','Admin'])

def update_doc(request,pk):
    action = 'update'
    
    group = request.user.groups.all()[0].name
    doct = Doctors.objects.get(id=pk)
    hosp = Hospitals.objects.get(user_id=request.user.id)
    print('ss',hosp)
    form = DoctorForm(instance=doct)
    doc = Doctors.objects.all()
    user_hospital = Hospitals.objects.filter(user_id = request.user.id)
    user_doctor = [Doctors.objects.filter(user_id=u.user_id)for u in user_hospital]
        
    if request.method=="POST":
        form = DoctorForm(request.POST,request.FILES,instance=doct)
        
        if form.is_valid(): 
            booking = form.save(commit=False)
            usr_id = request.user
            booking.user_id = usr_id
            booking.save()
            
            return redirect('/doctors/' +str(doct.id))
        
    context = {'action':action,'hosp':hosp,'group':group,'form':form,'doc':doc,'user_doctor':user_doctor,'user_hospital':user_hospital}

    return render(request,'manager_3doc.html',context)



@unauthorized_access
def manager_doc_timings(request,pk):
    docc = Doctors.objects.get(id=pk)
    group = request.user.groups.all()[0].name
    
    doctor_timings = Timings.objects.filter(doc_name=docc)
    
    
    CHOICES_AVAILABLE_DATES = [
            (date.today().strftime('%Y-%m-%d'), date.today().strftime('%B %d, %Y')),    
        ]   
    for i in range(1,30):
        setupp = ((date.today() + timedelta(days=i)).strftime('%Y-%m-%d'), (date.today() + timedelta(days=i)).strftime('%B %d, %Y'))
        CHOICES_AVAILABLE_DATES.append(setupp)
    
    available_choices = []
    for choice in CHOICES_AVAILABLE_DATES:
        is_booked = False
        for d in doctor_timings:
            
            if choice[0] == d.timing:
                is_booked = True
                break
        if not is_booked:
            
            available_choices.append(choice)

        
    form = docTimingsForm
    
    if request.method == 'POST':
        form = docTimingsForm(request.POST)
        if form.is_valid():
            form = form.save(commit=False)
            doct = request.POST.get('DocSelect')
            tim = request.POST.get('TimingSelect')

            print(doct)
            form.doc_name_id = doct
            form.timing = tim
            form.save()
            return redirect('manager_app')
        else:
            return HttpResponse('form not valid')
    
    context = {'form':form,'doc':docc,'ac':available_choices}
    return render(request,'timings.html',context)


@unauthorized_access
def delete_doc_timings(request,pk):
    doc = Timings.objects.get(id=pk)
    doc.delete()
    return redirect('myapp_doctord',pk=doc.doc_name_id)


@unauthorized_access
def user_view(request,pk):
        users = User.objects.get(id=pk)
        context = {
            'users':users
        }
        return render(request,'userview.html',context)