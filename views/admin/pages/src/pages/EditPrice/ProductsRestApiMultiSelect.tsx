import { Loader, MultiSelect } from "@mantine/core";
import __ from "../../helpers/translate";
import { Controller, useFormContext } from "react-hook-form";
import { TPrice } from "../../types";
import { useEffect, useState } from "react";
import { useDebouncedValue } from "@mantine/hooks";
import useGetProductsByFilter from "../../queries/products/useGetProductsByFilter";
import { SelectItem } from "@mantine/core/lib/Select/types";

export default function ProductsRestApiMultiSelect({
  rulesIndex,
  conditionsIndex,
}: {
  rulesIndex: number;
  conditionsIndex: number;
}) {
  const form = useFormContext<TPrice>();

  const [multiSelectData, setMultiSelectData] = useState<
    ReadonlyArray<SelectItem>
  >(
    form
      .getValues(`rules.${rulesIndex}.conditions.${conditionsIndex}.products`)
      ?.map((product) => ({
        value: product.id,
        label: product.name,
      })) ?? []
  );

  const [multiSelectFilter, setMultiSelectFilter] = useState<string>(""),
    [multiSelectFilterDebounced] = useDebouncedValue(multiSelectFilter, 250);

  const getProductsByFilterQuery = useGetProductsByFilter(
    multiSelectFilterDebounced
  );

  useEffect(() => {
    const products = getProductsByFilterQuery.data?.data.products ?? [];
    if (products.length > 0) {
      setMultiSelectData([
        ...multiSelectData,
        ...products
          .filter(
            (product) =>
              !multiSelectData.some((element) => element.value === product.id)
          )
          .map((product) => ({
            value: product.id,
            label: product.name,
          })),
      ]);
    }
  }, [getProductsByFilterQuery.data]);

  return (
    <Controller
      name={`rules.${rulesIndex}.conditions.${conditionsIndex}.products`}
      control={form.control}
      render={({ field, fieldState, formState }) => {
        return (
          <MultiSelect
            value={field.value?.map((product) => product.id) ?? []}
            onChange={(value) => {
              form.setValue(
                `rules.${rulesIndex}.conditions.${conditionsIndex}.products`,
                value.map((val) => ({
                  id: val,
                  name:
                    multiSelectData.find((datum) => datum.value === val)
                      ?.label ?? "",
                }))
              );
            }}
            onBlur={field.onBlur}
            ref={field.ref}
            name={field.name}
            searchable
            disableSelectedItemFiltering
            data={multiSelectData}
            searchValue={multiSelectFilter}
            onSearchChange={setMultiSelectFilter}
            rightSection={getProductsByFilterQuery.isFetching && <Loader />}
          />
        );
      }}
    />
  );
}
