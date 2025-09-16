import { z } from "zod";

export const Fields = [
  {
    value: "text",
    label: "Text",
    placeholder: true,
    minmax: false,
    minmaxLength: true,
    options: false,
  },
  {
    value: "email",
    label: "Email",
    placeholder: true,
    minmax: false,
    minmaxLength: true,
    options: false,
  },
  {
    value: "number",
    label: "Number",
    placeholder: true,
    minmax: true,
    minmaxLength: false,
    options: false,
  },
  {
    value: "password",
    label: "Password",
    placeholder: true,
    minmax: false,
    minmaxLength: true,
    options: false,
  },
  {
    value: "date",
    label: "Date",
    placeholder: false,
    minmax: false,
    minmaxLength: false,
    options: false,
  },
  {
    value: "time",
    label: "Time",
    placeholder: false,
    minmax: false,
    minmaxLength: false,
    options: false,
  },
  {
    value: "textarea",
    label: "Textarea",
    placeholder: true,
    minmax: false,
    minmaxLength: true,
    options: false,
  },
  {
    value: "datepicker",
    label: "Date Picker",
    placeholder: false,
    minmax: false,
    minmaxLength: false,
    options: false,
  },
  {
    value: "otp",
    label: "OTP",
    placeholder: false,
    minmax: false,
    minmaxLength: true,
    options: false,
  },
  {
    value: "select",
    label: "Select",
    placeholder: false,
    minmax: false,
    minmaxLength: false,
    options: true,
  },
  {
    value: "checkbox",
    label: "Checkbox",
    placeholder: false,
    minmax: false,
    minmaxLength: false,
    options: false,
  },
  {
    value: "switch",
    label: "Switch",
    placeholder: false,
    minmax: false,
    minmaxLength: false,
    options: false,
  },
] as const;
export type Fields = (typeof Fields)[number]["value"];
export const FieldsDefault = Fields[0].value;
export const FieldsEnum = Fields.map((s) => s.value) as [Fields, ...Fields[]];
export type ZodSchemaFields = {
  type?: string;
  format?: string;
  description?: string;
  enum?: any[];
  minLength?: number;
  maxLength?: number;
  minimum?: number;
  maximum?: number;
  [key: string]: any;
};

export const BuilderFields = z.object({
  isHover: z.boolean(),
  id: z.string(),
  type: z.enum(FieldsEnum),
  label: z.string(),
  name: z.string(),
  required: z.boolean(),
  requiredError: z.string().optional(),
  placeholder: z.string(),
  options: z
    .object({
      value: z.string(),
      label: z.string(),
    })
    .array()
    .optional(),
  isMinMaxLength: z.boolean(),
  minLength: z.string().optional(),
  maxLength: z.string().optional(),
  minLengthError: z.string().optional(),
  maxLengthError: z.string().optional(),
  isMinMax: z.boolean(),
  min: z.string().optional(),
  max: z.string().optional(),
  minError: z.string().optional(),
  maxError: z.string().optional(),
});

export type BuilderFields = z.infer<typeof BuilderFields>;

export const BuilderFieldsDefaults: BuilderFields = {
  isHover: false,
  id: "",
  type: FieldsDefault,
  label: "",
  name: "demo",
  required: false,
  requiredError: undefined,
  placeholder: "",
  options: undefined,
  isMinMaxLength: false,
  minLength: undefined,
  maxLength: undefined,
  minLengthError: undefined,
  maxLengthError: undefined,
  isMinMax: false,
  min: undefined,
  max: undefined,
  minError: undefined,
  maxError: undefined,
};

export const BuilderFieldsForms = z.object({
  fields: BuilderFields.array(),
});

export type BuilderFieldsForms = z.infer<typeof BuilderFieldsForms>;

export const BuilderFieldsFormsDefaults: BuilderFieldsForms = {
  fields: [BuilderFieldsDefaults],
};

// LOGIC
const placeholderMap: Record<Fields, boolean> = Object.fromEntries(
  Fields.map((f) => [f.value, f.placeholder]),
) as Record<Fields, boolean>;

const minmaxMap: Record<Fields, boolean> = Object.fromEntries(
  Fields.map((f) => [f.value, f.minmax]),
) as Record<Fields, boolean>;

const minmaxLengthMap: Record<Fields, boolean> = Object.fromEntries(
  Fields.map((f) => [f.value, f.minmaxLength]),
) as Record<Fields, boolean>;

const optionsMap: Record<Fields, boolean> = Object.fromEntries(
  Fields.map((f) => [f.value, f.options]),
) as Record<Fields, boolean>;

export const BuilderFieldsLogic = (type: Fields) => ({
  isPlaceholder: placeholderMap[type],
  isMinMax: minmaxMap[type],
  isMinMaxLength: minmaxLengthMap[type],
  isOptions: optionsMap[type],
});

export const BuilderFieldsInitValues = (type: Fields) => {
  const randomString = (
    len: number = 4,
    chars: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  ) => {
    let result = "";
    for (let i = 0; i < len; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const identifier = `${type}_${randomString()}`;

  return {
    ...BuilderFieldsDefaults,
    type,
    options:
      type === "select"
        ? [{ label: "option_1", value: "Option_1" }]
        : undefined,
    id: identifier,
    name: identifier,
    label: identifier,
  };
};
