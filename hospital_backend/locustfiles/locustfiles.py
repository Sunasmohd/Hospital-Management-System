from locust import HttpUser,task,between,events
from random import randint

class WebsiteUser(HttpUser):
  wait_time = between(1,5)
  hospital_slug = None
  doctor_slug = None
  department_slug = None

  # def on_start(self):
  #   if not hasattr(self,'access_token') or not self.access_token:
  #     self.login()
      
  
  
  # def login(self): 
  #   data = {'username':'sunas','password':123}
  #   response = self.client.post(
  #     '/auth/jwt/create/',json=data,name='/auth/jwt/create/'
  #   )
    
    # assert response.status_code == 200, f'Login failed with status_code : {response.status_code}'
    
    # token = response.json()['access']
    # self.access_token = {'Authorization':f'JWT {token}'}
    
  
  @task(2)
  def view_hospitals(self):
    # headers = self.access_token
    response = self.client.get(
      '/api/hospitals/',name='/api/hospitals/',
      # headers=headers
    )
    
    assert response.status_code == 200, f'Fetching hospital failed with status_code : {response.status_code}'
    
    if response:
      hospital = response.json()['results'][randint(0,3)]['slug']
      WebsiteUser.hospital_slug = hospital
      
      
  @task(4)
  def view_hospital_details(self):
      if WebsiteUser.hospital_slug != None:
        # headers = self.access_token
        response = self.client.get(
          f'/api/hospitals/{WebsiteUser.hospital_slug}/',name='/hospitals/:slug',
          #  headers=headers
      )
        
        assert response.status_code == 200,f'Fetching hospital details failed with status_code : {response.status_code}'    

    
  @task(2)
  def view_doctors(self):
    # headers = self.access_token
    
    response = self.client.get(
      '/api/doctors/',name='/api/doctors/',
      # headers=headers
    )
    
    assert response.status_code == 200,f'Fetching doctors failed with status_code : {response.status_code}'
    
    if response:
      doctor = response.json()['results'][randint(0,4)]['slug']
      WebsiteUser.doctor_slug = doctor
    
    
    
  @task(4) 
  def view_doctor_details(self):
    if WebsiteUser.doctor_slug != None:
      # headers = self.access_token
      
      response = self.client.get(
        f'/api/doctors/{WebsiteUser.doctor_slug}/',name='/api/doctors/:slug/',
        # headers=headers
      )
      
      assert response.status_code == 200,f'Fetching doctor details failed with status_code : {response.status_code}'
    
    
  @task(2)
  def view_departments(self):
    # headers = self.access_token
    
    response = self.client.get(
      '/api/departments/',name='/api/departments/',
      # headers=headers
    )
    
    assert response.status_code == 200,f'Fetching doctors failed with status_code : {response.status_code}'
    
    if response:
      department = response.json()['results'][randint(1,5)]['slug']
      WebsiteUser.department_slug = department
  
  @task(4)  
  def view_department_details(self):
    if WebsiteUser.department_slug != None:
      # headers = self.access_token
      
      response = self.client.get(
        f'/api/departments/{WebsiteUser.department_slug}/',name='/api/departmens/:slug/',
        # headers=headers
      )
      
      assert response.status_code == 200,f'Fetching doctor details failed with status_code : {response.status_code}'
    
    
  @task(1)
  def view_timings(self):
    # headers = self.access_token
    doctor_id = randint(1,5)
    
    response = self.client.get(
      f'/api/timings/?doctor_id={doctor_id}',name='/api/timings/',
      # headers=headers
    )
    
    assert response.status_code == 200,f'Fetching doctors failed with status_code : {response.status_code}'
    
  
  @task(1)
  def view_tokens(self):
    # headers = self.access_token
    timing_id = randint(1,5)
    
    response = self.client.get(
      f'/api/timings/{timing_id}/tokens',name='/api/tokens/',
      # headers=headers
    )
    
    assert response.status_code == 200, f'Fetching timings failed with status_code : {response.status_code}'
