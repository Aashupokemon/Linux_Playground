import { cmd, q } from "./helpers";

export const shellLessons = [
  cmd({
    id: "alias",
    name: "alias",
    tab: "shell",
    difficulty: "advanced",
    metaphor: "alias is a nickname on a sticky note: ll means ls -l so your fingers type less.",
    explanation:
      "alias ll='ls -l' creates a shortcut for this session. Put aliases in ~/.bashrc (or ~/.zshrc) to keep them. alias with no arguments lists them. unalias ll removes one. Don’t shadow dangerous names like alias rm='rm -rf'.",
    examples: [
      ["alias ll='ls -l'", "Nickname ll.", "(ll now lists long)"],
      ["alias", "Show nicknames.", "alias ll='ls -l'"],
    ],
    animationKind: "intro",
    steps: [
      [
        "alias ll='ls -l'",
        "",
        "ll is now a nickname. type ll will reveal the secret. Permanent nicknames live in your shell’s rc file.",
        { message: "ll → ls -l  (this session)" },
      ],
    ],
    pitfalls: [
      "Quotes matter: alias ll=ls -l splits wrongly.",
      "Scripts usually do not load your interactive aliases.",
    ],
    quiz: [
      q("alias ll='ls -l'…", ["Deletes ls", "Makes ll a nickname for ls -l", "Chmods ll", "Installs ll"], 1, "Shortcut."),
      q("Keep aliases after reboot by…", ["Hoping", "Putting them in ~/.bashrc or ~/.zshrc", "Using ping", "chmod 000 home"], 1, "rc file."),
      q("alias with no args…", ["Crashes", "Lists aliases", "Creates a user", "Starts ssh"], 1, "List."),
      q("alias rm='rm -rf' is…", ["A terrible idea", "Best practice", "Required", "The same as unalias"], 0, "Don’t."),
      q("unalias ll…", ["Removes that nickname", "Uninstalls ls", "Deletes /", "Is uniq"], 0, "Drop alias."),
    ],
  }),
  cmd({
    id: "export",
    name: "export",
    tab: "shell",
    difficulty: "advanced",
    metaphor: "export is pinning a note on the family noticeboard so child programs can read it too.",
    explanation:
      "Variables are named sticky notes: NAME=Ada is local to the shell. export NAME=Ada shares it with programs you launch (environment variables). echo $NAME reads it. PATH is the famous list of folders where the shell hunts for commands.",
    examples: [
      ["export CITY=Lisbon", "Share CITY.", "(empty output)"],
      ["echo $CITY", "Read it.", "Lisbon"],
    ],
    animationKind: "pipe",
    steps: [
      [
        "export CITY=Lisbon",
        "",
        "CITY is on the noticeboard. echo $CITY reads the board. Without export, some child apps would not see it.",
        {
          boxes: [
            { label: "shell", items: ["CITY=Lisbon"] },
            { label: "child program", items: ["sees CITY"] },
          ],
        },
      ],
    ],
    pitfalls: [
      "Spaces: CITY=Lisbon not CITY = Lisbon.",
      "export PATH=... wrongly can hide ls until you fix the path.",
    ],
    quiz: [
      q("$NAME means…", ["A PID", "The value of variable NAME", "A folder always", "sudo"], 1, "Expand."),
      q("export shares the variable with…", ["Only Windows", "Child processes", "The disk firmware", "man pages only"], 1, "Environment."),
      q("PATH is…", ["A photo album", "Directories searched for programs", "A password", "umask"], 1, "Command hunt."),
      q("CITY = Lisbon with spaces…", ["Usually a mistake in bash", "Required", "Exports PATH", "Is grep"], 0, "No spaces around =."),
      q("echo CITY vs echo $CITY?", ["$ expands the value", "Identical", "echo CITY is illegal", "$ prints a dollar file"], 0, "Dollar."),
    ],
  }),
  cmd({
    id: "env",
    name: "env",
    tab: "shell",
    difficulty: "advanced",
    metaphor: "env is dumping the whole noticeboard of exported notes onto the table.",
    explanation:
      "env prints environment variables. env -i command runs with a clean board (advanced). You can also env VAR=value command for a one-off. Combined with grep: env | grep PATH.",
    examples: [
      ["env | grep PATH", "Find PATH on the board.", "PATH=/usr/bin:/bin"],
      ["env HOME", "Some env versions query one var — or just echo $HOME.", "/home/you"],
    ],
    animationKind: "pipe",
    steps: [
      [
        "env | grep '^HOME='",
        "HOME=/home/you",
        "The noticeboard is long. grep is the highlighter so PATH/HOME are findable.",
        {
          boxes: [
            { label: "env", items: ["HOME=", "PATH=", "USER="] },
            { label: "grep HOME", items: ["HOME=/home/you"] },
          ],
        },
      ],
    ],
    pitfalls: [
      "env output can contain secrets in badly configured apps — don’t paste it publicly.",
      "printenv is a close cousin.",
    ],
    quiz: [
      q("env prints…", ["Disk partitions", "Environment variables", "Cron only", "apt"], 1, "Board dump."),
      q("env | grep PATH…", ["Deletes PATH", "Filters the dump for PATH", "Installs env", "Is ping"], 1, "Pipe."),
      q("Secrets in env?", ["Possible — be careful sharing dumps", "Impossible", "Required", "Only in Photos"], 0, "Privacy."),
      q("printenv is…", ["A cousin of env", "A disk wipe", "ssh", "tar"], 0, "Similar."),
      q("HOME usually is…", ["Your home directory path", "The hostname", "A PID", "gzip"], 0, "Apartment address."),
    ],
  }),
  cmd({
    id: "source",
    name: "source / .",
    tab: "shell",
    difficulty: "advanced",
    metaphor: "source is reading a recipe into the current kitchen instead of sending it to a separate cook.",
    explanation:
      "source file (or . file) runs the file in this shell so aliases and exports stick. ./script.sh in a subshell would lose them when the script ends. After editing .bashrc, source ~/.bashrc reloads it.",
    examples: [
      ["source ~/.bashrc", "Reload bash settings.", "(aliases return)"],
      [". ./myvars.sh", "Dot is the same idea.", "(variables appear)"],
    ],
    animationKind: "pipe",
    steps: [
      [
        "source ~/.bashrc",
        "",
        "The recipe was stirred into this pot. A separate ./bashrc run would not season your current soup.",
        {
          boxes: [
            { label: "~/.bashrc", items: ["alias ll=", "PATH+=..."] },
            { label: "this shell", items: ["now seasoned"] },
          ],
        },
      ],
    ],
    pitfalls: [
      "source a random downloaded script — that script can do anything you can.",
      "./file vs source file is a real difference.",
    ],
    quiz: [
      q("source ~/.bashrc…", ["Deletes bash", "Reloads settings into this shell", "Formats home", "Starts top"], 1, "Reload."),
      q(". file vs source file?", ["Usually the same idea in bash", "Opposite", ". deletes file", "source is Windows only"], 0, "Dot builtin."),
      q("Why not ./myscript.sh for exports?", ["Child shell dies and takes variables with it", "./ is illegal", "source cannot export", "scripts cannot run"], 0, "Subshell."),
      q("source untrusted files?", ["Dangerous — they run as you", "Always safe", "They cannot use rm", "They only print"], 0, "Trust."),
      q("After alias in .bashrc, new terminals…", ["Usually load it; old ones need source or reopen", "Never see it", "Need reboot of BIOS", "Need ping"], 0, "Existing sessions."),
    ],
  }),
  cmd({
    id: "glob",
    name: "* glob",
    tab: "shell",
    difficulty: "advanced",
    metaphor: "* is a handful of magnets that grab every matching name on the fridge.",
    explanation:
      "The shell expands globs before the command runs. *.txt becomes notes.txt todo.txt. ? is one character. Quoting '*' makes a literal star. This is why echo * lists files and why rm * is famous and awful.",
    danger: true,
    examples: [
      ["echo *.txt", "What would match.", "notes.txt todo.txt"],
      ["ls Photos/*.jpg", "Pictures only.", "cat.jpg sunset.png"],
    ],
    animationKind: "search",
    steps: [
      [
        "echo *.txt",
        "notes.txt todo.txt",
        "The magnets picked every .txt label. echo showed the expansion — safer than starting with rm *.",
        {
          items: [
            { name: "notes.txt", match: true },
            { name: "todo.txt", match: true },
            { name: "cat.jpg", match: false },
          ],
        },
      ],
    ],
    pitfalls: [
      "rm * in the wrong folder is a disaster — never ‘test’ that.",
      "If nothing matches, some shells pass the literal *.",
    ],
    quiz: [
      q("*.txt means…", ["A regex in grep always", "Shell glob: names ending in .txt", "A user", "PID"], 1, "Glob."),
      q("Who expands *?", ["The command always", "The shell, before the command runs", "The kernel scheduler", "systemd only"], 1, "Shell."),
      q("Safer way to see matches?", ["echo *.txt or ls", "rm * first", "chmod 777 *", "killall *"], 0, "Preview."),
      q("Quotes '*.txt'…", ["Often keep a literal star for the command (like find)", "Delete txt", "Are illegal", "Mean sudo"], 0, "Quote to not expand."),
      q("rm * is…", ["A gentle listing", "Dangerous in a real terminal", "Required daily", "the same as ls"], 1, "Don’t."),
    ],
  }),
  cmd({
    id: "and-or",
    name: "&& and ||",
    tab: "shell",
    difficulty: "advanced",
    metaphor: "&& is ‘do the next thing only if the first succeeded’. || is ‘only if it failed’ — a backup plan.",
    explanation:
      "mkdir d && cd d only walks in if the room was created. cmd || echo fail runs echo if cmd failed. Success is exit code 0. This is how one-liners avoid charging ahead after an error.",
    examples: [
      ["mkdir Projects && cd Projects", "Create then enter if OK.", "(now in Projects)"],
      ["false || echo 'plan B'", "Backup plan.", "plan B"],
    ],
    animationKind: "pipe",
    steps: [
      [
        "mkdir Projects && cd Projects",
        "",
        "The door was built, then you walked in. If mkdir had failed, cd would not run — that is the kindness of &&.",
        {
          boxes: [
            { label: "mkdir (ok)", items: ["Projects/"] },
            { label: "cd (runs)", items: ["/home/you/Projects"] },
          ],
        },
      ],
    ],
    pitfalls: [
      "&& is not a pipe. Pipes carry data; && carries yes/no success.",
      "A command can ‘succeed’ while still doing the wrong business — check what 0 means.",
    ],
    quiz: [
      q("A && B runs B when…", ["A failed", "A succeeded (exit 0)", "Always", "Never"], 1, "And."),
      q("A || B runs B when…", ["A succeeded", "A failed", "Always after A", "Only on Tuesdays"], 1, "Or backup."),
      q("Exit code 0 usually means…", ["Crash", "Success", "Need sudo always", "File not found"], 1, "Zero is OK."),
      q("| vs &&?", ["| data belt; && success gate", "Identical", "&& carries HTML", "| is only chmod"], 0, "Different."),
      q("mkdir x && cd x is safer than ; because…", ["cd won’t run if mkdir failed", "; is illegal", "&& formats x", "cd creates x"], 0, "Gate."),
    ],
  }),
  cmd({
    id: "bash-script",
    name: "A tiny script",
    tab: "shell",
    difficulty: "advanced",
    metaphor: "A script is a shopping list of commands the computer can reread tomorrow.",
    explanation:
      "First line #!/bin/bash is the shebang: which interpreter. chmod u+x hello.sh then ./hello.sh runs it. Start with echo and pwd. Scripts are just text files — cat them, less them, git them. You have the building blocks now.",
    examples: [
      ['echo \'#!/bin/bash\' > hello.sh', "Start the file.", "(shebang line)"],
      ["echo 'echo Hello, $USER' >> hello.sh", "Add a command.", "(second line)"],
      ["chmod u+x hello.sh && ./hello.sh", "Make runnable and run.", "Hello, you"],
    ],
    animationKind: "files",
    steps: [
      [
        "./hello.sh",
        "Hello, you",
        "The shopping list ran by itself. #! chose bash, +x was your execute key, ./ means ‘here, not PATH’.",
        {
          items: [{ name: "hello.sh", folder: "home", match: true }],
          message: "#!/bin/bash → Hello, you",
        },
      ],
    ],
    pitfalls: [
      "Forgetting +x leads to Permission denied.",
      "CRLF (Windows line endings) can break shebangs — use Linux/Unix line endings.",
    ],
    quiz: [
      q("Shebang #!/bin/bash…", ["A comment for humans only", "Picks the interpreter", "Deletes bash", "Is glob"], 1, "Interpreter."),
      q("./hello.sh means…", ["Run this file in this folder", "Always search PATH only", "source the kernel", "scp the file"], 0, "Explicit path."),
      q("Permission denied on ./script?", ["Often missing execute bit — chmod u+x", "Always a network error", "Need rm", "Need ping"], 0, "+x."),
      q("Scripts are…", ["Binary only", "Text lists of commands", "Always compiled in /", "The same as JPEG"], 1, "Text."),
      q("Why ./ if the file is here?", [". is not in PATH for safety", "Linux hates local files", "Shebang forbids it", "tar requires it"], 0, "PATH safety."),
    ],
  }),
];
