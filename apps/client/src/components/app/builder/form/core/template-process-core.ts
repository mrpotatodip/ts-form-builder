import { BuilderFields } from "./schema-core";

export const processQuery = async (
  fields: BuilderFields[],
  templateOutput: (fields: BuilderFields[]) => Promise<{ result: string }>
) => {
  const template = await templateOutput(fields);

  return { template };
};
