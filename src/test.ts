import path from "node:path";
import { transformFile } from "./transform.js";

(async function () {
  const filePath = path.join(process.cwd(), "./demo/index.tsx");

  const code = await transformFile(filePath);
  console.log(code);
})();
