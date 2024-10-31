import { useQuery } from "@tanstack/react-query";
import doApiRequest from "../../helpers/doApiRequest";
import { TGetProductsByFilterApiResponse } from "../../types";

export default function useGetProductsByFilter(productFilter: string) {
  return useQuery<TGetProductsByFilterApiResponse>(
    ["get-products-by-filter", productFilter],
    async () => await doApiRequest("/products/" + productFilter),
    {
      enabled: productFilter.length > 0,
      refetchOnWindowFocus: false,
    }
  );
}
