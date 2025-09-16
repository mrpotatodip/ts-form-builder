import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { BuilderViaDB } from "~/components/app/builder/form/builder-via-db";
import { BuilderSettingsViaDB } from "~/components/app/builder/form/builder-settings-via-db";
import { BuilderPreviewViaDB } from "~/components/app/builder/form/builder-preview-via-db";
import { CodeTemplateFormZodSchema } from "~/components/app/builder/form/code-template-form-zod-schema";
import { CodeTemplateFormCode } from "~/components/app/builder/form/code-template-form-code";
import { CodeTemplateFormHook } from "~/components/app/builder/form/code-template-form-hook";
import { ReactNode } from "react";

export const PreviewViaDB = ({ children }: { children: ReactNode }) => {
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
            <BuilderViaDB />
          </div>

          <div className="w-sm">
            <Tabs defaultValue="builder-settings-tab" className="w-full">
              <TabsList className="mb-4 bg-accent/40">
                <TabsTrigger
                  value="builder-settings-tab"
                  className="uppercase tracking-widest text-xs"
                >
                  Settings
                </TabsTrigger>
                <TabsTrigger
                  value="builder-other-infos-tab"
                  className="uppercase tracking-widest text-xs"
                >
                  Other Infos.
                </TabsTrigger>
              </TabsList>

              <TabsContent value="builder-settings-tab">
                <BuilderSettingsViaDB />
              </TabsContent>

              <TabsContent value="builder-other-infos-tab">
                {children}
              </TabsContent>
            </Tabs>
          </div>

          <div className="w-md py-2">
            <BuilderPreviewViaDB />
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
