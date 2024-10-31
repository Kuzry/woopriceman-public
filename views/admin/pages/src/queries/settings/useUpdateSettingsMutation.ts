import { useMutation } from "@tanstack/react-query";
import doApiRequest from "../../helpers/doApiRequest";
import {
  TUpdateSettingsApiRequest,
  TUpdateSettingsApiResponse,
} from "../../types";

export default function useUpdateSettingsMutation() {
  return useMutation<
    TUpdateSettingsApiResponse,
    unknown,
    TUpdateSettingsApiRequest
  >({
    mutationFn: async (data) => doApiRequest("/settings", data, "patch"),
  });
}
