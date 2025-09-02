import { ReactNode } from "react";

import { usePreviewFormCore } from "./use-preview-form-core";
import { Builder } from "./schema-core";

const ItemActiveHover = ({
  children,
  isHover,
}: {
  children: ReactNode;
  isHover: boolean;
}) => {
  return (
    <div className={`p-2 rounded-sm ${isHover ? "bg-primary/10" : "border-"}`}>
      {children}
    </div>
  );
};

export const PreviewFormCore = ({ fields }: { fields: Builder[] }) => {
  const { form } = usePreviewFormCore(fields);

  if (!fields.length) return <></>;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="flex flex-col gap-4 bg-muted/60 rounded-xl p-4"
    >
      {fields.map((item) => {
        switch (item.type) {
          case "checkbox":
            return (
              <form.AppField
                key={item.id}
                name={item.id}
                children={(field) => (
                  <ItemActiveHover isHover={item.isHover}>
                    <field.CheckboxField label={item.label} />
                  </ItemActiveHover>
                )}
              />
            );
          case "select":
            return (
              <form.AppField
                key={item.id}
                name={item.id}
                children={(field) => {
                  const options = item.options!.filter(
                    (option) => !option.value.length
                  );
                  return (
                    <ItemActiveHover isHover={item.isHover}>
                      <field.SelectField
                        options={options?.length ? [] : item.options!}
                        label={item.label}
                      />
                    </ItemActiveHover>
                  );
                }}
              />
            );
          case "textarea":
            return (
              <form.AppField
                key={item.id}
                name={item.id}
                children={(field) => (
                  <ItemActiveHover isHover={item.isHover}>
                    <field.TextAreaField
                      placeholder={item.placeholder}
                      label={item.label}
                    />
                  </ItemActiveHover>
                )}
              />
            );
          case "datepicker":
            return (
              <form.AppField
                key={item.id}
                name={item.id}
                children={(field) => (
                  <ItemActiveHover isHover={item.isHover}>
                    <field.DatePickerField
                      placeholder={item.placeholder}
                      label={item.label}
                    />
                  </ItemActiveHover>
                )}
              />
            );
          case "otp":
            return (
              <form.AppField
                key={item.id}
                name={item.id}
                children={(field) => (
                  <ItemActiveHover isHover={item.isHover}>
                    <field.OTPField
                      maxLength={item.maxLength || 6}
                      placeholder={item.placeholder}
                      label={item.label}
                    />
                  </ItemActiveHover>
                )}
              />
            );
          default:
            return (
              <form.AppField
                key={item.id}
                name={item.id}
                children={(field) => (
                  <ItemActiveHover isHover={item.isHover}>
                    <field.TextFieldOui
                      type={item.type}
                      placeholder={item.placeholder}
                      label={item.label}
                    />
                  </ItemActiveHover>
                )}
              />
            );
        }
      })}

      {fields.length > 0 && (
        <form.AppForm>
          <form.SubmitButton isSubmitting={false}>Save</form.SubmitButton>
        </form.AppForm>
      )}
    </form>
  );
};
