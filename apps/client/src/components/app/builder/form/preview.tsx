import { useState } from "react";

import { DisplaySettingsForm } from "./form-schema-zod/display-settings-form";
import { DisplayPreviewForm } from "./form-schema-zod/display-preview-form";
import { DisplayTemplateFormZodSchema } from "./form-schema-zod/display-template-form-zod-schema";
import { DisplayTemplateFormCode } from "./form-schema-zod/display-template-form-code";
import { DisplayTemplateFormHook } from "./form-schema-zod/display-template-form-hook";

const PREVIEW = [
  {
    label: "Zod",
    name: "zod",
    component: DisplayTemplateFormZodSchema,
  },
  {
    label: "Form",
    name: "code",
    component: DisplayTemplateFormCode,
  },
  {
    label: "Hook",
    name: "hook",
    component: DisplayTemplateFormHook,
  },
] as const;
type Preview = (typeof PREVIEW)[number]["name"];

export const Preview = () => {
  const [preview, previewSet] = useState<Preview>("zod");

  return (
    <div className="flex w-[900px] gap-8">
      <div className="w-[450px] flex flex-col gap-2">
        <h2 className="uppercase tracking-wider text-sm">Settings</h2>
        <DisplaySettingsForm />
      </div>

      <div className="w-[450px] flex flex-col gap-2">
        <div className="flex flex-col gap-2 mb-4">
          <h2 className="uppercase tracking-wider text-sm">Preview</h2>
          <DisplayPreviewForm />
        </div>

        <div className="flex gap-4">
          {PREVIEW.map((item) => (
            <h2
              key={item.name}
              className={`uppercase tracking-wider text-sm cursor-pointer ${item.name === preview ? "underline underline-offset-4 font-semibold" : ""}`}
              onClick={() => previewSet(item.name)}
            >
              {item.label}
            </h2>
          ))}
        </div>

        {PREVIEW.map((item) => (
          <div
            key={item.name}
            className={`${item.name === preview ? "block w-full" : "hidden"}`}
          >
            <item.component key={item.name} />
          </div>
        ))}
      </div>
    </div>
  );
};
