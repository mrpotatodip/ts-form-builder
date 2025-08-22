import { Checkbox } from "@/components/ui/checkbox";

import { useFieldContext } from ".";
import { FieldErrors } from "./field-errors";
import { FieldLabel } from "./field-label";

type CheckboxFieldProps = {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const CheckboxField = ({ label, ...inputProps }: CheckboxFieldProps) => {
  const field = useFieldContext<boolean>();

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Checkbox
          id={field.name}
          checked={field.state.value}
          onCheckedChange={(checked) => {
            field.handleChange(checked === true);
          }}
          onBlur={field.handleBlur}
          className={inputProps.className}
        />
        <div className="grid gap-1.5 leading-none">
          <FieldLabel htmlFor={field.name} label={label} />
        </div>
      </div>
      <FieldErrors meta={field.state.meta} />
    </div>
  );
};
