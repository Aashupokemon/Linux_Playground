export type TabId =
  | "getting-started"
  | "moving-around"
  | "files"
  | "finding"
  | "text"
  | "permissions"
  | "processes"
  | "disk"
  | "network"
  | "system"
  | "shell";

export type Difficulty = "intro" | "beginner" | "intermediate" | "advanced";

export type AnimationKind =
  | "intro"
  | "walk"
  | "files"
  | "search"
  | "pipe"
  | "lock"
  | "process"
  | "network";

export type VisualState = {
  cwd?: string;
  rooms?: string[];
  files?: string[];
  highlight?: string[];
  items?: {
    name: string;
    folder?: string;
    gone?: boolean;
    match?: boolean;
    lock?: string;
  }[];
  boxes?: { label: string; items: string[] }[];
  workers?: { name: string; alive: boolean }[];
  packets?: number;
  from?: string;
  to?: string;
  status?: string;
  mode?: string;
  file?: string;
  message?: string;
  lock?: string;
};

export type DemoStep = {
  command: string;
  output: string;
  caption: string;
  visual: VisualState;
};

export type QuizQuestion = {
  prompt: string;
  options: [string, string, string, string];
  answer: 0 | 1 | 2 | 3;
  explain: string;
};

export type CommandLesson = {
  id: string;
  name: string;
  tab: TabId;
  difficulty: Difficulty;
  metaphor: string;
  explanation: string;
  flags: { flag: string; meaning: string }[];
  examples: { command: string; meaning: string; output: string }[];
  animationKind: AnimationKind;
  animationScript: DemoStep[];
  pitfalls: string[];
  quiz: [QuizQuestion, QuizQuestion, QuizQuestion, QuizQuestion, QuizQuestion];
  danger?: boolean;
};

export type TabMeta = {
  id: TabId;
  label: string;
  level: Difficulty;
  blurb: string;
};

export type ProgressState = {
  scores: Record<string, number>;
  mastered: string[];
  lastTab?: TabId;
  lastCommandId?: string;
  theme: "dark" | "light";
};
