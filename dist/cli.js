#!/usr/bin/env node
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { writeFile, readdir, stat, mkdir } from "node:fs/promises";
import path from "node:path";
import { Command } from "commander";
import chalk from "chalk";
import { messagesZh, messagesEn, transformFile } from "./transform.js";
const program = new Command();
program.name("lp-react-intl").description("自动国际化").version("1.0.0");
function transformAndWriteFile(filePath_1) {
    return __awaiter(this, arguments, void 0, function* (filePath, extract = false) {
        try {
            const formattedCode = yield transformFile(filePath);
            if (extract) {
                console.log(`${chalk.bgBlueBright("EXTRACT")} ${filePath}`);
            }
            else {
                yield writeFile(filePath, formattedCode);
                console.log(`${chalk.bgBlueBright("UPDATE")} ${filePath}`);
            }
        }
        catch (e) {
            if (extract) {
                console.log(chalk.red(`提取文件失败: ${filePath}`), e);
            }
            else {
                console.log(chalk.red(`转换文件失败: ${filePath}`), e);
            }
        }
    });
}
function transformDirectory(dirPath_1) {
    return __awaiter(this, arguments, void 0, function* (dirPath, extract = false) {
        const entries = yield readdir(dirPath, { withFileTypes: true });
        const extensions = new Set([".tsx", ".ts", ".js", ".jsx"]);
        for (const entry of entries) {
            const fullPath = path.join(dirPath, entry.name);
            if (entry.isDirectory()) {
                yield transformDirectory(fullPath, extract);
            }
            else if (extensions.has(path.extname(entry.name))) {
                yield transformAndWriteFile(fullPath, extract);
            }
        }
    });
}
program
    .command("transform")
    .description("转换目标代码")
    .argument("path", "待转换的文件路径或文件夹路径")
    .action((filePath) => __awaiter(void 0, void 0, void 0, function* () {
    const p = path.join(process.cwd(), filePath);
    try {
        const stats = yield stat(p);
        if (stats.isDirectory()) {
            yield transformDirectory(p);
        }
        else if (stats.isFile()) {
            yield transformAndWriteFile(p);
        }
        else {
            console.log(chalk.red("无效的文件或文件夹路径"));
        }
    }
    catch (e) {
        console.log(chalk.red("文件路径不存在"), e);
    }
}));
// `extract` 命令 提取中文输出到 json
program
    .command("extract")
    .description("提取并写入国际化消息到 JSON 文件")
    .argument("path", "待转换的文件路径或文件夹路径")
    .action((filePath) => __awaiter(void 0, void 0, void 0, function* () {
    // 首先执行转换操作
    const p = path.join(process.cwd(), filePath);
    const stats = yield stat(p);
    if (stats.isDirectory()) {
        yield transformDirectory(p, true); // 转换整个目录
    }
    else if (stats.isFile()) {
        yield transformAndWriteFile(p, true); // 转换单个文件
    }
    // 写入消息到 JSON 文件
    const zhPath = path.join(process.cwd(), "src/locales/zh.json");
    const enPath = path.join(process.cwd(), "src/locales/en.json");
    try {
        yield writeFile(zhPath, JSON.stringify(messagesZh, null, 2), "utf-8");
        yield writeFile(enPath, JSON.stringify(messagesEn, null, 2), "utf-8");
        console.log(`${chalk.bgGreen("EXTRACTED")} 中文消息写入 ${zhPath}`);
        console.log(`${chalk.bgGreen("EXTRACTED")} 英文消息写入 ${enPath}`);
    }
    catch (error) {
        console.log(chalk.red("写入文件失败"), error);
    }
}));
program
    .command("init")
    .description("初始化国际化设置文件")
    .action(() => __awaiter(void 0, void 0, void 0, function* () {
    const srcPath = path.join(process.cwd(), "src");
    const localesPath = path.join(srcPath, "locales");
    const indexPath = path.join(localesPath, "index.ts");
    const enPath = path.join(localesPath, "en.json");
    const zhPath = path.join(localesPath, "zh.json");
    const indexContent = `import { createIntl, createIntlCache } from 'react-intl';
import zhCN from './zh.json';
import enUS from './en.json';

const cache = createIntlCache();

const _messages: Record<string, any> = {
  en: enUS,
  zh: zhCN
};

// const locale = 'zh';
const locale = 'en';

const intl = createIntl(
  {
    locale: locale,
    messages: _messages[locale]
  },
  cache
);
export default intl;
      `;
    try {
        // Create src directory if it doesn't exist
        yield mkdir(localesPath, { recursive: true });
        // Write index.ts file
        yield writeFile(indexPath, indexContent);
        console.log(`${chalk.bgGreen("CREATE")} ${indexPath}`);
        // Write empty en.json and zh.json files
        yield writeFile(enPath, "{}");
        console.log(`${chalk.bgGreen("CREATE")} ${enPath}`);
        yield writeFile(zhPath, "{}");
        console.log(`${chalk.bgGreen("CREATE")} ${zhPath}`);
    }
    catch (e) {
        console.log(chalk.red("初始化文件创建失败"), e);
    }
}));
program.parse();
