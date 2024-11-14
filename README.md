




# lp-react-intl-cli

第一步，全局安装这个命令：

npm install -g lp-react-intl-cli

第二步，进入 react 项目目录，执行 lp-react-intl-cli init

在src 目录下会生成一个 locale 目录，里面有一个 en.json 和 zh.json 文件，分别代表英文和中文的翻译文件。还有index.ts

第三部，执行 lp-react-intl-cli extract ./src

将src目录下的所有文件中的中文，输出到 zh.json 和 en.json 文件中

第四部，执行 lp-react-intl-cli transform ./src/index.tsx

将src目录下的所有文件中自动添加

import { defineMessages } from "react-intl";
import intl from "@/locales";
const intlMessages = defineMessages({
  ...
});

并对中文进行 包裹：

intl.formatMessage(intlMessages["中文"])



