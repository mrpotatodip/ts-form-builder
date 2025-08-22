import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Builder } from "./schema-core";
import { useDataQuery } from "./use-data-query-core";
import { processQuery } from "./template-process-core";

const queryKey = ["template"];

export const useTemplateQuery = (
  templateOutput: (fields: Builder[]) => Promise<{ result: string }>,
  key: string
) => {
  const { fields } = useDataQuery();

  const query = useQuery({
    queryKey: [...queryKey, ...fields, key],
    queryFn: () => processQuery(fields, templateOutput),
  });

  const template = query.data?.template.result || "";

  return { template };
};
