import React from "react";

import { Input } from "@/components/ui/input";

import { useFieldContext } from ".";
import { FieldErrors } from "./field-errors";
import { FieldLabel } from "./field-label";

type TextFieldProps = {
  variance?: "default" | "muted";
  label?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const TimeField = ({
  variance = "default",
  label,
  ...inputProps
}: TextFieldProps) => {
  const field = useFieldContext<string>();
  const varianceOptions = {
    default:
      "bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none",
    muted:
      "focus-visible:ring-3 focus-visible:border-muted border-muted focus-visible:ring-[1px]",
  };

  return (
    <div className="space-y-2">
      <div className="space-y-2">
        <FieldLabel htmlFor={field.name} label={label} />

        <Input
          type="time"
          step={1}
          id={field.name}
          value={field.state.value}
          onChange={(e) => field.handleChange(e.target.value)}
          onBlur={field.handleBlur}
          className={varianceOptions[variance]}
          {...inputProps}
        />
      </div>

      <FieldErrors meta={field.state.meta} />
    </div>
  );
};
