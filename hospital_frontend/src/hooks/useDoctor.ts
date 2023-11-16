import { useInfiniteQuery } from "@tanstack/react-query";
import ApiClient, { FetchResponse } from "../services/apiClient";
import useHospManagerStateStore from "../store/HospManagerState";
import { Dept2, Hosp2 } from "../components/Models/DoctorDetail";


export interface Doc{
    id:number;
    name:string;
    slug:string
    speciality:string;
    department:Dept2[];
    hospital:Hosp2[];
    image:string;
}

const apiClient = new ApiClient<Doc>('doctors/')


const useDoctor = () => {
    const hospital_id = useHospManagerStateStore(s=>s.hospParams.hospital_id)

    return useInfiniteQuery<FetchResponse<Doc>, Error>({
        queryKey: ["doctors",hospital_id],
        queryFn: ({ pageParam }) => {
            return apiClient.getAll({ params: { page: pageParam ,hospital_id:hospital_id} })
        },
        staleTime: 24 * 60 * 60 * 1000,
        getNextPageParam: (lastPage,allPages) => {
            return lastPage.next ? allPages.length + 1 : undefined
        },
        });

}
export default useDoctor