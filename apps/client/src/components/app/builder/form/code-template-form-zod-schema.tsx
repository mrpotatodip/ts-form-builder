import { CodeBlock } from "~/lib/syntax-highlighter";

import { useTemplateQuery } from "./core/use-template-query-core";
import { output } from "./form-schema-zod/template-form-zod-schema";

export const CodeTemplateFormZodSchema = () => {
  const { template: code } = useTemplateQuery(output, "zod");

  return <CodeBlock code={code} language="typescript" />;
};
