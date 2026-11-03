export type LanguageMix = "hinglish" | "tanglish" | "benglish";

export type ScriptStyle = "roman" | "mixed_native";

export type ProjectStatus =
  | "uploaded"
  | "extracting"
  | "transcribing"
  | "normalising"
  | "grouping"
  | "ready"
  | "failed";

export type TranscriptWord = {
  idx: number;
  text: string;
  startMs: number;
  endMs: number;
  confidence?: number;
  estimated: boolean;
};

export type TranscriptResult = {
  words: TranscriptWord[];
  timingSource: "word" | "estimated_from_segment";
  provider: string;
  rawResponse?: unknown;
};

export type NormalisationInput = {
  words: Array<{ idx: number; text: string }>;
  languageMix: LanguageMix;
  scriptStyle: ScriptStyle;
  customWords: Array<{ wrong: string; right: string }>;
};

export type NormalisationOutput = {
  words: Array<{ idx: number; text: string }>;
};

export interface Project {
  id: string;
  title: string;
  videoPath: string;
  durationMs: number;
  languageMix: LanguageMix;
  scriptStyle: ScriptStyle;
  status: ProjectStatus;
  errorMessage?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Word {
  id: string;
  projectId: string;
  idx: number;
  textRaw: string;
  textNorm: string;
  startMs: number;
  endMs: number;
  confidence?: number;
  estimated: boolean;
}

export interface CaptionLine {
  id: string;
  projectId: string;
  idx: number;
  wordFrom: number;
  wordTo: number;
  startMs: number;
  endMs: number;
  text: string;
  translationEn?: string;
}

export interface CustomWord {
  id: string;
  wrong: string;
  right: string;
  userId?: string;
}

export interface CaptionStyle {
  id: string;
  name: string;
  fontFamily: string;
  fontSize: number;
  color: string;
  outlineColor: string;
  outlineWidth: number;
  position: "bottom" | "middle" | "top";
  highlightColor?: string;
}

export interface Export {
  id: string;
  projectId: string;
  type: "srt" | "ass" | "burned";
  path: string;
  createdAt: string;
}
