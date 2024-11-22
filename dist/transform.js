var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { transformFromAstSync } from "@babel/core";
import parser from "@babel/parser";
import prettier from "prettier";
import { readFile } from "node:fs/promises";
import babelPluginLpReactIntl from "babel-plugin-lp-react-intl";
const messageKeys = [];
function transformFile(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        const sourceCode = yield readFile(filePath, "utf-8");
        const ast = parser.parse(sourceCode, {
            sourceType: "module",
            plugins: ["jsx", "typescript"],
        });
        const res = transformFromAstSync(ast, sourceCode, {
            plugins: [babelPluginLpReactIntl({ messageKeys })],
            retainLines: true,
        });
        const formatedCode = yield prettier.format(res === null || res === void 0 ? void 0 : res.code, {
            filepath: filePath,
        });
        return formatedCode;
    });
}
export { messageKeys, transformFile };
