import { Button, Container, Grid, SegmentedControl } from "@mantine/core";
import { useEffect, useState } from "react";
import __ from "../../helpers/translate";
import Paper from "../../components/Paper/Paper";
import PaperContent from "../../components/Paper/PaperContent";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { TSettings } from "../../types";
import useUpdateSettingsMutation from "../../queries/settings/useUpdateSettingsMutation";
import useGetSettingsQuery from "../../queries/settings/useGetSettingsQuery";
import Header from "../../components/Header/Header";
import MainMenu from "../../components/MainMenu/MainMenu";
import PageHeader from "../../components/PageHeader/PageHeader";

export default function Settings() {
  const form = useForm<TSettings>({
    defaultValues: {
      calculate_price_by: "regular_price",
    },
  });

  const getSettingsQuery = useGetSettingsQuery();

  const updateSettingsMutation = useUpdateSettingsMutation();

  const handleFormSubmit: SubmitHandler<TSettings> = (data) => {
    updateSettingsMutation.mutate({
      data: data,
    });
  };

  useEffect(() => {
    form.reset({
      calculate_price_by:
        getSettingsQuery.data?.data.calculate_price_by ?? "regular_price",
    });
  }, [getSettingsQuery.data]);

  return (
    <form onSubmit={form.handleSubmit(handleFormSubmit)}>
      <Header />
      <MainMenu />
      <Container>
        <PageHeader title={__("Settings")}>
          <Button
            type="submit"
            loading={updateSettingsMutation.isLoading}
            style={{ margin: "9px 0" }}
          >
            {__("Update")}
          </Button>
        </PageHeader>
        <Paper>
          <PaperContent>
            {getSettingsQuery.isLoading && __("Loading...")}
            {!getSettingsQuery.isLoading && (
              <Grid>
                <Grid.Col span={2}>{__("Calculate price by")}</Grid.Col>
                <Grid.Col span={10}>
                  <Controller
                    name="calculate_price_by"
                    control={form.control}
                    render={({ field, fieldState, formState }) => (
                      <SegmentedControl
                        value={field.value}
                        onChange={field.onChange}
                        data={[
                          {
                            value: "regular_price",
                            label: __("Regular price"),
                          },
                          {
                            value: "sale_price",
                            label: __("Sale price"),
                          },
                        ]}
                      />
                    )}
                  />
                </Grid.Col>
              </Grid>
            )}
          </PaperContent>
        </Paper>
      </Container>
    </form>
  );
}
