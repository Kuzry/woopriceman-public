import { useMutation } from "@tanstack/react-query";
import doApiRequest from "../../helpers/doApiRequest";
import { TRemovePriceApiRequest, TRemovePriceApiResponse } from "../../types";

export default function useRemovePriceMutation() {
  return useMutation<TRemovePriceApiResponse, unknown, TRemovePriceApiRequest>({
    mutationFn: async (data) =>
      await doApiRequest("/prices/" + data.data.id, {}, "delete"),
  });
}
