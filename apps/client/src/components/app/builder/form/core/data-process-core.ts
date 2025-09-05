import { BuilderFields } from "./schema-core";

let FieldsArray: BuilderFields[] = [];

export const processMutation = async ({
  data,
  action,
}: {
  data: BuilderFields[] | [];
  action?: "insert" | "update" | "delete";
}) => {
  if (action === "insert") {
    FieldsArray = [...FieldsArray, ...data];
  } else if (action === "update") {
    FieldsArray = [...data];
  } else if (action === "delete") {
    FieldsArray = [...data];
  } else {
    FieldsArray = [...FieldsArray, ...data];
  }

  const fields = FieldsArray;

  return { fields };
};

export const processQuery = async () => {
  const fields = FieldsArray;

  return { fields };
};
