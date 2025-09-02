import { CodeBlock } from "~/lib/syntax-highlighter";

import { useTemplateQuery } from "./core/use-template-query-core";
import { output } from "./form-schema-zod/template-form-hook";

export const CodeTemplateFormHook = () => {
  const { template: code } = useTemplateQuery(output, "hook");

  return <CodeBlock code={code} language="typescript" />;
};
