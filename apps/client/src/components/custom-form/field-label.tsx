import { Label } from "@/components/ui/label";

type FieldLabelProps = {
  htmlFor?: string;
  label?: string;
};

export const FieldLabel = ({ htmlFor, label }: FieldLabelProps) => {
  if (!label) return null;

  return (
    <Label className="text-xs" htmlFor={htmlFor}>
      {label}
    </Label>
  );
};
