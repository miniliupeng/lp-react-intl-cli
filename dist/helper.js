var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import chalk from "chalk";
import path from "path";
import pkg from "exceljs";
import { readdirSync, readFileSync } from "node:fs";
import { writeFileSync } from "fs";
const { Workbook } = pkg;
export const jsonToXlsx = (dir, output) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const files = readdirSync(dir);
        const jsonFiles = files.filter((file) => file.endsWith(".json"));
        const jsonNames = jsonFiles.map((file) => path.basename(file, ".json"));
        if (jsonFiles.length === 0) {
            console.log("指定目录下没有找到 JSON 文件。");
            return;
        }
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet("test");
        const bundleData = jsonFiles.map((file) => JSON.parse(readFileSync(path.join(dir, file), "utf-8")));
        bundleData.reduce((acc, curr, index) => {
            for (let key in curr) {
                acc[key] = curr[key];
            }
            return acc;
        }, []);
        const data = [];
        bundleData.forEach((item, index) => {
            for (let key in item) {
                const foundItem = data.find((item) => item.id === key);
                if (foundItem) {
                    foundItem[jsonNames[index]] = item[key];
                }
                else {
                    data.push({
                        id: key,
                        [jsonNames[index]]: item[key],
                    });
                }
            }
        });
        worksheet.columns = [
            { header: "ID", key: "id", width: 30 },
            ...jsonNames.map((item) => {
                return {
                    header: item,
                    key: item,
                    width: 30,
                };
            }),
        ];
        worksheet.addRows(data);
        workbook.xlsx.writeFile(output);
        console.log(`${chalk.bgBlueBright("CREATE")} ${output}`);
    }
    catch (error) {
        console.error("处理 JSON 文件时出错:", error.message);
    }
});
export const xlsxToJson = (input, output) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const workbook = new Workbook();
        yield workbook.xlsx.readFile(input);
        const worksheet = workbook.getWorksheet(1);
        const headKeys = worksheet.getRow(1).values;
        const json = headKeys.slice(2).reduce((acc, key) => {
            acc[key] = {};
            return acc;
        }, {});
        worksheet === null || worksheet === void 0 ? void 0 : worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
            if (rowNumber === 1) {
                return;
            }
            headKeys.forEach((key, index) => {
                if (index > 1) {
                    json[key][row.getCell(1).value] = row.getCell(index).value;
                }
            });
        });
        Object.keys(json).forEach((key) => {
            writeFileSync(`${output}/${key}.json`, JSON.stringify(json[key], null, 2));
        });
    }
    catch (error) {
        console.error("处理 XLSX 文件时出错:", error.message);
    }
});
