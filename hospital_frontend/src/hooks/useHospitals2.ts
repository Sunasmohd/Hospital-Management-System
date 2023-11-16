import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/apiClient";
import { Hosp } from "./useHospital";


const useHospital2 = (slug:string) => {
  const apiClient = new ApiClient<Hosp>(`hospitals/${slug}`)


  return useQuery<Hosp, Error>({
    queryKey: ["hospitals",slug],
    queryFn: () => {
      return apiClient.get()
    },
    staleTime: 24 * 60 * 60 * 1000,
  });
}

export default useHospital2