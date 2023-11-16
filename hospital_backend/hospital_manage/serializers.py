from rest_framework import serializers
from .models import *
from rest_framework.reverse import reverse




  
    

class UserSerializer(serializers.Serializer):
    username = serializers.CharField(read_only=True)
    id = serializers.IntegerField(read_only=True)

        
class TimingSerializer(serializers.ModelSerializer):
    timing = serializers.StringRelatedField()
    class Meta:
        model = Timings
        fields = [
            'id',
            'doctor_id',
            'timing'
        ]
        
        
class TokenSerializer(serializers.ModelSerializer):
    token = serializers.ListField(child=serializers.IntegerField())
    class Meta:
        model = Timings
        fields = [
            'id',
            'token'
        ]

class HospitalNestedSerializer(serializers.ModelSerializer):

    class Meta:
        model = Hospitals
        fields = [
            'slug',
            'name',
        ]
        
class DepartmentsNestedSerializer(serializers.ModelSerializer):

    class Meta:
        model = Departments
        fields = [
            'slug',
            'name',
        ]
class DoctorSerializer(serializers.ModelSerializer):
    timings_set = TimingSerializer(many=True, read_only=True)
    hospital = HospitalNestedSerializer()
    department = DepartmentsNestedSerializer()
    
    class Meta:
        model = Doctors
        fields = [
            'id',
            'name',
            'slug',
            'speciality',
            'hospital',
            'image',
            'department',
            'timings_set'
        ]
        
        
class HospitalSerializer(serializers.ModelSerializer):
    # url = serializers.SerializerMethodField(read_only=True)
    doctors_set = DoctorSerializer(many=True)

    class Meta:
        model = Hospitals
        fields = [
            'id',
            'slug',
            # 'url',
            'name',
            'email',
            'phone',
            'location',
            'description',
            'image',
            'doctors_set'
        ]
        
    def get_url(self,obj):
        request = self.context.get('request')
        if not request : 
            return None
        return reverse('hospital-detail',kwargs={'slug':obj.slug},request=request)
        
    
        
        
class DepartmentSerializer(serializers.ModelSerializer):
    doctors_set = DoctorSerializer(many=True)
    class Meta:
        model = Departments
        fields = [
            'id',
            'slug',
            'name',
            'description',
            'doctors_set'
        ]





        
        

        
        
        
        
class BookingSerializer(serializers.ModelSerializer):
  
    class Meta:
        model = Booking
        fields = ['id','name','phone','address','hospital','doctor','booked_at','user','timing'
                  ,'is_saved','token']
    
        
class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ['name','phone','address','hospital','doctor','booked_at','user','timing'
                  ,'is_saved','token']
        
    def validate_user_id(self,user):
        print(user)
        
    # def create(self, validated_data):
    #     user_id = self.context['user_id']
    #     return Booking.objects.create(user_id=user_id,**validated_data)
    
    def validate_doctor(self, value):
        doctor = value
        timing = self.initial_data['timing']
        token = self.initial_data['token']

        existing_Booking = Booking.objects.filter(doctor=doctor, timing=timing, token=token)

        if existing_Booking.exists():
            raise serializers.ValidationError('Doctor, timing, and token combination already exists')

        return value

    def validate_timing(self, value):
        print(value)
        doctor = self.initial_data['doctor']
        timing = value
        token = self.initial_data['token']

        existing_Booking = Booking.objects.filter(doctor=doctor, timing=timing, token=token)

        if existing_Booking.exists():
            raise serializers.ValidationError('Doctor, timing, and token combination already exists')

        return value

    def validate_token(self, value):
        doctor = self.initial_data['doctor']
        timing = self.initial_data['timing']
        token = value

        existing_Booking = Booking.objects.filter(doctor=doctor, timing=timing, token=token)

        if existing_Booking.exists():
            raise serializers.ValidationError('Doctor, timing, and token combination already exists')

        return value

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'password',
            'date_joined',
            'last_login',
            'is_superuser',
            'is_staff',
            'is_active'
        ]