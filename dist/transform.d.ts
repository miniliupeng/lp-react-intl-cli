declare const messageKeys: string[];
declare function transformFile(filePath: string): Promise<string>;
export { messageKeys, transformFile };
