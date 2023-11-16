from rest_framework import permissions

class IsStaffPermission(permissions.DjangoModelPermissions):
    perms_map = {
        'GET': ['%(app_label)s.view_%(model_name)s'],
        'OPTIONS': [],
        'HEAD': [],
        'POST': ['%(app_label)s.add_%(model_name)s'],
        'PUT': ['%(app_label)s.change_%(model_name)s'],
        'PATCH': ['%(app_label)s.change_%(model_name)s'],
        'DELETE': ['%(app_label)s.delete_%(model_name)s'],
    }

class UserQuerysetPerm():
    def get_queryset(self,*args,**kwargs):
        obj_key = 'user_id'
        value = {}
        value[obj_key] = self.request.user
        print(value)
        qs = super(*args,**kwargs).get_queryset()
        if self.request.user:
            return qs
        return qs.filter(**value)