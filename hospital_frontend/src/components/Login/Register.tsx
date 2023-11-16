import "./Register.css";
import styled from "styled-components";
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import useSignUp from '../../hooks/useSignUp'

const schema =  z.object({
  username : z.string().max(20).min(5,{message:'Username is Required'}),
  email : z.string().email({message:'Invalid Email Format'}),
  password : z.string().min(8,{message : 'Password Must Contain 8 Characters'}),
  password2 : z.string(),
})

export type SignUpFields =  z.infer<typeof schema>



const Div = styled.div`
  width: 60%;
  margin: auto;
  margin-top:2rem;

  border-radius: 4px;
  @media(max-width:800px){
    margin-top:60px;
    
  }
  @media(max-width:650px){
    width:80%;
    
  }
`;

const Input = styled.input`
  width: 100%;
  color: rgb(0, 0, 0);
  background-color: rgb(242, 242, 242);
  border: 1px solid rgba(251, 251, 251, 0.9);
  height: 40px;
  width: 100%;
  padding-left: 10px;
  border-radius: 0px;
  border-radius: 4px;
  font-size:14px;
`;

const Label = styled.label`
  color: rgb(6, 6, 6);
  padding-top: 8px;
  padding-left: 2px;
  font-family: Poppins;
  font-size: 13px;
  padding-top: 8px;
  padding-left: 2px;
`;
const FormContainer = styled.form`
  border:1px solid lightgray; 
  border-radius:10px; 
   margin-bottom:2rem;

  display: grid;
  grid-template-areas:
    "username email"
    "p1 p2"
    "bt bt"
    "al al";
  column-gap: 35px;
  row-gap: 30px;
  padding: 45px 40px 0px 40px;
  @media(max-width:800px){
    display: grid;
    grid-template-areas: 
    'username'
    'email'
    'p1'
    'p2'
    'bt'
    'al'
    ;
    column-gap: 35px;
    row-gap: 30px;
    padding: 45px 40px 0px 40px;
  }
`;

const FormButton = styled.input`
height: 40px;
color: rgb(255, 255, 255);
font-size: 15px;
background-color: rgb(57, 147, 165);
border-radius: 0px;
border-radius: 4px;
`

const AC = styled.a`
font-size:15px;
color:black;
`

const Row = styled.div`
padding-top:60px;
  height:100vh;
@media(max-width:800px){
  height:130vh;
}
`

const MainHeading = styled.h1`
text-align:center;
font-family:Roboto;
font-weight:600;
margin-top:2rem;
padding:0;
`
const Register = () => {
  const signUp = useSignUp()
  const { register,handleSubmit,formState:{ errors },setError } = useForm<SignUpFields>({resolver : zodResolver(schema)})
  console.log(errors)
  const passwordsMatch = (data:SignUpFields) => {
     if(data.password !== data.password2) {return false} else{return true}
    }
    
    const FormValues = ( data : SignUpFields ) => { 
        console.log(' not macth')
        if (passwordsMatch(data)) {
          console.log(' macth')
          signUp.mutate({
            username : data.username,
            email : data.email,
            password : data.password,
            password2 : data.password2
          })
         
          
        } else{
           setError('password2',{message:'Passwords does not match'})
        }
        
        

     }
  return (
    <>
      <Row>
      <MainHeading>Create Your Docbook Account</MainHeading>

        <Div className="container">
          <FormContainer method="post" className="form-container mt-3" onSubmit={handleSubmit(FormValues)}>
            <div className="form-group reg-username">
              <Input {...register('username')} type="text" className="form-control" placeholder="Enter Username" />
              <Label htmlFor="" className="pt-2">
                Username
              </Label>
            </div>
            { (errors.username)  && <h6 className="text-dark"> {errors.username?.message} </h6> }

            <div className="form-group reg-email">
              <Input {...register('email')} type="email" className="form-control" placeholder="Enter Email"/>
              <Label htmlFor="" className="pt-2">
                Email
              </Label>
            </div>
            { (errors.email)  && <h6 className="text-dark"> {errors.email?.message} </h6> }

            <div className="form-group reg-p1">
              <Input {...register('password')} type="password" className="form-control" placeholder="Enter Password"/>
              <Label htmlFor="" className="pt-2">
                Password
              </Label>
            </div>
            { (errors.password)  && <h6> {errors.password?.message} </h6> }

            <div className="form-group reg-p2">
              <Input {...register('password2')} type="password" className="form-control" placeholder="Confirm Password"/>
              <Label htmlFor="" className="pt-2">
                Confirm Password
              </Label>
            </div>
            { (errors.password2)  && <h6> {errors.password2?.message} </h6> }

            <FormButton
              type="submit"
              value="Register"
              className="mt-4 p-1 btn btn-dark bg-dark reg-bt"
            />
            <AC className="reg-al" href="{% url 'login_app' %}">
              Already have an account? Login
            </AC>
          </FormContainer>
        </Div>
      </Row>
    </>
  );
};

export default Register;
