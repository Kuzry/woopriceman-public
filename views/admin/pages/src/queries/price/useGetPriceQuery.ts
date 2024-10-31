import { useQuery } from "@tanstack/react-query";
import doApiRequest from "../../helpers/doApiRequest";
import { TGetPriceApiResponse } from "../../types";

export default function useGetPriceQuery(priceId: number) {
  return useQuery<TGetPriceApiResponse>(
    ["get-price", priceId],
    async () => doApiRequest("/prices/" + priceId),
    {
      refetchOnWindowFocus: false,
    }
  );
}
