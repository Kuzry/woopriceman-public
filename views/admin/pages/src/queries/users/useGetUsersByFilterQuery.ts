import { useQuery } from "@tanstack/react-query";
import doApiRequest from "../../helpers/doApiRequest";
import { TGetUsersByFilterApiResponse } from "../../types";

export default function useGetUsersByFilterQuery(userFilter: string) {
  return useQuery<TGetUsersByFilterApiResponse>(
    ["get-users-by-filter", userFilter],
    async () => {
      return await doApiRequest("/users?s=" + userFilter);
    },
    {
      enabled: userFilter.length > 0,
      refetchOnWindowFocus: false,
    }
  );
}
