import { useMutation, useQueryClient } from "@tanstack/react-query"
import ApiClient from "../services/apiClient"
// import { useNavigate } from "react-router-dom"

interface Bookings{
  name:string;
  phone:number;
  address:string;
  hospital:number;
  doctor :number;
  timing : number;
  token : number;
}
const apiClient = new ApiClient<Bookings>('bookings/')
interface Error{
  response : Data
}
interface Data {
  data : Bookings
}

const useBooking = () => {
  // const navigate = useNavigate()
  const queryClient = useQueryClient()
  return useMutation<Bookings,Error,Bookings>({
    mutationFn : apiClient.post,
    onSuccess : ( savedData:any , newData ) => {
      queryClient.setQueryData<Bookings[]>( ['Bookings'] ,data => [...(data || []),newData] )
      // savedData['message'] === 'success' ? navigate('/login') : null

      // savedData ? navigate('/login') : null
    },
    onError : (error,newData) =>{
     console.error(error.response.data.phone)
    }
  })
}

export default useBooking