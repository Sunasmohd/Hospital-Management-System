import { useInfiniteQuery } from "@tanstack/react-query";
import ApiClient, { FetchResponse } from "../services/apiClient";
import { Doc } from "./useDoctor";

export interface Dept{
    id:number;
    slug:string;
    name:string;
    description:string;
    doctors_set : Doc[]
}

const apiClient = new ApiClient<Dept>('departments/')


const useDepartment = () => {

    // const {
    //     data: authToken,
    //     error: authError,
    //     isLoading: authLoading,
    // } = useAutho();
    
    const request = useInfiniteQuery<FetchResponse<Dept>>({
        queryKey: ['departments'],
        queryFn: ({ pageParam }) => {
            return apiClient.
            getAll(
                {
                    //  headers: { Authorization: `Bearer ${authToken}` },
                 params: { page: pageParam } })
        },
        staleTime: 24 * 60 * 60 * 1000,
        // enabled: !authError && !authLoading,
        getNextPageParam: (lastPage,allPages) => {
            return lastPage.next ? allPages.length + 1 : undefined
        }
        });
    const dataLength = request.data?.pages.reduce((acc,page) => acc + page.results.length , 0) || 0;
    return { request, dataLength }
}
export default useDepartment