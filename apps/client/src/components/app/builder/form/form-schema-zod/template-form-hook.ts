import Handlebars from "handlebars";
import prettier from "prettier/standalone";
import parserBabel from "prettier/plugins/babel";
import parserEstree from "prettier/plugins/estree";
import parserTypescript from "prettier/plugins/typescript";
import parserHtml from "prettier/plugins/html";
import parserCss from "prettier/plugins/postcss";

import { Builder } from "../core/schema-core";

const template = `
import { useAppForm } from "~/components/custom-form";
import { FormSchema, FormType } from "./this-is-your-schema-file"


export const useForm = () => {

  const form = useAppForm({
      validators: {
        onChange: FormSchema,
      },
      onSubmit: ({ value }) => {
        //Submit
        console.log(value);
      },      
  });

  return { form }

};
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

Handlebars.registerHelper("isField", function (field, type) {
  if (field !== type) return false;
  return true;
});

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

export const output = async (fields: Builder[]) => {
  const compiled = Handlebars.compile(template);
  const compiledOutput = compiled({ fields });
  const result = await utilPrettify(compiledOutput);
  return { result };
};
