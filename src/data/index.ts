import type { CommandLesson, TabId } from "../types";
import { filesLessons } from "./filesLessons";
import { findingLessons } from "./findingLessons";
import { gettingStarted } from "./gettingStarted";
import { movingAround } from "./movingAround";
import { diskLessons } from "./diskLessons";
import { networkLessons } from "./networkLessons";
import { permissionsLessons } from "./permissionsLessons";
import { processLessons } from "./processLessons";
import { shellLessons } from "./shellLessons";
import { systemLessons } from "./systemLessons";
import { textLessons } from "./textLessons";
import { TABS } from "./tabs";

export { TABS };

export const LESSONS: CommandLesson[] = [
  ...gettingStarted,
  ...movingAround,
  ...filesLessons,
  ...findingLessons,
  ...textLessons,
  ...permissionsLessons,
  ...processLessons,
  ...diskLessons,
  ...networkLessons,
  ...systemLessons,
  ...shellLessons,
];

export function lessonsForTab(tab: TabId): CommandLesson[] {
  return LESSONS.filter((l) => l.tab === tab);
}

export function getLesson(id: string): CommandLesson | undefined {
  return LESSONS.find((l) => l.id === id);
}

export function nextLesson(
  id: string,
  tab: TabId,
): CommandLesson | undefined {
  const list = lessonsForTab(tab);
  const i = list.findIndex((l) => l.id === id);
  if (i < 0) return undefined;
  if (i + 1 < list.length) return list[i + 1];
  const tabIndex = TABS.findIndex((t) => t.id === tab);
  for (let t = tabIndex + 1; t < TABS.length; t++) {
    const next = lessonsForTab(TABS[t].id);
    if (next[0]) return next[0];
  }
  return undefined;
}

export function searchLessons(query: string): CommandLesson[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return LESSONS.filter(
    (l) =>
      l.name.toLowerCase().includes(q) ||
      l.id.toLowerCase().includes(q) ||
      l.metaphor.toLowerCase().includes(q) ||
      l.explanation.toLowerCase().includes(q),
  );
}
