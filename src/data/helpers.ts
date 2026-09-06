import type {
  AnimationKind,
  CommandLesson,
  DemoStep,
  Difficulty,
  QuizQuestion,
  TabId,
  VisualState,
} from "../types";

export function q(
  prompt: string,
  options: [string, string, string, string],
  answer: 0 | 1 | 2 | 3,
  explain: string,
): QuizQuestion {
  return { prompt, options, answer, explain };
}

type QuizFive = [
  QuizQuestion,
  QuizQuestion,
  QuizQuestion,
  QuizQuestion,
  QuizQuestion,
];

export function cmd(spec: {
  id: string;
  name: string;
  tab: TabId;
  difficulty: Difficulty;
  metaphor: string;
  explanation: string;
  flags?: [string, string][];
  examples: [string, string, string][];
  animationKind: AnimationKind;
  steps: [string, string, string, VisualState][];
  pitfalls: string[];
  quiz: QuizFive;
  danger?: boolean;
}): CommandLesson {
  const animationScript: DemoStep[] = spec.steps.map(
    ([command, output, caption, visual]) => ({
      command,
      output,
      caption,
      visual,
    }),
  );
  return {
    id: spec.id,
    name: spec.name,
    tab: spec.tab,
    difficulty: spec.difficulty,
    metaphor: spec.metaphor,
    explanation: spec.explanation,
    flags: (spec.flags ?? []).map(([flag, meaning]) => ({ flag, meaning })),
    examples: spec.examples.map(([command, meaning, output]) => ({
      command,
      meaning,
      output,
    })),
    animationKind: spec.animationKind,
    animationScript,
    pitfalls: spec.pitfalls,
    quiz: spec.quiz,
    danger: spec.danger,
  };
}
