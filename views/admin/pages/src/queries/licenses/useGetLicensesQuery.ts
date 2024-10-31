import { useQuery } from "@tanstack/react-query";
import doApiRequest from "../../helpers/doApiRequest";
import { TGetLicenseApiResponse } from "../../types";

function useGetLicensesQuery() {
  return useQuery<TGetLicenseApiResponse>(
    ["get-licenses"],
    async () => await doApiRequest("/licenses"),
    {
      refetchOnWindowFocus: false,
    }
  );
}

export default useGetLicensesQuery;
