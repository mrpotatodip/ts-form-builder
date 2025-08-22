import { Builder } from "./schema-core";

export const processQuery = async (
  fields: Builder[],
  templateOutput: (fields: Builder[]) => Promise<{ result: string }>
) => {
  const template = await templateOutput(fields);

  return { template };
};
