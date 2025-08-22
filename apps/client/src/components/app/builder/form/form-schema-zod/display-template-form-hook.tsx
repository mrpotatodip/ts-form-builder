import { CodeBlock } from "~/lib/syntax-highlighter";

import { useTemplateQuery } from "../core/use-template-query-core";
import { output } from "./template-form-hook";

export const DisplayTemplateFormHook = () => {
  const { template: code } = useTemplateQuery(output, "hook");

  return <CodeBlock code={code} language="typescript" />;
};
