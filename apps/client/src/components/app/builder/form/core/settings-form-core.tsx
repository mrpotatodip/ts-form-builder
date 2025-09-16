import { useCallback, useState } from "react";
import {
  Settings2Icon as ShowSettingsIcon,
  GitPullRequestClosedIcon as HideSettingsIcon,
  Trash2Icon as DeleteFieldIcon,
} from "lucide-react";

import { Button } from "~/components/ui/button";
import { BuilderFields, BuilderFieldsLogic } from "./schema-core";
import { useSettingsFormCore } from "./use-settings-form-core";

export const SettingsFormCore = ({
  fields,
  handleUpdateFields,
}: {
  fields: BuilderFields[];
  handleUpdateFields: (fields: BuilderFields[]) => void;
}) => {
  const { form } = useSettingsFormCore(fields);
  const [settings, settingsSet] = useState<Record<string, boolean>>({});
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const onClickSettings = useCallback(
    (id: string) => {
      settingsSet((prev) => ({ ...prev, [id]: !prev[id] }));
    },
    [settingsSet],
  );

  const handleDeleteTo = useCallback(
    (id: string) => {
      const data = fields.filter((field) => field.id !== id);
      handleUpdateFields(data);
    },
    [fields],
  );

  const handleAddOptionTo = useCallback(
    (id: string) => {
      const data = fields.map((field) =>
        field.id === id
          ? {
              ...field,
              options: [
                ...(field.options ?? []),
                {
                  label: `#${(field.options?.length ?? 0) + 1}`,
                  value: `#${(field.options?.length ?? 0) + 1}`,
                },
              ],
            }
          : field,
      );
      handleUpdateFields(data);
    },
    [fields],
  );

  const handleHoverTo = useCallback(
    (id: string, isHover: boolean) => {
      const data = fields.map((field) => ({
        ...field,
        isHover: field.id === id ? isHover : false,
      }));
      handleUpdateFields(data);
    },
    [fields],
  );

  const handleDragStart = useCallback((e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);

  const handleDragDrop = useCallback(
    (e: React.DragEvent, dropIndex: number) => {
      e.preventDefault();

      if (draggedIndex === null || draggedIndex === dropIndex) {
        setDraggedIndex(null);
        return;
      }

      const newFields = [...fields];
      const draggedField = newFields[draggedIndex];

      // Remove the dragged field
      newFields.splice(draggedIndex, 1);

      // Insert at the new position
      const insertIndex = draggedIndex < dropIndex ? dropIndex - 1 : dropIndex;
      newFields.splice(insertIndex, 0, draggedField);

      // setFields(newFields);
      // console.log(newFields, " testing ...");
      handleUpdateFields(newFields);
      setDraggedIndex(null);
    },
    [fields, draggedIndex],
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
        onChange={() => handleUpdateFields(form.state.values.fields)}
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
                    className={`flex flex-col gap-4 bg-muted/60 rounded-xl p-4 transition-all duration-200 hover:bg-muted/90 cursor-grab ${
                      draggedIndex === index
                        ? "opacity-50 scale-95"
                        : "opacity-100 scale-100"
                    }`}
                    onMouseEnter={() => handleHoverTo(field.id, true)}
                    onMouseLeave={() => handleHoverTo(field.id, false)}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDragDrop(e, index)}
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
                        <div className="">
                          <form.AppField
                            name={`fields[${index}].description`}
                            children={(field) => (
                              <field.TextAreaField label="DESCRIPTION / HELPER TEXT" />
                            )}
                          />
                        </div>

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
                                      ),
                                    )}
                                  </div>
                                );
                              }}
                            />
                          </div>
                        )}

                        {isMinMaxLength && (
                          <div className="flex gap-4">
                            <div className="flex-1/3">
                              <form.AppField
                                name={`fields[${index}].minLength`}
                                children={(field) => (
                                  <field.TextField type="number" label="MIN" />
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
                            <div className="flex-1/3">
                              <form.AppField
                                name={`fields[${index}].maxLength`}
                                children={(field) => (
                                  <field.TextField type="number" label="MAX" />
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
                            <div className="flex-1/3">
                              <form.AppField
                                name={`fields[${index}].min`}
                                children={(field) => (
                                  <field.TextField type="number" label="MIN" />
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
                            <div className="flex-1/3">
                              <form.AppField
                                name={`fields[${index}].max`}
                                children={(field) => (
                                  <field.TextField type="number" label="MAX" />
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
