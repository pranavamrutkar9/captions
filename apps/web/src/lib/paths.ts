import fs from "fs";
import path from "path";

export function getProjectRootDir(): string {
  let curr = process.cwd();
  while (curr && curr !== path.dirname(curr)) {
    if (
      fs.existsSync(path.join(curr, "pnpm-workspace.yaml")) ||
      fs.existsSync(path.join(curr, "storage"))
    ) {
      return curr;
    }
    curr = path.dirname(curr);
  }
  return process.cwd();
}

export function resolveStoragePath(relativePath: string): string {
  if (path.isAbsolute(relativePath)) return relativePath;
  const root = getProjectRootDir();
  return path.resolve(root, relativePath);
}

export function ensureDirectory(dirPath: string): void {
  const resolved = resolveStoragePath(dirPath);
  if (!fs.existsSync(resolved)) {
    fs.mkdirSync(resolved, { recursive: true });
  }
}

