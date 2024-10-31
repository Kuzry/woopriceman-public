import { Button, Container, Group, Space, TextInput } from "@mantine/core";
import __ from "../../helpers/translate";
import { useEffect, useState } from "react";
import Paper from "../../components/Paper/Paper";
import PaperContent from "../../components/Paper/PaperContent";
import { SubmitHandler, useForm } from "react-hook-form";
import { TLicense } from "../../types";
import useGetLicensesQuery from "../../queries/licenses/useGetLicensesQuery";
import useActivateLicensesMutation from "../../queries/licenses/useActivateLicensesMutation";
import useDeactivateLicensesMutation from "../../queries/licenses/useDeactivateLicensesMutation";
import Header from "../../components/Header/Header";
import MainMenu from "../../components/MainMenu/MainMenu";
import PageHeader from "../../components/PageHeader/PageHeader";

export default function License() {
  let formAction: "activate" | "deactivate" = "activate";

  const form = useForm<TLicense>();

  const getLicensesQuery = useGetLicensesQuery(),
    activateLicensesMutation = useActivateLicensesMutation(),
    deactivateLicensesMutation = useDeactivateLicensesMutation();

  const handleFormSubmit: SubmitHandler<TLicense> = (data) => {
    if ("activate" === formAction) {
      activateLicensesMutation.mutate(data.key, {
        onSuccess: (data) => {
          if (data.success) {
            location.reload();
          } else {
            form.setError("key", { message: data.error });
          }
        },
      });
    }

    if ("deactivate" === formAction) {
      deactivateLicensesMutation.mutate(data.key, {
        onSuccess: (data) => {
          if (data.success) {
            location.reload();
          } else {
            form.setError("key", { message: data.error });
          }
        },
      });
    }
  };

  useEffect(() => {
    form.setValue("key", getLicensesQuery.data?.data.key ?? "");
  }, [getLicensesQuery.data]);

  return (
    <form onSubmit={form.handleSubmit(handleFormSubmit)}>
      <Header />
      <MainMenu />
      <Container>
        <PageHeader title={__("License")} />
        <Paper>
          <PaperContent>
            {getLicensesQuery.isLoading && <div>Loading...</div>}
            {!getLicensesQuery.isLoading && (
              <>
                <TextInput
                  {...form.register("key", {
                    validate: {
                      required: (value) =>
                        !!value.trim()
                          ? true
                          : __("Please enter a license key"),
                    },
                  })}
                  label={__("License key")}
                  error={form.formState.errors.key?.message as string}
                />
                <Space h="xl" />
                <Group>
                  <Button
                    type="submit"
                    loading={activateLicensesMutation.isLoading}
                    onClick={() => (formAction = "activate")}
                  >
                    {__("Activate")}
                  </Button>
                  <Button
                    type="submit"
                    loading={deactivateLicensesMutation.isLoading}
                    onClick={() => (formAction = "deactivate")}
                  >
                    {__("Deactivate")}
                  </Button>
                </Group>
                <Space h="xl" />
                <div>
                  {__("License status")}: &nbsp;
                  {getLicensesQuery.data?.data.license_response_body.activated
                    ? __("Active")
                    : __("Inactive")}
                </div>
              </>
            )}
          </PaperContent>
        </Paper>
      </Container>
    </form>
  );
}
