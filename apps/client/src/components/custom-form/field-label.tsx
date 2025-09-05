import { Label } from "@/components/ui/label";

type FieldLabelProps = {
  htmlFor?: string;
  label?: string;
};

export const FieldLabel = ({ htmlFor, label }: FieldLabelProps) => {
  if (!label) return null;

  return (
    <Label className={`text-xs tracking-wider`} htmlFor={htmlFor}>
      {label}
    </Label>
  );
};
