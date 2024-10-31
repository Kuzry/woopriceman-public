import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { TPrice } from "../../types";
import __ from "../../helpers/translate";
import {
  Button,
  Grid,
  Group,
  NumberInput,
  SegmentedControl,
  Select,
  Space,
  Stack,
  UnstyledButton,
} from "@mantine/core";
import Paper from "../../components/Paper/Paper";
import PaperContent from "../../components/Paper/PaperContent";
import UsersRestApiMultiSelect from "./UsersRestApiMultiSelect";
import ProductsRestApiMultiSelect from "./ProductsRestApiMultiSelect";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RolesMultiSelect from "./RolesMultiSelect";

function EditPriceRulesConditions({ rulesIndex }: { rulesIndex: number }) {
  const form = useFormContext<TPrice>();

  const rulesConditionsFieldArray = useFieldArray({
    control: form.control,
    name: `rules.${rulesIndex}.conditions`,
  });

  return (
    <PaperContent>
      {rulesConditionsFieldArray.fields.map((rulesField, conditionsIndex) => (
        <div
          key={rulesField.id}
          style={{
            backgroundColor: "rgb(240, 245, 250)",
            // padding: "40px 20px 20px 20px",
            border: "2px solid rgb(220, 225, 230)",
            marginBottom: 20,
            padding: 20,
            position: "relative",
          }}
        >
          <Grid>
            <Grid.Col span={4}>
              <Controller
                name={`rules.${rulesIndex}.conditions.${conditionsIndex}.type`}
                control={form.control}
                render={({ field, fieldState, formState }) => (
                  <Select
                    value={field.value}
                    onChange={(value) => {
                      form.setValue(
                        `rules.${rulesIndex}.conditions.${conditionsIndex}.type`,
                        value as "roles"
                      );
                    }}
                    onBlur={field.onBlur}
                    ref={field.ref}
                    // label={__("Condition")}
                    data={[
                      { value: "users", label: __("Users") },
                      { value: "roles", label: __("Roles") },
                      { value: "products", label: __("Products") },
                    ]}
                  />
                )}
              />
            </Grid.Col>
            <Grid.Col span={8}>
              {"users" ===
                form.watch(
                  `rules.${rulesIndex}.conditions.${conditionsIndex}.type`
                ) && (
                <>
                  <Stack>
                    <Controller
                      name={`rules.${rulesIndex}.conditions.${conditionsIndex}.apply_to`}
                      control={form.control}
                      render={({ field, fieldState, formState }) => (
                        <Select
                          value={field.value}
                          onChange={(value) => {
                            form.setValue(
                              `rules.${rulesIndex}.conditions.${conditionsIndex}.apply_to`,
                              value as "all"
                            );
                          }}
                          onBlur={field.onBlur}
                          ref={field.ref}
                          // label={__("Apply to")}
                          data={[
                            { value: "all", label: __("All users") },
                            {
                              value: "logged_in_users",
                              label: __("Logged in users"),
                            },
                            {
                              value: "specific_users",
                              label: __("Selected users"),
                            },
                          ]}
                        />
                      )}
                    />
                    {"specific_users" ===
                      form.watch(
                        `rules.${rulesIndex}.conditions.${conditionsIndex}.apply_to`
                      ) && (
                      <UsersRestApiMultiSelect
                        rulesIndex={rulesIndex}
                        conditionsIndex={conditionsIndex}
                      />
                    )}
                  </Stack>
                </>
              )}
              {"roles" ===
                form.watch(
                  `rules.${rulesIndex}.conditions.${conditionsIndex}.type`
                ) && (
                <>
                  {/*<Select*/}
                  {/*  label={__("Apply to")}*/}
                  {/*  data={[{ value: "specific", label: __("Selected roles") }]}*/}
                  {/*/>*/}
                  <RolesMultiSelect
                    rulesIndex={rulesIndex}
                    conditionsIndex={conditionsIndex}
                  />
                </>
              )}
              {"products" ===
                form.watch(
                  `rules.${rulesIndex}.conditions.${conditionsIndex}.type`
                ) && (
                <>
                  <Stack>
                    <Controller
                      name={`rules.${rulesIndex}.conditions.${conditionsIndex}.apply_to`}
                      control={form.control}
                      render={({ field, fieldState, formState }) => (
                        <Select
                          value={field.value}
                          onChange={(value) => {
                            form.setValue(
                              `rules.${rulesIndex}.conditions.${conditionsIndex}.apply_to`,
                              value as "all"
                            );
                          }}
                          onBlur={field.onBlur}
                          ref={field.ref}
                          // label={__("Apply to")}
                          data={[
                            {
                              value: "all",
                              label: __("All products"),
                            },
                            {
                              value: "specific_products",
                              label: __("Selected products"),
                            },
                          ]}
                        />
                      )}
                    />
                    {"specific_products" ===
                      form.watch(
                        `rules.${rulesIndex}.conditions.${conditionsIndex}.apply_to`
                      ) && (
                      <ProductsRestApiMultiSelect
                        rulesIndex={rulesIndex}
                        conditionsIndex={conditionsIndex}
                      />
                    )}
                  </Stack>
                </>
              )}
            </Grid.Col>
          </Grid>
          <Button
            style={{
              borderRadius: 0,
              position: "absolute",
              top: -18,
              right: -2,
              height: 18,
              padding: "3px 5px",
              backgroundColor: "#ff0000",
            }}
            onClick={() => {
              rulesConditionsFieldArray.remove(conditionsIndex);
            }}
          >
            <FontAwesomeIcon icon={faXmark} />
          </Button>
        </div>
      ))}
      <UnstyledButton
        style={{ padding: "10px 20px", textAlign: "center", width: "100%" }}
        onClick={() => {
          rulesConditionsFieldArray.append({
            type: "",
          });
        }}
      >
        {__("Add condition")}
      </UnstyledButton>
    </PaperContent>
  );
}

export default function EditPriceRules() {
  const form = useFormContext<TPrice>();

  const rulesFieldArray = useFieldArray({
    control: form.control,
    name: "rules",
  });

  return (
    <>
      {rulesFieldArray.fields.map((ruleField, index) => (
        <div key={ruleField.id}>
          <Paper>
            <div
              style={{
                // background: "rgba(69,237,72,0.1)",
                // borderBottom: "1px solid rgba(69, 237, 72, .2)",
                // borderRadius: ".1rem .1rem 0 0",
                position: "relative",
              }}
            >
              <PaperContent>
                <Group>
                  <Controller
                    name={`rules.${index}.discount_type`}
                    control={form.control}
                    render={({ field, fieldState, formState }) => (
                      <SegmentedControl
                        value={field.value}
                        onChange={field.onChange}
                        data={[
                          {
                            value: "percentage",
                            label: __("Percentage discount"),
                          },
                          {
                            value: "amount",
                            label: __("Amount discount"),
                          },
                        ]}
                      />
                    )}
                  />
                  <Controller
                    name={`rules.${index}.amount`}
                    control={form.control}
                    render={({ field, fieldState, formState }) => (
                      <NumberInput
                        value={field.value}
                        onChange={(value) =>
                          form.setValue(
                            `rules.${index}.amount`,
                            value as number
                          )
                        }
                        onBlur={field.onBlur}
                        ref={field.ref}
                      />
                    )}
                  />
                </Group>
                <Button
                  style={{
                    position: "absolute",
                    top: 5,
                    right: 5,
                    height: 24,
                    padding: "3px 5px",
                    backgroundColor: "#ff0000",
                  }}
                  onClick={() => {
                    rulesFieldArray.remove(index);
                  }}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </Button>
              </PaperContent>
            </div>
            <EditPriceRulesConditions rulesIndex={index} />
          </Paper>
          <Space h="xl" />
        </div>
      ))}
      <Button
        style={{
          background: "#fff",
          color: "#000",
          boxShadow: "0 2px 4px rgba(0, 0, 0, .1)",
          width: "100%",
        }}
        onClick={() => {
          rulesFieldArray.append({
            discount_type: "percentage",
            increase_decrease: "decrease",
            amount: 0,
          });
        }}
      >
        {__("Add Group")}
      </Button>
    </>
  );
}
