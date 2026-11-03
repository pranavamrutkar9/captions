import fs from "fs";
import path from "path";
import { Project, Word, CaptionLine, CustomWord, CaptionStyle, Export } from "@code-mixed-captions/shared";
import { resolveStoragePath } from "@/lib/paths";

interface DatabaseSchema {
  projects: Record<string, Project>;
  words: Record<string, Word[]>;
  captionLines: Record<string, CaptionLine[]>;
  customWords: CustomWord[];
  captionStyles: CaptionStyle[];
  exports: Record<string, Export[]>;
}

const DB_DIR = resolveStoragePath("storage");
const DB_PATH = path.join(DB_DIR, "db.json");

function getInitialSchema(): DatabaseSchema {
  return {
    projects: {},
    words: {},
    captionLines: {},
    customWords: [],
    captionStyles: [
      {
        id: "style-default",
        name: "Classic Reel",
        fontFamily: "Inter",
        fontSize: 24,
        color: "#FFFFFF",
        outlineColor: "#000000",
        outlineWidth: 2,
        position: "bottom",
        highlightColor: "#FFD700",
      },
    ],
    exports: {},
  };
}

class LocalDatabase {
  private data: DatabaseSchema;

  constructor() {
    this.ensureStorage();
    this.data = this.read();
  }

  private ensureStorage() {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_PATH)) {
      fs.writeFileSync(DB_PATH, JSON.stringify(getInitialSchema(), null, 2), "utf-8");
    }
  }

  private read(): DatabaseSchema {
    try {
      this.ensureStorage();
      const content = fs.readFileSync(DB_PATH, "utf-8");
      return JSON.parse(content) as DatabaseSchema;
    } catch {
      return getInitialSchema();
    }
  }

  private save() {
    this.ensureStorage();
    fs.writeFileSync(DB_PATH, JSON.stringify(this.data, null, 2), "utf-8");
  }

  // Projects
  async getProjects(): Promise<Project[]> {
    this.data = this.read();
    return Object.values(this.data.projects).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getProject(id: string): Promise<Project | null> {
    this.data = this.read();
    return this.data.projects[id] || null;
  }

  async saveProject(project: Project): Promise<Project> {
    this.data = this.read();
    this.data.projects[project.id] = {
      ...project,
      updatedAt: new Date().toISOString(),
    };
    this.save();
    return this.data.projects[project.id];
  }

  async deleteProject(id: string): Promise<boolean> {
    this.data = this.read();
    if (!this.data.projects[id]) return false;
    delete this.data.projects[id];
    delete this.data.words[id];
    delete this.data.captionLines[id];
    delete this.data.exports[id];
    this.save();
    return true;
  }

  // Words
  async getWords(projectId: string): Promise<Word[]> {
    this.data = this.read();
    return this.data.words[projectId] || [];
  }

  async setWords(projectId: string, words: Word[]): Promise<void> {
    this.data = this.read();
    this.data.words[projectId] = words;
    this.save();
  }

  // Caption Lines
  async getCaptionLines(projectId: string): Promise<CaptionLine[]> {
    this.data = this.read();
    return this.data.captionLines[projectId] || [];
  }

  async setCaptionLines(projectId: string, lines: CaptionLine[]): Promise<void> {
    this.data = this.read();
    this.data.captionLines[projectId] = lines;
    this.save();
  }

  // Custom Words
  async getCustomWords(): Promise<CustomWord[]> {
    this.data = this.read();
    return this.data.customWords;
  }

  async addCustomWord(wrong: string, right: string): Promise<CustomWord> {
    this.data = this.read();
    const entry: CustomWord = {
      id: `cw-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      wrong,
      right,
    };
    this.data.customWords.push(entry);
    this.save();
    return entry;
  }

  // Exports
  async getExports(projectId: string): Promise<Export[]> {
    this.data = this.read();
    return this.data.exports[projectId] || [];
  }

  async addExport(projectId: string, exp: Export): Promise<void> {
    this.data = this.read();
    if (!this.data.exports[projectId]) {
      this.data.exports[projectId] = [];
    }
    this.data.exports[projectId].push(exp);
    this.save();
  }
}

export const db = new LocalDatabase();
