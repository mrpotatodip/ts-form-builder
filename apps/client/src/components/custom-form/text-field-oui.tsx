// by: ORIGIN UI

import React, { useState } from "react";
import {
  MailIcon as EmailIcon,
  KeySquareIcon as PasswordIcon,
  Clock8Icon as TimeIcon,
  CalendarIcon as DateIcon,
  EyeOffIcon,
  EyeIcon,
} from "lucide-react";

import { Input } from "@/components/ui/input";

import { useFieldContext } from ".";
import { FieldErrors } from "./field-errors";
import { FieldLabel } from "./field-label";

type TextFieldProps = {
  type: string;
  label?: string;
  helperText?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const TextField = ({
  type,
  label,
  helperText,
  ...inputProps
}: TextFieldProps) => {
  const field = useFieldContext<string>();
  const [passwordVisible, passwordVisibleSet] = useState<boolean>(false);

  const togglePasswordVisible = () =>
    passwordVisibleSet((prevState) => !prevState);

  const typeLogic =
    type === "password" ? (passwordVisible ? "text" : type) : type;

  return (
    <div className="*:not-first:mt-0.5">
      <FieldLabel htmlFor={field.name} label={label} />
      <div className="relative">
        <Input
          step={type === "time" ? 1 : undefined}
          type={typeLogic}
          id={field.name}
          value={field.state.value}
          onChange={(e) => field.handleChange(e.target.value)}
          onBlur={field.handleBlur}
          {...inputProps}
        />
        {type === "password" ? (
          <button
            className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            type="button"
            onClick={togglePasswordVisible}
            aria-label={passwordVisible ? "Hide password" : "Show password"}
            aria-pressed={passwordVisible}
            aria-controls="password"
          >
            {passwordVisible ? (
              <EyeOffIcon size={16} aria-hidden="true" />
            ) : (
              <EyeIcon size={16} aria-hidden="true" />
            )}
          </button>
        ) : type === "email" ? (
          <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50">
            <EmailIcon size={16} aria-hidden="true" />
          </div>
        ) : type === "time" ? (
          <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50">
            <TimeIcon size={16} aria-hidden="true" />
          </div>
        ) : type === "date" ? (
          <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50">
            <DateIcon size={16} aria-hidden="true" />
          </div>
        ) : null}
      </div>
      {helperText ? (
        <div>
          <p className="text-muted-foreground text-xs mt-2">{helperText}</p>
        </div>
      ) : null}
      <FieldErrors meta={field.state.meta} />
    </div>
  );
};
