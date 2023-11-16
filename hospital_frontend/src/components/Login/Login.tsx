import styled from "styled-components";
import axios from 'axios';
import { FieldValues, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod/dist/zod.js';

import ApiClient from "../../services/apiClient";
import { useQuery } from "@tanstack/react-query";
import { Navigate} from 'react-router-dom';

const schema = z.object({
  username : z.string(),
  password : z.string()
})

type LoginFields = z.infer<typeof schema>


const Div = styled.div`
  width: 50%;
  border-radius: 4px;
  margin-top:2rem;
  
  @media(max-width:800px){

  }
  @media(max-width:600px){
    width:80%;

  }
`;

const Input = styled.input`
color: rgb(0, 0, 0);
background-color: rgb(242, 242, 242);
border: 1px solid rgba(251, 251, 251, 0.9);
height: 40px;
width: 100%;
padding-left: 10px;
border-radius: 0px;
font-size:14px;
border-radius: 4px;
`;

const Label = styled.label`
font-size: 13px;
font-family: Poppins;
margin-bottom: 4px;
margin-top: 5px;
margin-left: 2px;
`;
const FormContainer = styled.form`
padding:15px 25px 30px 25px;
display:grid;
grid-template-columns : 1fr 1fr;
border:1px solid lightgray;
border-radius:10px;

column-gap : 15px;
@media(max-width:800px){
  grid-template-columns: 1fr;
}
`

const AC = styled.a`
    font-size:12px;
    text-align:center;
    margin-top:30px;
    color:black;
`
const Row = styled.div`
    padding-top:60px;
    height:100vh;
   

`
const FormButton = styled.input`
  width:100%;
`

const MainHeading = styled.h1`
text-align:center;
font-family:Roboto;
font-weight:600;
margin-top:2rem;
padding:0;
`
const Login = () => {
  const toke = localStorage.getItem('token')
 if (toke) return <Navigate to='/'/>
//   const apiClient = new ApiClient('auth/')
// const authInfo = { username: "sunas", password: 123 };
// const jsonAuthInfo = JSON.stringify(authInfo);

// useQuery({
//     queryKey: ["auth"],
//     queryFn: () => {
//       return apiClient
//         .post(jsonAuthInfo,{headers:{ 'Content-Type' : 'application/json' }})
//         .then((res) => res.data["token"]);
//     },
//     staleTime: 24 * 60 * 60 * 1000,
//   });


  const { register,handleSubmit,formState : {errors} ,setError} = useForm<LoginFields>({resolver:zodResolver(schema)})
  const onFormSubmit = (data : FieldValues) => {
    axios.post('http://127.0.0.1:8000/auth/jwt/create/',data,{headers:{'Content-Type': 'application/json'}})
    .then(res=>{
      const token = res.data['access']
      const error = res.data['detail']
      console.log(error)
      if(token){
        localStorage.setItem('token',token),
        window.location.href = '/'
      }
    })
      // const token = res.data['access_token']
      
    //   // if(token){
    //   //   localStorage.setItem('token',token)
    //   //   window.location.href = '/'
    //   // }else{
    //   //   setError('password',{message : 'Username and password does not match'})
    //   // }
    // })
    // .catch(err => console.log(err))

  }

  return (
    <>
    
    <Row>
      <MainHeading>Log in to Docbook</MainHeading>
        <Div className="container">
            <FormContainer action="" method="POST" className="mt-2 form-container" onSubmit={handleSubmit(onFormSubmit)}>
                
                <div className="form-group">
                    <Label htmlFor="username" className="pt-2 ">Username</Label>
                    <Input {...register('username')} type="text" name="username" placeholder="Enter Username"/>
                </div>
                { (errors.username)  && <h6> {errors.username?.message} </h6> }
                <div className="form-group">
                    <Label htmlFor="password" className="pt-2 ">Password</Label>
                    <Input {...register('password')} type="password" name="password" placeholder="Enter Password"/>
                </div>
                { (errors.password)  && <h6> {errors.password?.message} </h6> }
                
                <FormButton type="submit" value="Login" className="btn btn-dark text-light mt-4 mb-2 p-1"/>

                <AC href="">Did'nt have an account? &nbsp;Create an account</AC>
            </FormContainer>
        </Div>
    </Row>


    
    </>
  )
}

export default Login