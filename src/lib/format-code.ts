import type { LanguageId } from "@/lib/types";

/**
 * Format code in the editor. JavaScript/TypeScript are handled by Monaco's
 * built-in formatter; Python uses Ruff (via wasm) and Java/C++ use
 * clang-format (via wasm), matching the 4-space indent of the starter
 * templates. Both wasm modules are lazy-loaded on first use.
 */
export async function formatCode(lang: LanguageId, code: string): Promise<string> {
  switch (lang) {
    case "python": {
      const mod = await import("@wasm-fmt/ruff_fmt/web");
      await mod.default();
      return mod.format(code, "solution.py", {
        indent_style: "space",
        indent_width: 4,
        line_width: 88,
        quote_style: "preserve",
      });
    }
    case "java":
    case "cpp": {
      const mod = await import("@wasm-fmt/clang-format/web");
      await mod.default();
      // clang-format picks the language from the filename extension.
      const filename = lang === "java" ? "Solution.java" : "solution.cpp";
      const style = JSON.stringify({
        BasedOnStyle: "LLVM",
        IndentWidth: 4,
        ColumnLimit: 100,
        SortIncludes: false,
        AccessModifierOffset: -4,
      });
      return mod.format(code, filename, style);
    }
    default:
      throw new Error("Formatting isn't supported for this language yet.");
  }
}
