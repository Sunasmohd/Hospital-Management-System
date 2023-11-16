import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/apiClient";
import { Doc } from "./useDoctor";


const useDoctor2 = (slug:string) => {
  const apiClient = new ApiClient<Doc>(`doctors/${slug}`)

  return useQuery<Doc, Error>({
    queryKey: ["doctors",slug],
    queryFn: () => {
      return apiClient.get()
    },
    staleTime: 24 * 60 * 60 * 1000,
  });
}

export default useDoctor2