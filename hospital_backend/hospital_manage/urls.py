from django.urls import path
from .views import *
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework_nested import routers



class SlugRouter(routers.DefaultRouter):
    def get_lookup_regex(self, viewset, lookup_prefix=''):
        # Override the default behavior to use a slug instead of an id
        return r'(?P<{lookup_prefix}slug>[-a-zA-Z0-9_]+)'.format(
            lookup_prefix=lookup_prefix
        )

router = routers.DefaultRouter()
router2 = SlugRouter()

router2.register('hospitals',HospitalViewSet,'hospital')
router2.register('doctors',DoctorViewSet,'doctor')
router2.register('departments',DepartmentViewSet,'department')
router.register('bookings',BookingViewSet,'booking')
router.register('timings',TimingViewSet,'timing')

timing_router = routers.NestedDefaultRouter(router,'timings',lookup='timing')
timing_router.register('tokens',TokenViewSet,'token')



urlpatterns = router.urls + timing_router.urls + router2.urls