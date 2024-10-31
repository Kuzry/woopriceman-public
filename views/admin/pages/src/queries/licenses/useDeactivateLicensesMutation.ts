import { useMutation } from "@tanstack/react-query";
import doApiRequest from "../../helpers/doApiRequest";

function useDeactivateLicensesMutation() {
  return useMutation({
    mutationFn: async (key: string) =>
      doApiRequest("/licenses/deactivate/" + key),
  });
}

export default useDeactivateLicensesMutation;
