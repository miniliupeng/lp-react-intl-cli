import { transformFromAstSync } from "@babel/core";
import parser from "@babel/parser";
import prettier from "prettier";
import { readFile } from "node:fs/promises";
import babelPluginLpReactIntl from "babel-plugin-lp-react-intl";

const messageKeys: string[] = [];

async function transformFile(filePath: string) {
  const sourceCode = await readFile(filePath, "utf-8");

  const ast = parser.parse(sourceCode, {
    sourceType: "module",
    plugins: ["jsx", "typescript"],
  });

  const res = transformFromAstSync(ast, sourceCode, {
    plugins: [babelPluginLpReactIntl({ messageKeys })],
    retainLines: true,
  });

  const formatedCode = await prettier.format(res?.code!, {
    filepath: filePath,
  });

  return formatedCode;
}

export { messageKeys, transformFile };
