import { useCallback, useState } from "react";
import {
  Settings2Icon as ShowSettingsIcon,
  GitPullRequestClosedIcon as HideSettingsIcon,
  Trash2Icon as DeleteFieldIcon,
} from "lucide-react";

import { Button } from "~/components/ui/button";
import { Builder, BuilderFieldsLogic } from "./schema-core";
import { useDataMutation } from "./use-data-query-core";
import { useSettingsFormCore } from "./use-settings-form-core";

export const SettingsFormCore = ({ fields }: { fields: Builder[] }) => {
  const { mutate } = useDataMutation();
  const { form } = useSettingsFormCore(fields);
  const [settings, settingsSet] = useState<Record<string, boolean>>({});

  const onClickSettings = useCallback(
    (id: string) => {
      settingsSet((prev) => ({ ...prev, [id]: !prev[id] }));
    },
    [settingsSet]
  );

  const handleDeleteTo = useCallback(
    (id: string) => {
      mutate({
        data: fields.filter((item) => item.id !== id),
        action: "delete",
      });
    },
    [fields]
  );

  const handleAddOptionTo = useCallback(
    (id: string) => {
      const data = fields.map((field) => {
        if (field.id === id)
          return {
            ...field,
            options: [
              ...field.options!,
              {
                label: `Option_${field.options!.length + 1}`,
                value: `option_${field.options!.length + 1}`,
              },
            ],
          };
        return field;
      });
      mutate({ data, action: "update" });
    },
    [fields]
  );

  const handleHoverTo = useCallback(
    (id: string, isHover: boolean) => {
      const reset = fields.map((field) => ({ ...field, isHover: false }));
      const data = reset.map((field) => {
        if (field.id === id)
          return {
            ...field,
            isHover,
          };
        return field;
      });
      mutate({ data, action: "update" });
    },
    [fields]
  );

  if (!fields.length)
    return (
      <div>
        <p className="text-xs uppercase tracking-wider italic text-primary">
          Nothing to preview yet.
        </p>
      </div>
    );

  return (
    <>
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <form.Subscribe selector={(state) => state.values.fields}>
          {(fields) => (
            <>
              {fields?.map((field, index) => {
                // LOGIC
                const { isPlaceholder, isMinMax, isMinMaxLength, isOptions } =
                  BuilderFieldsLogic(field.type);

                return (
                  <div
                    key={field.id}
                    className="flex flex-col gap-4 bg-muted/60 rounded-xl p-4"
                    onMouseEnter={() => handleHoverTo(field.id, true)}
                    onMouseLeave={() => handleHoverTo(field.id, false)}
                  >
                    <div className="flex justify-between">
                      <h2 className="uppercase tracking-wider font-semibold text-sm text-primary">
                        {field.type}
                      </h2>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => onClickSettings(field.id)}
                          className="flex tracking-wider text-xs items-center gap-2 cursor-pointer group"
                        >
                          <ShowSettingsIcon className="size-6 text-muted-foreground/60 group-hover:text-primary" />
                        </button>

                        <button
                          onClick={() => handleDeleteTo(field.id)}
                          className="flex tracking-wider text-xs items-center gap-2 cursor-pointer group"
                        >
                          <DeleteFieldIcon className="size-5 text-muted-foreground/60 group-hover:text-primary" />
                        </button>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-1/3">
                        <form.AppField
                          name={`fields[${index}].name`}
                          children={(field) => <field.TextField label="NAME" />}
                        />
                      </div>
                      <div className="flex-2/3">
                        <form.AppField
                          name={`fields[${index}].label`}
                          children={(field) => (
                            <field.TextField label="LABEL" />
                          )}
                        />
                      </div>
                    </div>

                    {settings[field.id] && (
                      <>
                        {/* WITH FIELD LOGIC */}
                        {isPlaceholder && (
                          <div className="">
                            <form.AppField
                              name={`fields[${index}].placeholder`}
                              children={(field) => (
                                <field.TextField label="PLACEHOLDER" />
                              )}
                            />
                          </div>
                        )}

                        <div className="">
                          <form.AppField
                            name={`fields[${index}].required`}
                            children={(field) => (
                              <field.CheckboxField label="AS REQUIRED" />
                            )}
                          />
                        </div>

                        {field.required && (
                          <div className="">
                            <form.AppField
                              name={`fields[${index}].requiredError`}
                              children={(field) => (
                                <field.TextField label="REQUIRED ERROR MESSAGE" />
                              )}
                            />
                          </div>
                        )}

                        {isOptions && (
                          <div className="flex flex-col gap-2">
                            <div>
                              <Button
                                className="uppercase tracking-wider text-xs w-full"
                                type="button"
                                onClick={() => handleAddOptionTo(field.id)}
                              >
                                Add Options
                              </Button>
                            </div>

                            <form.AppField
                              name={`fields[${index}].options`}
                              mode="array"
                              children={(field) => {
                                return (
                                  <div className="flex flex-col gap-2">
                                    {field.state.value?.map(
                                      (item, optionIndex) => (
                                        <div
                                          key={optionIndex}
                                          className="flex gap-2 items-end"
                                        >
                                          <form.AppField
                                            name={`fields[${index}].options[${optionIndex}].label`}
                                            children={(field) => (
                                              <field.TextField label="LABEL" />
                                            )}
                                          />

                                          <form.AppField
                                            name={`fields[${index}].options[${optionIndex}].value`}
                                            children={(field) => (
                                              <field.TextField label="VALUE" />
                                            )}
                                          />
                                        </div>
                                      )
                                    )}
                                  </div>
                                );
                              }}
                            />
                          </div>
                        )}

                        {isMinMaxLength && (
                          <div className="flex gap-4">
                            <div className="flex-1/8">
                              <form.AppField
                                name={`fields[${index}].minLength`}
                                children={(field) => (
                                  <field.TextField label="MIN" />
                                )}
                              />
                            </div>
                            <div className="flex-2/3">
                              <form.AppField
                                name={`fields[${index}].minLengthError`}
                                children={(field) => (
                                  <field.TextField label="MIN ERROR MESSAGE" />
                                )}
                              />
                            </div>
                          </div>
                        )}

                        {isMinMaxLength && (
                          <div className="flex gap-4">
                            <div className="flex-1/8">
                              <form.AppField
                                name={`fields[${index}].maxLength`}
                                children={(field) => (
                                  <field.TextField label="MAX" />
                                )}
                              />
                            </div>
                            <div className="flex-2/3">
                              <form.AppField
                                name={`fields[${index}].maxLengthError`}
                                children={(field) => (
                                  <field.TextField label="MAX ERROR MESSAGE" />
                                )}
                              />
                            </div>
                          </div>
                        )}

                        {isMinMax && (
                          <div className="flex gap-4">
                            <div className="flex-1/8">
                              <form.AppField
                                name={`fields[${index}].min`}
                                children={(field) => (
                                  <field.TextField label="MIN" />
                                )}
                              />
                            </div>
                            <div className="flex-2/3">
                              <form.AppField
                                name={`fields[${index}].minError`}
                                children={(field) => (
                                  <field.TextField label="MIN ERROR MESSAGE" />
                                )}
                              />
                            </div>
                          </div>
                        )}

                        {isMinMax && (
                          <div className="flex gap-4">
                            <div className="flex-1/8">
                              <form.AppField
                                name={`fields[${index}].max`}
                                children={(field) => (
                                  <field.TextField label="MAX" />
                                )}
                              />
                            </div>
                            <div className="flex-2/3">
                              <form.AppField
                                name={`fields[${index}].maxError`}
                                children={(field) => (
                                  <field.TextField label="MAX ERROR MESSAGE" />
                                )}
                              />
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </>
          )}
        </form.Subscribe>

        {/* <br />
        <br />
        <br />

        <form.AppField
          name="fields"
          mode="array"
          children={(field) => {
            console.log(field);
            return (
              <div className="flex flex-col gap-10">
                {field.state.value?.map((item, index) => (
                  <div key={item.id}>
                    <div className="flex gap-4">
                      <div className="flex-1/3">
                        <form.AppField
                          name={`fields[${index}].name`}
                          children={(field) => <field.TextField label="Name" />}
                        />
                      </div>
                      <div className="flex-2/3">
                        <form.AppField
                          name={`fields[${index}].label`}
                          children={(field) => (
                            <field.TextField label="Label" />
                          )}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            );
          }}
        /> */}

        {/* <div className="mt-4">
          <form.AppForm>
            <form.SubmitButton isSubmitting={false} className="w-full">
              Save
            </form.SubmitButton>
          </form.AppForm>
        </div> */}
      </form>
    </>
  );
};
