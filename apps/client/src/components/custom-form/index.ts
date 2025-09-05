import { createFormHook, createFormHookContexts } from "@tanstack/react-form";

import { FileField } from "./file-field";
import { TextField } from "./text-field";
import { TextField as TextFieldOui } from "./text-field-oui";
import { TimeField } from "./time-field";
import { TextAreaField } from "./textarea-field";
import { CheckboxField } from "./checkbox-field";
import { SwitchField } from "./switch-field";
import { SelectField } from "./select-field";
import { DatePickerField } from "./date-picker-field";
import { OTPField } from "./otp-field";
import { SubmitButton } from "./submit-button";

export const { fieldContext, useFieldContext, formContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm } = createFormHook({
  fieldComponents: {
    FileField,
    TextField,
    TextFieldOui,
    TimeField,
    TextAreaField,
    CheckboxField,
    SwitchField,
    SelectField,
    DatePickerField,
    OTPField,
  },
  formComponents: {
    SubmitButton,
  },
  fieldContext,
  formContext,
});
