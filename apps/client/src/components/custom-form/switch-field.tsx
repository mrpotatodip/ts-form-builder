import { Checkbox } from "@/components/ui/checkbox";

import { Switch } from "@/components/ui/switch";

import { useFieldContext } from ".";
import { FieldErrors } from "./field-errors";
import { FieldLabel } from "./field-label";

type SwitchFieldProps = {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const SwitchField = ({ label, ...inputProps }: SwitchFieldProps) => {
  const field = useFieldContext<boolean>();

  return (
    <div className="space-y-2">
      <div className="border-input has-data-[state=checked]:border-primary/50 relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none">
        <Switch
          id={field.name}
          className="order-1 h-4 w-6 after:absolute after:inset-0 [&_span]:size-3 data-[state=checked]:[&_span]:translate-x-2 data-[state=checked]:[&_span]:rtl:-translate-x-2"
          aria-describedby={`${field.name}-description`}
        />
        <div className="grid grow gap-2">
          <FieldLabel htmlFor={field.name} label={label} />
          <p
            id={`${field.name}-description`}
            className="text-muted-foreground text-xs"
          >
            A short description goes here.
          </p>
        </div>
      </div>
      {/* <div className="flex items-center space-x-2">
        <Checkbox
          id={field.name}
          checked={field.state.value}
          onCheckedChange={(checked) => {
            field.handleChange(checked === true);
          }}
          onBlur={field.handleBlur}
          className={`${inputProps.className} border-input`}
        />
        <div className="grid gap-1.5 leading-none">
          <FieldLabel htmlFor={field.name} label={label} />
        </div>
      </div>
      <FieldErrors meta={field.state.meta} /> */}
    </div>
  );
};
