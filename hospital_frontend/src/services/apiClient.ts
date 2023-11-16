import axios, { AxiosRequestConfig } from "axios";

export interface FetchResponse<T>{
    count : number;
    next : string;
    previous:number;
    results : T[]
  }
  
const token = localStorage.getItem('token')
console.log(token)
const fetchRequest = axios.create({
    baseURL : "http://127.0.0.1:8000/api/",headers:{'Authorization':`JWT ${token}`}
})

const fetchAuthRequest = axios.create({
    baseURL : "http://127.0.0.1:8000/auth/",
})

class ApiClient <T>{

    constructor(public endpoint:string){}

    get = (config?:AxiosRequestConfig) => {
        return fetchRequest.get<T>(this.endpoint,config).then(res=>res.data).catch(err=>err)
    }
    
    getAll = (config?:AxiosRequestConfig) => {
        
        return fetchRequest.get<FetchResponse<T>>(this.endpoint,config).then((res) => res.data).catch((err) => err.response.data);
    }

    post = (data:T,config?:AxiosRequestConfig) => {
        return fetchRequest.post<T>(this.endpoint,data,config).then(res => res.data).catch((err) => {
            if(err.response.data){
              
               throw err.response.data
                
            }
            return err
        });
    }

    delete = () => {
        return fetchRequest.delete<T>(this.endpoint).then(res => res.data)
    }

    update = ( data : T ) => {
        return fetchRequest.put<T>(this.endpoint,data).then(res => res.data)
    }

    postRegister = ( data : T ) => {
        return fetchAuthRequest.post<T>(this.endpoint,data).then(res => res.data)
    }
}

export default ApiClient
