import { CodeBlock } from "~/lib/syntax-highlighter";

import { useTemplateQuery } from "../core/use-template-query-core";
import { output } from "./template-form-code";

export const DisplayTemplateFormCode = () => {
  const { template: code } = useTemplateQuery(output, "code");

  return <CodeBlock code={code} language="typescript" />;
};
