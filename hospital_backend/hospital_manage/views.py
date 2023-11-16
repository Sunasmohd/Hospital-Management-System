from .serializers import *
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import mixins,permissions,authentication
from django.forms.models import model_to_dict
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from .permissions import UserQuerysetPerm,IsStaffPermission
from rest_framework import status
from rest_framework.viewsets import ModelViewSet,GenericViewSet
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.mixins import *
from rest_framework.filters import SearchFilter,OrderingFilter
from django.db.models import Q
from django.db import connection
    
class HospitalViewSet(ModelViewSet):
    filter_backends = [SearchFilter,OrderingFilter,DjangoFilterBackend]
    search_fields = ['name']
    serializer_class = HospitalSerializer
    queryset = Hospitals.objects.prefetch_related('doctors_set__department','doctors_set__timings_set').all()
    lookup_field = 'slug'
    
    def retrieve(self, request, *args, **kwargs):
        slug = self.kwargs.get('slug')
        hospital = Hospitals.objects.prefetch_related('doctors_set').get(slug=slug)
        serializer = HospitalSerializer(hospital,many=True)
        return super().retrieve(request, *args, **kwargs)
    
class DoctorViewSet(ModelViewSet):
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['hospital_id']
    queryset = Doctors.objects.select_related('hospital','department').prefetch_related('timings_set').all()
    serializer_class = DoctorSerializer
    lookup_field = 'slug'
    
    def retrieve(self, request, *args, **kwargs):
        slug = self.kwargs.get('slug')
        doctor = Doctors.objects.get(slug=slug)
        serializer = DoctorSerializer(doctor,many=True)
        return super().retrieve(request, *args, **kwargs)

class DepartmentViewSet(ModelViewSet):
    queryset = Departments.objects.prefetch_related('doctors_set__hospital','doctors_set__timings_set').all()
    serializer_class = DepartmentSerializer
    lookup_field = 'slug'
    
    def retrieve(self, request, *args, **kwargs):
        slug = self.kwargs.get('slug')
        department = Departments.objects.get(slug=slug)
        serializer = DepartmentSerializer(department,many=True)
        return super().retrieve(request, *args, **kwargs)
    
class BookingViewSet(ModelViewSet):
    
    serializer_class = BookingSerializer
    
    def create(self, request, *args, **kwargs):
        user_id = request.user.id
        data = request.data
        data['user'] = user_id
        serializer = BookingSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            print('saved')
            return Response(serializer.data)
        return Response(serializer.errors,status=status.HTTP_404_NOT_FOUND)
    
    def get_queryset(self):
        print(self.request.user)
        return Booking.objects.all()

    # def get_serializer_context(self):
    #     print(self.request.user.id)
    #     return {'user_id' : self.request.user.id}
    
  
class TimingViewSet(ModelViewSet):
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['doctor_id']
    queryset = Timings.objects.all()
    serializer_class = TimingSerializer
    
    
class TokenViewSet(ListModelMixin,RetrieveModelMixin,GenericViewSet):
    # filter_backends = [DjangoFilterBackend]
    # filterset_fields = ['id']
    
    serializer_class = TokenSerializer
    # queryset = Timings.objects.all()
    def get_queryset(self):
        if not getattr(self.request, '_query_executed', False):
            timing_pk = self.kwargs['timing_pk']
            timing_with_booking = Timings.objects.get(id=timing_pk)

            booked_tokens = [booking.token for booking in timing_with_booking.booking.all()]
            
            tokens = [i for i in range(1, timing_with_booking.token + 1) if i not in booked_tokens]
            self.request._query_executed = True

            return [{'id': timing_with_booking.pk, 'token': tokens}]
        #     with connection.cursor() as cursor:
        #         query = f"""
        #             SELECT t.id AS id, b.token
        #             FROM hospital_manage_timings t
        #             LEFT JOIN hospital_manage_booking b ON t.id = b.timing_id
        #             WHERE t.id = {timing_pk} AND b.token IS NOT NULL
        #             ORDER BY b.token;
        #         """
        #         query2 = f"""
        #             SELECT token from hospital_manage_timings where id = {timing_pk}
        #         """
        #         cursor.execute(query)
        #         result1 = cursor.fetchall()
        #         cursor.execute(query2)
        #         result2 = cursor.fetchall()
        #         booked_tokens = [result1[i][1] for i in range(len(result1))]
        #         token = [i for i in range(1,result2[0][0]+1) if i not in booked_tokens]
        #         # tokens = []
        #         self.request._query_executed = True
        #         return [{'id':result1[0][0],'token':token}]
        # #     # Add print statements for debugging
        # #     print("Executed SQL query:", cursor.mogrify(query))
        # #     print("Result set:", result)

        # # available_tokens = [{'id': row[0], 'token': row[1]} for row in result]

        # return available_tokens
            
        
        
    
    
    
class RegisterViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    
    def create(self, request, *args, **kwargs):
            username = request.data.get('username')
            password = request.data.get('password')
            

            try:
                user = User.objects.create_user(username=username, password=password)
            except Exception as e:
                return Response({"error": 'User Already Exists'}, status=status.HTTP_400_BAD_REQUEST)

            serializer = RegisterSerializer(user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)



    
