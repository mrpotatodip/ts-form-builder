import Handlebars from "handlebars";
import prettier from "prettier/standalone";
import parserBabel from "prettier/plugins/babel";
import parserEstree from "prettier/plugins/estree";
import parserTypescript from "prettier/plugins/typescript";
import parserHtml from "prettier/plugins/html";
import parserCss from "prettier/plugins/postcss";

import { BuilderFields } from "../core/schema-core";

const template = `
import { useForm } from "./this-is-your-form-hook"

export const Form = () => {
  const { form } = useForm();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}      
    >
              
      {{#each fields}}

        {{#if (isField type "checkbox")}}
        
        <form.AppField
          name="{{name}}"
          children={(field) => <field.CheckboxField label="{{label}}" />}
        />

        {{else if (isField type "switch")}}
        
        <form.AppField
          name="{{name}}"
          children={(field) => <field.SwitchField label="{{label}}" />}
        />
        
        {{else if (isField type "select")}}

        <form.AppField
          name="{{name}}"
          children={(field) => <field.SelectField options={
          {{#if options}}
          
          [
          {{#each options}}
            { label: "{{label}}", value: "{{value}}" }
            {{#unless @last}},{{/unless}}
          {{/each}} 
          ]

          {{else}}
          []
          {{/if}}
          } label="{{label}}" />}
        />

        {{else if (isField type "textarea")}}

        <form.AppField
          name="{{name}}"
          children={(field) => <field.TextAreaField {{#if placeholder}}placeholder="{{placeholder}}"{{/if}} label="{{label}}" />}
        />

        {{else}}
        
        <form.AppField
          name="{{name}}"
          children={(field) => <field.TextField {{#if placeholder}}placeholder="{{placeholder}}"{{/if}} label="{{label}}" />}
        />
        
        {{/if}}


      {{/each}} 

      <form.AppForm>
        <form.SubmitButton isSubmitting={false}>
          Save
        </form.SubmitButton>
      </form.AppForm>
      
      
    </form>
  );
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

export const output = async (fields: BuilderFields[]) => {
  const compiled = Handlebars.compile(template);
  const compiledOutput = compiled({ fields });
  const result = await utilPrettify(compiledOutput);
  return { result };
};
