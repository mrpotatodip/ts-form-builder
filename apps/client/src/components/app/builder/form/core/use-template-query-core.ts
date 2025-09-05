import { useQuery } from "@tanstack/react-query";

import { BuilderFields } from "./schema-core";
import { useDataStore } from "./use-data-store";
import { processQuery } from "./template-process-core";

const queryKey = ["template"];

export const useTemplateQuery = (
  templateOutput: (fields: BuilderFields[]) => Promise<{ result: string }>,
  key: string
) => {
  const fields = useDataStore((state) => state.fields);

  const query = useQuery({
    queryKey: [...queryKey, ...fields, key],
    queryFn: () => processQuery(fields, templateOutput),
  });

  const template = query.data?.template.result || "";

  return { template };
};
