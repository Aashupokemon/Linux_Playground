import type { TabMeta } from "../types";

export const TABS: TabMeta[] = [
  {
    id: "getting-started",
    label: "Getting started",
    level: "intro",
    blurb: "What Linux is, and the first words you say to the computer.",
  },
  {
    id: "moving-around",
    label: "Moving around",
    level: "beginner",
    blurb: "Look in folders and walk between them, like rooms in a house.",
  },
  {
    id: "files",
    label: "Files and folders",
    level: "beginner",
    blurb: "Make, read, copy, move, and (carefully) throw things away.",
  },
  {
    id: "finding",
    label: "Finding things",
    level: "intermediate",
    blurb: "When you forget a file name, let Linux hunt for you.",
  },
  {
    id: "text",
    label: "Text magic",
    level: "intermediate",
    blurb: "Sort, filter, and pipe words like a factory line.",
  },
  {
    id: "permissions",
    label: "Permissions",
    level: "intermediate",
    blurb: "Locks, keys, and asking politely to do important jobs.",
  },
  {
    id: "processes",
    label: "Running programs",
    level: "intermediate",
    blurb: "Every program is a worker. See them, pause them, stop them.",
  },
  {
    id: "disk",
    label: "Disk and archives",
    level: "intermediate",
    blurb: "Storage space, packing files into boxes, unpacking later.",
  },
  {
    id: "network",
    label: "Network",
    level: "advanced",
    blurb: "Talk to other computers: ping, download, log in from afar.",
  },
  {
    id: "system",
    label: "System and packages",
    level: "advanced",
    blurb: "The computer’s name tag, updates, users, and scheduled jobs.",
  },
  {
    id: "shell",
    label: "Shell superpowers",
    level: "advanced",
    blurb: "Shortcuts, variables, wildcards, and tiny scripts.",
  },
];
