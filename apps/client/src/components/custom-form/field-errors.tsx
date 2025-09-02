import { AnyFieldMeta } from "@tanstack/react-form";
import { ZodError } from "zod";

type FieldErrorsProps = {
  meta: AnyFieldMeta;
};

export const FieldErrors = ({ meta }: FieldErrorsProps) => {
  if (!meta.isTouched) return null;
  if (!meta.errors.length) return null;

  return (
    <div className="flex flex-col gap-1">
      {meta.errors.map(({ message }: ZodError, index) => (
        <p key={index} className="text-xs text-destructive mt-1">
          {message}
        </p>
      ))}
    </div>
  );
};
