import { useInfiniteQuery } from "@tanstack/react-query";
import ApiClient, { FetchResponse } from "../services/apiClient";
import useHospStateStore from "../store/HospManagerState";


export interface Timing {
    id: number;
    doctor:string;
    timing:Date;
}
  
  
const apiClient = new ApiClient<Timing>('timings/')



const useTiming = () => {
  const doctor_id = useHospStateStore(s=>s.hospParams.doctor_id)

  return useInfiniteQuery<FetchResponse<Timing>, Error>({
    queryKey: ["timings",doctor_id],
    queryFn: ({ pageParam }) => {
      return apiClient.getAll({params:{ page:pageParam,doctor_id:doctor_id }})
    },
    staleTime: 24 * 60 * 60 * 1000,
    enabled : !!doctor_id,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
  });
}

export default useTiming