import { useInfiniteQuery } from "@tanstack/react-query";
import ApiClient, { FetchResponse } from "../services/apiClient";
import useHospStateStore from "../store/HospManagerState";


export interface Token {
    id:number;
    token:string;
}
  
  



const useToken = () => {
  const timing_id = useHospStateStore(s=>s.hospParams.timing_id)
  const apiClient = new ApiClient<Token>(`timings/${timing_id || 0}/tokens`)

  return useInfiniteQuery<FetchResponse<Token>, Error>({
    queryKey: ["tokens",timing_id],
    queryFn: ({ pageParam }) => {
      return apiClient.getAll({params:{ page:pageParam,id:timing_id }})
    },
    staleTime: 24 * 60 * 60 * 1000,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
    enabled : !!timing_id
  });
}

export default useToken