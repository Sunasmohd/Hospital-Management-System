import { useInfiniteQuery } from "@tanstack/react-query";
import ApiClient, { FetchResponse } from "../services/apiClient";
import useHospManagerStateStore from "../store/HospManagerState";
import { Doc } from "./useDoctor";


export interface Hosp {
    id: number;
    name: string;
    slug:string;
    description: string;
    image: string;
    location:string;
    email:string;
    phone:string;
    doctors_set : Doc[];
}
  
  
const apiClient = new ApiClient<Hosp>('hospitals/')

const useHospital = () => {
  const search = useHospManagerStateStore(s=>s.hospParams.hospSearchText)

  return useInfiniteQuery<FetchResponse<Hosp>, Error>({
    queryKey: ["hospitals",search],
    queryFn: ({ pageParam }) => {
      return apiClient.getAll({params:{ page:pageParam,search:search }})
    },
    staleTime: 24 * 60 * 60 * 1000,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
  });
}

export default useHospital