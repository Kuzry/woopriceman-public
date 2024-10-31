import { useQuery } from "@tanstack/react-query";
import doApiRequest from "../../helpers/doApiRequest";
import { TGetAllPricesApiResponse } from "../../types";

export default function useGetAllPricesQuery() {
  return useQuery<TGetAllPricesApiResponse>(
    ["get-all-prices"],
    async () => doApiRequest("/prices"),
    {
      refetchOnWindowFocus: false,
    }
  );
}
