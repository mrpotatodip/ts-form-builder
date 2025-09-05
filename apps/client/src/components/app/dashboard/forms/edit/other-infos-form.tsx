import { useOtherInfosForm } from "./use-other-infos-form";

export const OtherInfosForm = () => {
  const { form, isPendingUpdate, statusOptions, accessOptions } =
    useOtherInfosForm();
  const isSubmitting = isPendingUpdate ? true : false;

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="flex flex-col gap-4 bg-muted/60 rounded-xl p-4"
      >
        <form.AppField
          name="name"
          children={(field) => <field.TextField label="NAME" />}
        />

        <form.AppField
          name="description"
          children={(field) => <field.TextAreaField label="DESCRIPTION" />}
        />

        <form.AppField
          name="status"
          children={(field) => (
            <field.SelectField options={statusOptions} label="STATUS" />
          )}
        />

        <form.AppField
          name="limit"
          children={(field) => (
            <field.TextField
              onChange={(e) => field.handleChange(e.target.valueAsNumber)}
              type="number"
              label="RESPONSE LIMIT"
              helperText="Please use 0 to remove limit"
            />
          )}
        />

        <form.AppField
          name="access"
          children={(field) => (
            <field.SelectField options={accessOptions} label="ACCESS" />
          )}
        />

        <form.AppForm>
          <form.SubmitButton className="mt-4" isSubmitting={isSubmitting}>
            {isSubmitting ? "Saving Infos. ..." : "Save Infos."}
          </form.SubmitButton>
        </form.AppForm>
      </form>
    </>
  );
};
