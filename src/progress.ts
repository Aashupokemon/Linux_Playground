import type { ProgressState, TabId } from './types';
const KEY = 'linux-playground-progress-v1';
export function loadProgress(): ProgressState {
  const empty: ProgressState = { scores: {}, mastered: [], theme: 'dark' };
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) ?? 'null');
    if (!parsed || typeof parsed !== 'object') return empty;
    return {
      scores: Object.fromEntries(Object.entries(parsed.scores && typeof parsed.scores === 'object' ? parsed.scores : {}).filter(([, score]) => typeof score === 'number' && Number.isInteger(score) && score >= 0 && score <= 5)) as Record<string, number>,
      mastered: Array.isArray(parsed.mastered) ? parsed.mastered.filter((id: unknown) => typeof id === 'string') : [],
      lastCommandId: typeof parsed.lastCommandId === 'string' ? parsed.lastCommandId : undefined,
      lastTab: typeof parsed.lastTab === 'string' ? parsed.lastTab : undefined,
      theme: parsed.theme === 'light' ? 'light' : 'dark',
    };
  } catch { return empty; }
}
export function saveProgress(next: ProgressState): void {
  try { localStorage.setItem(KEY, JSON.stringify(next)); }
  catch { /* The lesson remains usable when browser storage is unavailable. */ }
}
export function recordVisit(state: ProgressState, tab: TabId, commandId: string): ProgressState {
  const next = { ...state, lastTab: tab, lastCommandId: commandId };
  saveProgress(next); return next;
}
export function recordQuiz(state: ProgressState, commandId: string, score: number): ProgressState {
  const next = { ...state, scores: { ...state.scores, [commandId]: Math.max(state.scores[commandId] ?? 0, score) }, mastered: [...new Set([...state.mastered, ...(score >= 4 ? [commandId] : [])])] };
  saveProgress(next); return next;
}
export function setTheme(state: ProgressState, theme: 'dark' | 'light'): ProgressState {
  const next = { ...state, theme }; saveProgress(next); return next;
}
