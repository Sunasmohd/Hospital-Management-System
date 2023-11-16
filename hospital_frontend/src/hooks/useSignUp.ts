import { useMutation, useQueryClient } from "@tanstack/react-query"
import ApiClient from "../services/apiClient"
import { SignUpFields } from "../components/Login/Register"
// import { useNavigate } from "react-router-dom"



const useSignUp = () => {
  // const navigate = useNavigate()
  const queryClient = useQueryClient()
  const apiClient = new ApiClient<SignUpFields>('users/')
  return useMutation<SignUpFields,Error,SignUpFields>({
    mutationFn : apiClient.postRegister,
    onSuccess : ( savedData:any , newData ) => {
      queryClient.setQueryData<SignUpFields[]>( ['SignUp'] ,data => [...(data || []),newData] )
      // savedData['message'] === 'success' ? navigate('/login') : null
      console.log(savedData)

      // savedData ? navigate('/login') : null
      console.log(savedData)
    },
    onError : (error,newData) =>{
      console.log(newData,error.message)
    }
  })
}

export default useSignUp