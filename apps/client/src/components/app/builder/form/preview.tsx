import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Builder } from "~/components/app/builder/form/builder";
import { BuilderSettings } from "~/components/app/builder/form/builder-settings";
import { BuilderPreview } from "~/components/app/builder/form/builder-preview";
import { CodeTemplateFormZodSchema } from "~/components/app/builder/form/code-template-form-zod-schema";
import { CodeTemplateFormCode } from "~/components/app/builder/form/code-template-form-code";
import { CodeTemplateFormHook } from "~/components/app/builder/form/code-template-form-hook";

export const Preview = () => {
  return (
    <Tabs defaultValue="form-builder" className="w-full p-4">
      <TabsList className="mb-4 bg-accent/40">
        <TabsTrigger
          value="form-builder"
          className="uppercase tracking-widest text-xs"
        >
          Builder
        </TabsTrigger>
        <TabsTrigger
          value="zod-schema"
          className="uppercase tracking-widest text-xs"
        >
          Zod Schema
        </TabsTrigger>
        <TabsTrigger
          value="form-code"
          className="uppercase tracking-widest text-xs"
        >
          Form
        </TabsTrigger>
        <TabsTrigger
          value="form-hook"
          className="uppercase tracking-widest text-xs"
        >
          Hook
        </TabsTrigger>
      </TabsList>

      <TabsContent value="form-builder">
        <div className="flex gap-10">
          <div className="w-sm py-2">
            <Builder />
          </div>

          <div className="w-sm py-2">
            <BuilderSettings />
          </div>
          <div className="w-md py-2">
            <BuilderPreview />
          </div>
        </div>
      </TabsContent>

      <TabsContent value="zod-schema">
        <CodeTemplateFormZodSchema />
      </TabsContent>

      <TabsContent value="form-code">
        <CodeTemplateFormCode />
      </TabsContent>

      <TabsContent value="form-hook">
        <CodeTemplateFormHook />
      </TabsContent>
    </Tabs>
  );
};
