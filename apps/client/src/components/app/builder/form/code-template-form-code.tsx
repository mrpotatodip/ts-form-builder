import { CodeBlock } from "~/lib/syntax-highlighter";

import { useTemplateQuery } from "./core/use-template-query-core";
import { output } from "./form-schema-zod/template-form-code";

export const CodeTemplateFormCode = () => {
  const { template: code } = useTemplateQuery(output, "code");

  return <CodeBlock code={code} language="typescript" />;
};
