import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export const CodeBlock = ({
  code,
  language,
}: {
  code: string | string[];
  language: string;
}) => (
  <SyntaxHighlighter
    className="rounded-xl w-full"
    language={language}
    style={vscDarkPlus}
    customStyle={{
      width: 450,
      margin: 0,
      fontSize: "0.8rem",
    }}
    showLineNumbers={true}
    wrapLines={true}
    wrapLongLines={true}
  >
    {code}
  </SyntaxHighlighter>
);
