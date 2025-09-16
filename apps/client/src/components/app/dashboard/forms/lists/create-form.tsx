import { useCreateForm } from "./use-create-form";

export const CreateForm = () => {
  const { form } = useCreateForm();

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      {/* <form.AppField
          name="name"
          children={(field) => <field.TextField label="Name" />}
        /> */}

      {/* <form.AppField
          name="description"
          children={(field) => <field.TextField label="Description" />}
        /> */}

      {/* <form.AppField
          name="json"
          children={(field) => <field.TextField label="JSON Config" />}
        /> */}

      {/* <form.AppField
          name="party_uuid"
          children={(field) => <field.TextField label="JSON Config" />}
        /> */}

      <form.AppForm>
        <form.SubmitButton isSubmitting={false}>Continue</form.SubmitButton>
      </form.AppForm>
    </form>
  );
};
