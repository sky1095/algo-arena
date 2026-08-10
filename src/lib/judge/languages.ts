import type { LanguageId } from "@/lib/types";

export interface LanguageMeta {
  id: LanguageId;
  label: string;
  monaco: string;
  extension: string;
  defaultTemplate: (methodName: string, args: string[]) => string;
}

const toArgs = (types: string[]) => types.join(", ");

export const LANGUAGES: Record<LanguageId, LanguageMeta> = {
  python: {
    id: "python",
    label: "Python",
    monaco: "python",
    extension: "py",
    defaultTemplate: (method, args) =>
      `from typing import List, Optional\n\n\ndef ${method}(${toArgs(args)}):\n    pass\n`,
  },
  javascript: {
    id: "javascript",
    label: "JavaScript",
    monaco: "javascript",
    extension: "js",
    defaultTemplate: (method, args) =>
      `function ${method}(${toArgs(args)}) {\n    \n}\n`,
  },
  typescript: {
    id: "typescript",
    label: "TypeScript",
    monaco: "typescript",
    extension: "ts",
    defaultTemplate: (method, args) =>
      `function ${method}(${toArgs(args)}): any {\n    \n}\n`,
  },
  java: {
    id: "java",
    label: "Java",
    monaco: "java",
    extension: "java",
    defaultTemplate: (method, args) =>
      `class Solution {\n    public ${method}(${toArgs(args)}) {\n        \n    }\n}\n`,
  },
  cpp: {
    id: "cpp",
    label: "C++",
    monaco: "cpp",
    extension: "cpp",
    defaultTemplate: (method, args) =>
      `class Solution {\npublic:\n    ${method}(${toArgs(args)}) {\n        \n    }\n};\n`,
  },
};

export const LANGUAGE_LIST: LanguageMeta[] = Object.values(LANGUAGES);

export const languageById = (id: string): LanguageMeta | undefined =>
  LANGUAGES[id as LanguageId];
