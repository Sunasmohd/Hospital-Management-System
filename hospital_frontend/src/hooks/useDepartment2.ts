import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/apiClient";
import { Dept } from "./useDepartment";


const useDepartment2 = (slug:string) => {
  const apiClient = new ApiClient<Dept>(`departments/${slug}`)

  return useQuery<Dept, Error>({
    queryKey: ["departments",slug],
    queryFn: () => {
      return apiClient.get()
    },
    staleTime: 24 * 60 * 60 * 1000,
  });
}

export default useDepartment2