import { useMutation } from "@tanstack/react-query";
import doApiRequest from "../../helpers/doApiRequest";
import { TUpdatePriceApiRequest, TUpdatePriceApiResponse } from "../../types";

export default function useUpdatePriceMutation(priceId: number) {
  return useMutation<TUpdatePriceApiResponse, unknown, TUpdatePriceApiRequest>({
    mutationFn: async (data) =>
      doApiRequest("/prices/" + priceId, data, "patch"),
  });
}
