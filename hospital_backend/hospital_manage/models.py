from typing import Any, Iterable, Optional
from django.db import models
from django.contrib.auth.models import User
from datetime import datetime,timedelta
from django.dispatch import receiver
from django.utils import *
from datetime import date
from django.db.models.signals import post_migrate
from django.apps import apps


class Hospitals(models.Model):
    name = models.CharField(max_length=50,unique=True)
    slug = models.SlugField()
    location = models.CharField(max_length=50)
    description = models.TextField(max_length=1000)
    image = models.ImageField(upload_to='hospitals/',null=True)
    email = models.EmailField()
    phone = models.CharField(max_length=10)
    user = models.ForeignKey(User,on_delete=models.CASCADE,null=True,blank=True)
    
    def __str__(self) :
        return self.name
    
    
class Departments(models.Model):
    name = models.CharField(max_length=50)
    slug = models.SlugField()
    description = models.TextField(max_length=1000)
    
    def __str__(self) :
        return self.name

    


class Doctors(models.Model):
    
    name = models.CharField(max_length=50)
    slug = models.SlugField()
    speciality = models.CharField(max_length=50)
    hospital = models.ForeignKey(Hospitals,on_delete=models.CASCADE,null=True)
    image = models.ImageField(upload_to='doctors')
    department = models.ForeignKey(Departments,on_delete=models.CASCADE,null=True)
    user = models.ForeignKey(User,on_delete=models.CASCADE,null=True,blank=True)
    
    def __str__(self):
        return f'{self.name},{self.speciality}'
    

    
from datetime import date, timedelta
today = date.today()
CHOICE_TIMES = [
    (today,today)
]

for i in range(1,10):
    enddate = today + timedelta(i)
    CHOICE_TIMES.append((enddate,enddate))


class TimingsManager(models.Manager):
    def remove_outdated_records(self):
        records = self.filter(timing__lt = today)
        records.delete()


class Timings(models.Model):
    doctor = models.ForeignKey(Doctors,on_delete=models.CASCADE,default=1)
    timing = models.DateField(max_length=100,choices=CHOICE_TIMES)
    token = models.IntegerField()
    
    objects = TimingsManager()

    def __str__(self):
        return str(self.timing)
    
    def delete(self, using: Any = ..., keep_parents: bool = ...) -> tuple[int, dict[str, int]]:
        if self.timing < today:
            self.timing.delete()
    
    class Meta:
        unique_together = [['timing','doctor']]
    
    

CHOICE_STATUS = [
    ('P','Pending'),('A','Approved'),('F','Failed')
]
class Booking(models.Model):
    
    name = models.CharField(max_length=50,unique=True)
    phone = models.BigIntegerField(unique=True)
    address = models.CharField(max_length=500)
    hospital = models.ForeignKey(Hospitals,on_delete=models.CASCADE)
    doctor = models.ForeignKey(Doctors,on_delete=models.CASCADE)
    booked_at = models.DateField(auto_now_add=True)
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    timing = models.ForeignKey(Timings,on_delete=models.CASCADE,related_name='booking')
    is_saved = models.CharField(max_length=50,choices=CHOICE_STATUS,default='P')
    token = models.IntegerField(default=0)
    
    def __str__(self):
        return f'{self.name} - {self.token}'
    
    class Meta:
        unique_together = [['doctor','timing','token']]
    


