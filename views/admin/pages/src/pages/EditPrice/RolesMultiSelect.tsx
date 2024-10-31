import { Controller, useFormContext } from "react-hook-form";
import { MultiSelect } from "@mantine/core";
import { TPrice } from "../../types";
import __ from "../../helpers/translate";
import useGetAllUsersRolesQuery from "../../queries/users/useGetAllUsersRolesQuery";
import { useState } from "react";
import { SelectItem } from "@mantine/core/lib/Select/types";

export default function RolesMultiSelect({
  rulesIndex,
  conditionsIndex,
}: {
  rulesIndex: number;
  conditionsIndex: number;
}) {
  const form = useFormContext<TPrice>();

  const getAllUsersRolesQuery = useGetAllUsersRolesQuery();

  const [multiSelectData, setMultiSelectData] = useState<
    ReadonlyArray<SelectItem>
  >(
    getAllUsersRolesQuery.data?.data.users_roles.map((users_role) => ({
      value: users_role.id,
      label: users_role.name,
    })) ?? []
  );

  return (
    <Controller
      name={`rules.${rulesIndex}.conditions.${conditionsIndex}.roles`}
      control={form.control}
      render={({ field, fieldState, formState }) => {
        return (
          <MultiSelect
            value={field.value?.map((users_role) => users_role.id) ?? []}
            onChange={(value) => {
              form.setValue(
                `rules.${rulesIndex}.conditions.${conditionsIndex}.roles`,
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
            label={__("Roles")}
            searchable
            disableSelectedItemFiltering
            data={multiSelectData}
          />
        );
      }}
    />
  );
}
