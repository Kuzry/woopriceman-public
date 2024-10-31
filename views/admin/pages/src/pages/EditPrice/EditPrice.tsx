import {
  Button,
  Container,
  Flex,
  Space,
  Switch,
  TextInput,
} from "@mantine/core";
import useGetPriceQuery from "../../queries/price/useGetPriceQuery";
import __ from "../../helpers/translate";
import { useEffect, useState } from "react";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { TPrice } from "../../types";
import EditPriceRules from "./EditPriceRules";
import useUpdatePriceMutation from "../../queries/price/useUpdatePriceMutation";
import useGetAllUsersRolesQuery from "../../queries/users/useGetAllUsersRolesQuery";
import Header from "../../components/Header/Header";
import MainMenu from "../../components/MainMenu/MainMenu";
import PageHeader from "../../components/PageHeader/PageHeader";
import Paper from "../../components/Paper/Paper";
import PaperContent from "../../components/Paper/PaperContent";

export default function EditPrice({ priceId }: { priceId: number }) {
  const [navbarOpened, setNavbarOpened] = useState<boolean>(false);

  const getPriceQuery = useGetPriceQuery(priceId);

  const getAllUsersRolesQuery = useGetAllUsersRolesQuery();

  const updatePriceMutation = useUpdatePriceMutation(priceId);

  const form = useForm<TPrice>();

  const handleFormSubmit: SubmitHandler<TPrice> = (data) => {
    updatePriceMutation.mutate({
      data: data,
    });
  };

  useEffect(() => {
    form.reset({
      name: getPriceQuery.data?.data.name ?? "",
      rules: getPriceQuery.data?.data.rules ?? [],
      enabled: getPriceQuery.data?.data.enabled ?? false,
    });
  }, [getPriceQuery.data]);

  return (
    <>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          style={{ paddingBottom: 200 }}
        >
          <Header />
          <MainMenu />
          <Container>
            {(getPriceQuery.isLoading || getAllUsersRolesQuery.isLoading) && (
              <div>Loading...</div>
            )}
            {!getPriceQuery.isLoading && !getAllUsersRolesQuery.isLoading && (
              <>
                <PageHeader title={__("Edit discount")}>
                  <Flex>
                    <div>
                      <Controller
                        name="enabled"
                        control={form.control}
                        render={({ field, fieldState, formState }) => (
                          <Switch
                            checked={field.value}
                            onChange={field.onChange}
                            onLabel={__("Enabled")}
                            offLabel={__("Disabled")}
                            size="lg"
                            style={{ padding: "15px 0", marginRight: 20 }}
                          />
                        )}
                      />
                    </div>
                    <div>
                      <Button
                        type="submit"
                        loading={updatePriceMutation.isLoading}
                        style={{ margin: "9px 0" }}
                      >
                        {__("Update")}
                      </Button>
                    </div>
                  </Flex>
                </PageHeader>
                <Paper>
                  <PaperContent>
                    <TextInput
                      {...form.register("name", {
                        validate: {
                          required: (value) =>
                            !!value.trim() ? true : __("Please enter a name"),
                        },
                      })}
                      error={form.formState.errors.name?.message as string}
                      styles={{
                        root: {
                          // paddingBottom: 40,
                        },
                        input: {
                          // border: "none !important",
                        },
                      }}
                    />
                  </PaperContent>
                </Paper>
                <Space h="xl"></Space>
                <EditPriceRules />
              </>
            )}
          </Container>
        </form>
      </FormProvider>
    </>
  );
}
