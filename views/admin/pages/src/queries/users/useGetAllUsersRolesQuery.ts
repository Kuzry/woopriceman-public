import { useQuery } from "@tanstack/react-query";
import doApiRequest from "../../helpers/doApiRequest";
import { TGetAllWPUsersRolesApiResponse } from "../../types";

export default function useGetAllUsersRolesQuery() {
  return useQuery<TGetAllWPUsersRolesApiResponse>(
    ["get-all-users-roles"],
    async () => await doApiRequest("/wp-users-roles"),
    {
      refetchOnWindowFocus: false,
    }
  );
}
