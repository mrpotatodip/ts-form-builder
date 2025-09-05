import Handlebars from "handlebars";
import prettier from "prettier/standalone";
import parserBabel from "prettier/plugins/babel";
import parserEstree from "prettier/plugins/estree";
import parserTypescript from "prettier/plugins/typescript";
import parserHtml from "prettier/plugins/html";
import parserCss from "prettier/plugins/postcss";
import z from "zod";

import { BuilderFields } from "../core/schema-core";

const template = `
import { z } from "zod"

export const Form = z.object({

{{#each fields}}
  {{name}}: {{{zodType}}},
{{/each}}
})

export type Form = z.infer<typeof Form>
`;

const languageConfig = {
  javascript: { parser: "babel", plugins: [parserBabel, parserEstree] },
  typescript: {
    parser: "typescript",
    plugins: [parserTypescript, parserEstree],
  },
  css: { parser: "css", plugins: [parserCss] },
  html: { parser: "html", plugins: [parserHtml] },
  json: { parser: "json", plugins: [parserBabel, parserEstree] },
};

const utilPrettify = async (output: string) => {
  const config = languageConfig["typescript"];
  const formatted = await prettier.format(output, {
    ...config,
    semi: true,
    singleQuote: true,
    tabWidth: 2,
    trailingComma: "es5",
    printWidth: 80,
    bracketSpacing: true,
    arrowParens: "avoid",
  });
  return formatted;
};

const utilFieldToZod = (field: BuilderFields) => {
  let zodType = "";

  const errStr = <Terror>(error: Terror) => {
    const str = error ? `{"error" : "${error}"}` : "";
    return str;
  };

  const minmaxStr = <Ttype, Tminmax, Terror>(
    ttype: Ttype,
    minmax: Tminmax,
    error: Terror
  ) => {
    let str = "";
    if (isNaN(Number(minmax))) return str;

    str += minmax
      ? `.${ttype}(${minmax} ${error ? `, ${errStr(error)}` : ""})`
      : "";
    return str;
  };

  switch (field.type) {
    case "text":
    case "password":
    case "textarea":
      zodType = `z.string(${errStr(field.requiredError)})`;
      zodType += minmaxStr("min", field.minLength, field.minLengthError);
      zodType += minmaxStr("max", field.maxLength, field.maxLengthError);
      break;
    case "email":
      zodType = `z.string(${errStr(field.requiredError)})`;
      zodType += minmaxStr("min", field.minLength, field.minLengthError);
      zodType += minmaxStr("max", field.maxLength, field.maxLengthError);
      zodType += ".email()";
      break;
    case "number":
      zodType = "z.number()";
      zodType += minmaxStr("min", field.min, field.minError);
      zodType += minmaxStr("max", field.max, field.maxError);
      break;
    case "select":
      if (field.options && field.options.length > 0) {
        const enumValues = field.options?.map((s) => s.value);
        const stringValues = enumValues.map((item) => `"${item}"`).join(",");
        zodType = `z.enum([${stringValues}])`;
      } else {
        zodType = `z.string(${errStr(field.requiredError)})`;
      }
      break;
    case "checkbox":
      zodType = "z.boolean()";
      break;
    default:
      zodType = `z.string(${errStr(field.requiredError)})`;
  }

  if (!field.required && field.type !== "checkbox") {
    zodType += ".optional()";
  }

  return zodType;
};

export const output = async (fields: BuilderFields[]) => {
  const compiled = Handlebars.compile(template);
  const schemaFields = fields.map((f) => ({
    ...f,
    zodType: utilFieldToZod(f),
  }));
  const compiledOutput = compiled({ fields: schemaFields });
  const result = await utilPrettify(compiledOutput);

  return { result };
};
