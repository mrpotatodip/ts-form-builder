import React from "react";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { useFieldContext } from ".";
import { FieldErrors } from "./field-errors";
import { FieldLabel } from "./field-label";

type OTPFieldProps = {
  maxLength: number;
  label?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const OTPField = ({
  maxLength,
  label,
  ...inputProps
}: OTPFieldProps) => {
  const field = useFieldContext<string>();

  return (
    <div className="*:not-first:mt-0.5">
      <FieldLabel htmlFor={field.name} label={label} />
      <div className="relative">
        <InputOTP maxLength={Number(maxLength)}>
          <InputOTPGroup>
            {[...Array(Number(maxLength))].map((_, i) => (
              <InputOTPSlot index={i} />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </div>

      <FieldErrors meta={field.state.meta} />
    </div>
  );
};
