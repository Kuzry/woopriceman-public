import { useMutation } from "@tanstack/react-query";
import doApiRequest from "../../helpers/doApiRequest";
import { TAddPriceApiRequest, TAddPriceApiResponse } from "../../types";

export default function useAddPriceMutation() {
  return useMutation<TAddPriceApiResponse, unknown, TAddPriceApiRequest>({
    mutationFn: async (data) => await doApiRequest("/prices", data, "post"),
  });
}
