import { Button, Modal, Select, Space, TextInput } from "@mantine/core";
import useAddPriceMutation from "../../../queries/price/useAddPriceMutation";
import { SubmitHandler, useForm } from "react-hook-form";
import { TPrice } from "../../../types";
import __ from "../../../helpers/translate";
import generateUrl from "../../../helpers/generateUrl";
import { useEffect } from "react";

export default function AddPriceModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const addPriceMutation = useAddPriceMutation();

  const form = useForm<TPrice>();

  const handleFormSubmit: SubmitHandler<TPrice> = (data) => {
    addPriceMutation.mutate(
      {
        data: {
          name: data.name,
        },
      },
      {
        onSuccess: (response) => {
          window.location.href = generateUrl("edit-price", {
            id: response.data.id,
          });
        },
      }
    );
  };

  useEffect(() => {
    if (isOpen) {
      form.reset();
    }
  }, [isOpen]);

  return (
    <Modal opened={isOpen} onClose={onClose}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)}>
        <TextInput
          data-autofocus
          {...form.register("name", {
            validate: {
              required: (value) =>
                !!value.trim() ? true : __("Please enter a name"),
            },
          })}
          label={__("Price name")}
          error={form.formState.errors.name?.message as string}
        />
        <Space h="xl" />
        {/*<Select*/}
        {/*  defaultValue="role"*/}
        {/*  data={[{ value: "role", label: __("Role based pricing") }]}*/}
        {/*/>*/}
        <Button type="submit" loading={addPriceMutation.isLoading}>
          {__("Add price")}
        </Button>
      </form>
    </Modal>
  );
}
