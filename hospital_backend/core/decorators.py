from django.http import HttpResponse
from django.shortcuts import redirect


def unauthorized_users(view_func):
    def wrapper_func(request, *args, **kwargs):
        if request.user.is_authenticated:
            return redirect('myapp_home')
        else:
            return view_func(request, *args, **kwargs)
    return wrapper_func

def unauthorized_access(view_func):
    def wrapper_func(request, *args, **kwargs):
        if not request.user.is_authenticated:
            return redirect('login_app')
        else:
            return view_func(request, *args, **kwargs)
    return wrapper_func

def allowed_users(allowed_roles=[]):
    def decorator(view_func):
        def wrapper_func(request, *args, **kwargs):
            group = None
            if request.user.groups.exists():
                group = request.user.groups.all()[0].name
                print(group)
                if group in allowed_roles:
                    return view_func(request, *args, **kwargs)
                else:
                    return HttpResponse('Not Allowed')
            return HttpResponse('Not Allowed')
            
        return wrapper_func
    return decorator

def admin_only(view_func):
    def wrapper_func(request, *args, **kwargs):
        group = None
        
        if request.user.groups.exists():
            group = request.user.groups.all()[0].name
            print(group)
            
        if group == 'Users':
                print(group)
                return redirect('myapp_home')
            
        if group == 'Hospital Manager':
                return redirect('manager_app')
            
        if group == 'Admin':
                return view_func(request, *args, **kwargs)
        
        else : 
            return HttpResponse('You are not authorized')
            
        
    return wrapper_func