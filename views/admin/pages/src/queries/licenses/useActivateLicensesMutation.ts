import { useMutation } from "@tanstack/react-query";
import doApiRequest from "../../helpers/doApiRequest";

function useActivateLicensesMutation() {
  return useMutation({
    mutationFn: async (key: string) =>
      doApiRequest("/licenses/activate/" + key),
  });
}

export default useActivateLicensesMutation;
