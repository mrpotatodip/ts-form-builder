import React from "react";

import { Input } from "@/components/ui/input";

import { useFieldContext } from ".";
import { FieldErrors } from "./field-errors";
import { FieldLabel } from "./field-label";

type TextFieldProps = {
  variance?: "default" | "muted";
  label?: string;
  labelClassName?: string;
  helperText?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const TextField = ({
  variance = "default",
  label,
  helperText,
  ...inputProps
}: TextFieldProps) => {
  const field = useFieldContext<string>();
  const varianceOptions = {
    default: "",
    muted:
      "focus-visible:ring-3 focus-visible:border-muted border-muted focus-visible:ring-[1px]",
  };

  return (
    <div className="space-y-2 w-full">
      <div className="space-y-2">
        <FieldLabel htmlFor={field.name} label={label} />
        <Input
          id={field.name}
          value={field.state.value}
          onChange={(e) => field.handleChange(e.target.value)}
          onBlur={field.handleBlur}
          className={varianceOptions[variance]}
          {...inputProps}
        />
      </div>
      {helperText ? (
        <div>
          <p className="text-muted-foreground/60 text-xs tracking-wider mt-2">
            {helperText}
          </p>
        </div>
      ) : null}
      <FieldErrors meta={field.state.meta} />
    </div>
  );
};
