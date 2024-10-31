import { useQuery } from "@tanstack/react-query";
import doApiRequest from "../../helpers/doApiRequest";
import { TGetSettingsApiResponse } from "../../types";

export default function useGetSettingsQuery() {
  return useQuery<TGetSettingsApiResponse>(
    ["get-settings"],
    async () => doApiRequest("/settings"),
    {
      refetchOnWindowFocus: false,
    }
  );
}
