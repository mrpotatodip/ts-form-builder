import React from "react";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import { useFieldContext } from ".";
import { FieldErrors } from "./field-errors";
import { FieldLabel } from "./field-label";

type TextAreaFieldProps = {
  label?: string;
} & React.InputHTMLAttributes<HTMLTextAreaElement>;

export const TextAreaField = ({ label, ...inputProps }: TextAreaFieldProps) => {
  const field = useFieldContext<string>();

  return (
    <div className="*:not-first:mt-0.5">
      <FieldLabel htmlFor={field.name} label={label} />

      <div className="relative">
        <Textarea
          id={field.name}
          value={field.state.value}
          onChange={(e) => field.handleChange(e.target.value)}
          onBlur={field.handleBlur}
          className="field-sizing-content max-h-29.5 min-h-0 resize-none py-1.75"
          {...inputProps}
        />
      </div>

      <FieldErrors meta={field.state.meta} />
    </div>
  );
};
