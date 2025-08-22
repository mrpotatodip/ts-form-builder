import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useFieldContext } from ".";
import { FieldErrors } from "./field-errors";
import { FieldLabel } from "./field-label";

type CheckboxFieldProps = {
  label: string;
  description?: string;
  placeholder?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const DatePickerField = ({
  label,
  description,
  placeholder,
  ...inputProps
}: CheckboxFieldProps) => {
  const [open, setOpen] = React.useState(false);
  const field = useFieldContext<Date | undefined>();

  return (
    <div className="space-y-2 w-full">
      <div className="flex flex-col space-y-1">
        <FieldLabel htmlFor={field.name} label={label} />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date"
              className="w-full justify-between font-normal"
            >
              {field.state.value
                ? field.state.value.toLocaleDateString()
                : placeholder || "Select Date"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={field.state.value}
              captionLayout="dropdown"
              onSelect={(date) => {
                field.setValue(date);
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>

      <FieldErrors meta={field.state.meta} />
    </div>
  );
};
