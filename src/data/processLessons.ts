import { cmd, q } from "./helpers";

export const processLessons = [
  cmd({
    id: "ps",
    name: "ps",
    tab: "processes",
    difficulty: "intermediate",
    metaphor: "ps is a snapshot of every worker currently on the factory floor.",
    explanation:
      "A process is a running program. ps lists them. ps aux (BSD style) or ps -ef (UNIX style) shows many users’ workers. The PID is each worker’s ticket number — kill uses that number.",
    flags: [
      ["aux", "Lots of processes, with CPU/memory hints"],
      ["-ef", "Full list, System V style"],
    ],
    examples: [
      ["ps", "Your processes in this terminal.", "PID TTY TIME CMD"],
      ["ps aux | grep firefox", "Find a browser worker.", "you  4321 ... firefox"],
    ],
    animationKind: "process",
    steps: [
      [
        "ps aux",
        "USER  PID  %CPU  COMMAND\nyou   1204  0.1   bash\nyou   4321  3.2   firefox\nroot     1  0.0   systemd",
        "Each row is a worker. PID 4321 is the ticket you would show the manager to stop firefox.",
        {
          workers: [
            { name: "bash (1204)", alive: true },
            { name: "firefox (4321)", alive: true },
            { name: "systemd (1)", alive: true },
          ],
        },
      ],
    ],
    pitfalls: [
      "ps is a snapshot — one second later the floor can change.",
      "Do not kill PID 1 (systemd/init) on a whim.",
    ],
    quiz: [
      q("A process is…", ["A folder", "A running program", "A JPEG", "A password"], 1, "Worker."),
      q("PID is…", ["A file type", "The process’s ticket number", "A group always", "Ping"], 1, "ID."),
      q("ps aux | grep firefox…", ["Installs firefox", "Filters the snapshot for firefox", "Deletes firefox files", "chowns /"], 1, "Find worker."),
      q("ps vs top?", ["ps snapshot; top live updating", "top is a file", "ps never lists PID", "Identical"], 0, "Photo vs movie."),
      q("Why PID for kill?", ["Names can clash; numbers pick one worker", "PID is a username", "kill needs a folder", "PID is umask"], 0, "Precise."),
    ],
  }),
  cmd({
    id: "top",
    name: "top",
    tab: "processes",
    difficulty: "intermediate",
    metaphor: "top is a live scoreboard of who is hogging the ovens (CPU) and fridge (RAM).",
    explanation:
      "top refreshes until you press q. Busy workers rise to the top. htop is a friendlier cousin if installed. This is how you notice a runaway program.",
    flags: [["-o %MEM", "Some versions: sort by memory (varies)"]],
    examples: [
      ["top", "Live scoreboard.", "(interactive — q to quit)"],
      ["htop", "If installed, a nicer scoreboard.", "(interactive)"],
    ],
    animationKind: "process",
    steps: [
      [
        "top",
        "  PID USER  %CPU %MEM COMMAND\n 4321 you   40.0 12.0 firefox\n 1204 you    0.1  0.4 bash",
        "The scoreboard blinks. firefox is using the big oven. q leaves, just like less.",
        {
          workers: [
            { name: "firefox 40% CPU", alive: true },
            { name: "bash 0.1% CPU", alive: true },
          ],
        },
      ],
    ],
    pitfalls: [
      "Beginners forget q to quit.",
      "High CPU for a second can be normal; watch the trend.",
    ],
    quiz: [
      q("top is…", ["A static file", "A live process scoreboard", "A folder named top", "chmod"], 1, "Live."),
      q("Quit top with…", ["exit exit", "q", "rm", "cd /"], 1, "Like less."),
      q("You use top to…", ["See resource hogs", "Create users", "Paint walls", "Replace ls"], 0, "CPU/RAM."),
      q("htop is…", ["Illegal", "A popular friendlier top", "A disk formatter", "grep"], 1, "Optional."),
      q("ps vs top in one word pair…", ["snapshot vs live", "delete vs copy", "user vs group", "file vs host"], 0, "Time."),
    ],
  }),
  cmd({
    id: "kill",
    name: "kill",
    tab: "processes",
    difficulty: "intermediate",
    metaphor: "kill is tapping a worker on the shoulder with a numbered ticket — politely first, firmly if needed.",
    explanation:
      "kill PID sends a signal. Default is TERM: ‘please wrap up’. kill -9 PID is KILL: no chance to save (last resort). kill does not delete files. Confirm the PID with ps so you do not tap the wrong shoulder.",
    danger: true,
    flags: [
      ["-15 or default", "TERM: polite stop"],
      ["-9", "KILL: immediate (last resort)"],
    ],
    examples: [
      ["kill 4321", "Politely stop PID 4321.", "(process should exit)"],
      ["kill -9 4321", "Force stop if it refuses.", "(gone)"],
    ],
    animationKind: "process",
    steps: [
      [
        "ps aux | grep firefox",
        "you  4321  ... firefox",
        "Found the ticket.",
        {
          workers: [
            { name: "firefox (4321)", alive: true },
            { name: "bash (1204)", alive: true },
          ],
        },
      ],
      [
        "kill 4321",
        "",
        "Polite tap. firefox left the floor. -9 would be the fire alarm — only if they ignore you.",
        {
          workers: [
            { name: "firefox (4321)", alive: false },
            { name: "bash (1204)", alive: true },
          ],
        },
      ],
    ],
    pitfalls: [
      "Wrong PID can close the wrong app (or worse).",
      "kill -9 prevents cleanup — prefer TERM first.",
    ],
    quiz: [
      q("kill 4321 needs…", ["A filename", "A PID", "A hostname always", "umask"], 1, "Ticket."),
      q("Default kill signal is roughly…", ["Please stop (TERM)", "Format disk", "Create a user", "gzip"], 0, "Polite."),
      q("-9 is…", ["Nice", "Force kill, last resort", "Help", "Quiet"], 1, "KILL."),
      q("kill deletes firefox’s program files?", ["Yes", "No, it stops a running worker", "Only with sudo", "Always Photos"], 1, "Process not package."),
      q("Before kill you should…", ["Guess PIDs", "Confirm with ps/top", "rm the binary", "chmod 777 /"], 1, "Identify."),
    ],
  }),
  cmd({
    id: "killall",
    name: "killall",
    tab: "processes",
    difficulty: "intermediate",
    metaphor: "killall is calling every worker with the same job title off the floor at once.",
    explanation:
      "killall firefox sends a signal to processes named firefox. Convenient and slightly more dangerous than a single PID because names can match more than you think. Some Unixes have a different killall — on Linux it is usually ‘by name’.",
    examples: [
      ["killall firefox", "Stop firefox processes by name.", "(they should exit)"],
      ["killall -9 hung-app", "Force by name.", "(last resort)"],
    ],
    animationKind: "process",
    steps: [
      [
        "killall firefox",
        "",
        "Every firefox nametag left. Double-check the name — a short name can match too much.",
        {
          workers: [
            { name: "firefox", alive: false },
            { name: "bash", alive: true },
          ],
        },
      ],
    ],
    pitfalls: [
      "On some non-Linux Unix, killall means something scarier — know your OS.",
      "Partial names might not match; exact command names do.",
    ],
    quiz: [
      q("On Linux, killall firefox…", ["Deletes the firefox package", "Signals processes named firefox", "Kills all processes on the computer always", "Formats /"], 1, "By name."),
      q("kill vs killall?", ["kill uses PID; killall often uses a name", "killall needs no name", "Identical", "kill uses only names"], 0, "ID vs title."),
      q("Risk of killall?", ["Might hit more processes than you pictured", "None ever", "It always kills PID 1", "It is cat"], 0, "Broad."),
      q("-9 with killall is…", ["Gentle", "Still a last resort force", "A directory", "grep"], 1, "Force."),
      q("killall is rm?", ["Yes", "No — processes, not files", "Only for txt", "It is mkdir"], 1, "Workers."),
    ],
  }),
  cmd({
    id: "jobs",
    name: "jobs",
    tab: "processes",
    difficulty: "intermediate",
    metaphor: "jobs is the sticky list of tasks you paused or backgrounded in this terminal.",
    explanation:
      "Ctrl+Z pauses a foreground program. jobs lists those paused/background tasks with numbers like %1. This list is per-terminal, not the whole computer (that is ps).",
    examples: [
      ["jobs", "List this shell’s jobs.", "[1]+  Stopped  nano notes.txt"],
      ["Ctrl+Z", "Pause the current program.", "(returns you to the prompt)"],
    ],
    animationKind: "process",
    steps: [
      [
        "jobs",
        "[1]+  Stopped    nano notes.txt\n[2]-  Running    sleep 100 &",
        "Two sticky notes on this terminal’s fridge — not the whole factory (use ps for that).",
        {
          workers: [
            { name: "%1 nano (stopped)", alive: true },
            { name: "%2 sleep (running)", alive: true },
          ],
        },
      ],
    ],
    pitfalls: [
      "Closing the terminal can hang up jobs — nohup or systemd for long work.",
      "Job numbers %1 are not PIDs.",
    ],
    quiz: [
      q("jobs lists…", ["Every process on the PC", "Background/stopped tasks of this shell", "All files", "Users"], 1, "This terminal."),
      q("Ctrl+Z typically…", ["Kills -9", "Pauses the foreground program", "Clears the screen only", "Runs sudo"], 1, "Suspend."),
      q("%1 is…", ["A PID always", "A job number for this shell", "A umask", "A port"], 1, "Job spec."),
      q("jobs vs ps?", ["jobs is local to the shell; ps is wider", "ps is only %1", "Identical", "jobs shows other PCs"], 0, "Scope."),
      q("Job numbers survive a reboot?", ["Yes forever", "No, they are session stickies", "They become uids", "They are hostnames"], 1, "Ephemeral."),
    ],
  }),
  cmd({
    id: "fg",
    name: "fg",
    tab: "processes",
    difficulty: "intermediate",
    metaphor: "fg is bringing a paused worker back to the front desk to talk to you again.",
    explanation:
      "fg resumes a job in the foreground (it occupies the terminal). fg %1 picks job 1. Without a number it usually resumes the current (most recent) job.",
    examples: [
      ["fg", "Resume the current job in front.", "(nano comes back)"],
      ["fg %1", "Resume job 1.", "(that job occupies the terminal)"],
    ],
    animationKind: "process",
    steps: [
      [
        "fg %1",
        "(nano notes.txt returns)",
        "The editor is back in your face. The prompt hides until you quit or pause again.",
        {
          workers: [{ name: "nano (foreground)", alive: true }],
        },
      ],
    ],
    pitfalls: [
      "You cannot type new commands until the foreground job finishes or you pause it.",
      "Wrong % number resumes the wrong task.",
    ],
    quiz: [
      q("fg means…", ["forget", "foreground: resume in front", "file grep", "force gzip"], 1, "Front desk."),
      q("fg %2…", ["Resumes job 2", "Kills PID 2", "chmod 2", "cd 2"], 0, "Job spec."),
      q("While a job is foreground…", ["The shell prompt is busy with that program", "You always have a free prompt", "Linux pauses the kernel", "ls is forbidden forever"], 0, "Occupied."),
      q("fg vs bg?", ["fg: front; bg: keep working behind", "Opposite", "Same", "bg deletes"], 0, "Where it works."),
      q("No jobs to fg?", ["Error / nothing to resume", "Formats /", "Creates a user", "Always resumes PID 1"], 0, "Empty list."),
    ],
  }),
  cmd({
    id: "bg",
    name: "bg",
    tab: "processes",
    difficulty: "intermediate",
    metaphor: "bg is sending a paused worker back to work in the back room so you can keep talking at the desk.",
    explanation:
      "After Ctrl+Z, bg continues the job in the background. Starting a command with & also backgrounds it: sleep 60 &. Output may still spill into your terminal.",
    examples: [
      ["bg", "Continue the current stopped job behind you.", "[1]+ sleep 100 &"],
      ["sleep 30 &", "Start already in the back room.", "[1] 9988"],
    ],
    animationKind: "process",
    steps: [
      [
        "bg %1",
        "[1]+ sleep 100 &",
        "The sleeper works in the back. Your prompt is free. Output can still shout through the door.",
        {
          workers: [
            { name: "sleep %1 (background)", alive: true },
            { name: "bash (prompt free)", alive: true },
          ],
        },
      ],
    ],
    pitfalls: [
      "Background programs that need a keyboard (nano) are unhappy in bg — use fg.",
      "Closing the terminal may still send hangup — see nohup.",
    ],
    quiz: [
      q("bg continues a job…", ["In the foreground only", "In the background", "By deleting it", "On another PC always"], 1, "Back room."),
      q("command & means…", ["Comment", "Start in background", "Pipe", "Home"], 1, "Ampersand."),
      q("nano in background is…", ["Usually awkward (needs the keyboard)", "Perfect always", "Required", "The same as kill"], 0, "Interactive."),
      q("After bg, the prompt is…", ["Usually free again", "Gone forever", "root always", "A JPEG"], 0, "Desk open."),
      q("Ctrl+Z then bg is a common dance to…", ["Pause then continue behind", "Delete the job", "chmod the job", "grep the kernel"], 0, "Suspend then background."),
    ],
  }),
  cmd({
    id: "nohup",
    name: "nohup",
    tab: "processes",
    difficulty: "intermediate",
    metaphor: "nohup is leaving a worker a note: ‘keep going even if I go home and close the shop door’.",
    explanation:
      "Hangup (HUP) is the signal many programs get when the terminal closes. nohup command & ignores that, often writing output to nohup.out. For serious services, systemd is the grown-up tool.",
    examples: [
      ["nohup ./long-job.sh &", "Survive a closed terminal.", "output -> nohup.out"],
      ["nohup sleep 1000 &", "Toy example.", "(sleep keeps going)"],
    ],
    animationKind: "process",
    steps: [
      [
        "nohup ./long-job.sh &",
        "nohup: ignoring input and appending output to 'nohup.out'",
        "The worker has a lunchbox and a note. Closing the door should not stop them. Check nohup.out for their diary.",
        {
          workers: [{ name: "long-job (nohup)", alive: true }],
        },
      ],
    ],
    pitfalls: [
      "nohup is not a full service manager (restarts, logs, secrets).",
      "You still need execute permission on the script.",
    ],
    quiz: [
      q("nohup helps a command…", ["Ignore hangup when the terminal closes", "Delete /", "Change hostname", "Become grep"], 0, "Survive HUP."),
      q("Output often goes to…", ["/dev/null always", "nohup.out", "the kernel log only", "Photos"], 1, "Default file."),
      q("& with nohup is…", ["Useless", "Common: run in background too", "A redirect in", "sudo"], 1, "Background."),
      q("Servers in production prefer…", ["Random nohup on laptops only", "systemd/service managers", "only Ctrl+Z", "kill -9 hourly"], 1, "Grown-up."),
      q("HUP means…", ["Happy user process", "Hangup signal", "Huge uniq print", "Home user path"], 1, "Hangup."),
    ],
  }),
  cmd({
    id: "sleep",
    name: "sleep",
    tab: "processes",
    difficulty: "intermediate",
    metaphor: "sleep is a worker whose only job is to wait N seconds — a timer for scripts.",
    explanation:
      "sleep 5 pauses for five seconds then exits. Scripts use it to wait; you will use it to practice jobs, bg, and Ctrl+C. sleep 1m may work for one minute on GNU sleep.",
    examples: [
      ["sleep 2", "Wait two seconds.", "(prompt returns after 2s)"],
      ["sleep 30 &", "Wait in the background.", "[1] 4402"],
    ],
    animationKind: "process",
    steps: [
      [
        "sleep 2",
        "",
        "Everyone waited two heartbeats. Harmless, perfect for practicing fg/bg without launching a browser.",
        { workers: [{ name: "sleep 2s", alive: true }] },
      ],
    ],
    pitfalls: [
      "sleep 1000 in the foreground just feels like a frozen terminal — Ctrl+C or background it.",
      "Units differ slightly between BSD and GNU sleep.",
    ],
    quiz: [
      q("sleep 5…", ["Deletes 5 files", "Waits about 5 seconds", "Kills PID 5", "chmod 5"], 1, "Timer."),
      q("Good practice toy for jobs?", ["Yes — harmless waiter", "No — it formats disks", "Only as root", "It is grep"], 0, "Safe."),
      q("Stuck in sleep 1000 foreground?", ["Ctrl+C (or Z then bg)", "unplug GPU", "rm /", "whoami loops"], 0, "Interrupt."),
      q("sleep in a script is for…", ["Waiting between steps", "Compiling the kernel always", "Replacing ls", "Networking stacks"], 0, "Delay."),
      q("sleep is a process you can ps?", ["Yes, while it is running", "Never", "Only with -9", "Only in Photos"], 0, "It is a worker too."),
    ],
  }),
];
