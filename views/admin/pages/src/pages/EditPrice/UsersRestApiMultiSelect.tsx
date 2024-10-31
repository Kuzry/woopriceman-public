import { Loader, MultiSelect } from "@mantine/core";
import __ from "../../helpers/translate";
import { Controller, useFormContext } from "react-hook-form";
import { TPrice } from "../../types";
import { useEffect, useState } from "react";
import { SelectItem } from "@mantine/core/lib/Select/types";
import { useDebouncedValue } from "@mantine/hooks";
import useGetUsersByFilterQuery from "../../queries/users/useGetUsersByFilterQuery";

export default function UsersRestApiMultiSelect({
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
      .getValues(`rules.${rulesIndex}.conditions.${conditionsIndex}.users`)
      ?.map((user) => ({
        value: user.id,
        label: user.name,
      })) ?? []
  );

  const [multiSelectFilter, setMultiSelectFilter] = useState<string>(""),
    [multiSelectFilterDebounced] = useDebouncedValue(multiSelectFilter, 250);

  const getUsersByFilterQuery = useGetUsersByFilterQuery(
    multiSelectFilterDebounced
  );

  useEffect(() => {
    const users = getUsersByFilterQuery.data?.data.users ?? [];
    if (users.length > 0) {
      setMultiSelectData([
        ...multiSelectData,
        ...users
          .filter(
            (user) =>
              !multiSelectData.some((element) => element.value === user.id)
          )
          .map((user) => ({
            value: user.id,
            label: user.name,
          })),
      ]);
    }
  }, [getUsersByFilterQuery.data]);

  return (
    <Controller
      name={`rules.${rulesIndex}.conditions.${conditionsIndex}.users`}
      control={form.control}
      render={({ field, fieldState, formState }) => {
        return (
          <MultiSelect
            value={field.value?.map((user) => user.id) ?? []}
            onChange={(value) => {
              form.setValue(
                `rules.${rulesIndex}.conditions.${conditionsIndex}.users`,
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
            rightSection={getUsersByFilterQuery.isFetching && <Loader />}
          />
        );
      }}
    />
  );
}
