
# 🌍 lp-react-intl-cli

[![npm version](https://img.shields.io/npm/v/lp-react-intl-cli.svg?style=flat-square)](https://www.npmjs.com/package/lp-react-intl-cli)
[![npm downloads](https://img.shields.io/npm/dm/lp-react-intl-cli.svg?style=flat-square)](https://www.npmjs.com/package/lp-react-intl-cli)

✨ **lp-react-intl-cli** 是一个专为 React 项目设计的国际化自动化工具，提供了代码转换、国际化提取、初始化配置、JSON 与 XLSX 文件互转等强大功能，助力你的多语言开发之旅！

## 🚀 功能

- **代码转换**：自动将代码中的中文内容替换为 `intl.formatMessage`。
- **提取国际化**：扫描文件或文件夹中的中文内容并生成 `zh.json` 和 `en.json`。
- **初始化配置**：一键创建 `react-intl` 所需的初始化文件。
- **文件格式互转**：支持 JSON 与 Excel 文件的双向转换，方便翻译工作流。
- **高效递归处理**：支持对目录及子目录的递归处理。

## 📦 安装

使用 npm 或 yarn 进行安装：

```bash
npm install -g lp-react-intl-cli
# 或
yarn global add lp-react-intl-cli
```

## 🛠️ 使用

### 1. 初始化国际化配置

快速创建 `react-intl` 所需的初始化文件，包括 `zh.json`、`en.json` 和 `index.ts`。

```bash
lp-react-intl-cli init
```

初始化后，项目目录结构如下：

```
src/
├── locales/
│   ├── en.json
│   ├── zh.json
│   └── index.ts
```

index.ts 文件内容如下：

```typescript
import { createIntl, createIntlCache } from 'react-intl';
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
      
```

### 2. 转换目标代码

自动将文件或文件夹中的中文内容转换为 `intl.formatMessage`,并添加依赖信息，请确保项目已经安装 `react-intl`。

```bash
lp-react-intl-cli transform <path>
```

- `<path>`: 目标文件或文件夹路径。
- 示例：

```bash
lp-react-intl-cli transform ./src
```

### 3. 提取国际化消息

提取文件或文件夹中的中文内容并生成国际化消息文件。

```bash
lp-react-intl-cli extract <path>
```

- `<path>`: 目标文件或文件夹路径。
- 示例：

```bash
lp-react-intl-cli extract ./src
```

提取完成后会生成 `zh.json` 和 `en.json` 文件，分别用于中文和英文翻译。

### 4. JSON 与 Excel 文件互转

#### JSON 转 Excel

将目录中的 JSON 文件合并为一个 Excel 文件，便于翻译人员使用。

```bash
lp-react-intl-cli excel [dir] [output]
```

- `[dir]`: 包含 JSON 文件的文件夹路径（默认为 `./src/locales`）。
- `[output]`: 生成的 Excel 文件路径（默认为 `./src/locales/output.xlsx`）。
- 示例：

```bash
lp-react-intl-cli excel ./src/locales ./src/locales/messages.xlsx
```

#### Excel 转 JSON

将 Excel 文件中的内容拆分为 JSON 文件。

```bash
lp-react-intl-cli json [input] [output]
```

- `[input]`: Excel 文件路径（默认为 `./src/locales/output.xlsx`）。
- `[output]`: 输出的 JSON 文件夹路径（默认为 `./src/locales`）。
- 示例：

```bash
lp-react-intl-cli json ./src/locales/messages.xlsx ./src/locales
```

### 5. 查看帮助信息

```bash
lp-react-intl-cli --help
```

## 📚 示例

### 代码转换前

```jsx
function App() {
  return <div>你好，世界！</div>;
}
```

### 代码转换后

```jsx
import intl from '@/locales';

function App() {
  return <div>{intl.formatMessage(intlMessages['你好，世界！'])}</div>;
}
```

### 提取后生成的 `zh.json`

```json
{
  "你好，世界！": "你好，世界！"
}
```

### 提取后生成的 `en.json`

```json
{
  "你好，世界！": ""
}
```

## 🌟 特性

- **易用性**：只需简单几条命令即可完成复杂的国际化配置。
- **可扩展性**：支持递归处理目录及自定义文件格式。
- **灵活性**：生成的消息文件可以直接用于翻译或进一步处理。

## 🐛 常见问题

### 1. 为什么 `transform` 转换后某些中文未被替换？
- 确保这些中文未被 `i18n-disable` 注释标记为跳过。
- 确保文件扩展名是支持的类型（`.js`、`.jsx`、`.ts`、`.tsx`）。

### 2. 如何处理 Excel 文件中的翻译？
- Excel 文件可以直接交给翻译人员，完成后使用 `json` 命令转换回 JSON 格式。


💡 **为你的项目插上国际化的翅膀！**


