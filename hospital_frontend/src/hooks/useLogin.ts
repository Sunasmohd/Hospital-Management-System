// import { useQuery } from "@tanstack/react-query";
// import ApiClient from "../services/apiClient";

// const apiClient = new ApiClient('auth/')
// const authInfo = { username: "sunas", password: 123 };
// const jsonAuthInfo = JSON.stringify(authInfo);

// const useLogin = () => useQuery({
//     queryKey: ["auth"],
//     queryFn: () => {
//       return apiClient
//         .post(jsonAuthInfo,{headers:{ 'Content-Type' : 'application/json' }})
//         .then((res) => 
//         {
//           console.log('aaa')
//           console.log(res.data["token"])
//         }
//         );
//     },
//     staleTime: 24 * 60 * 60 * 1000,
//   });

// export default useLogin
