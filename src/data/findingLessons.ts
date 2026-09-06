import { cmd, q } from "./helpers";

export const findingLessons = [
  cmd({
    id: "find",
    name: "find",
    tab: "finding",
    difficulty: "intermediate",
    metaphor: "find is sending a search party through every room, opening every drawer.",
    explanation:
      "find starts at a folder and walks the tree. find . -name '*.txt' means: from here, names ending in .txt. It is powerful and can be slow on huge disks. Quote the pattern so the shell does not expand * too early.",
    flags: [
      ["-name 'pattern'", "Match a file name (quote it!)"],
      ["-type f", "Only files, not folders"],
      ["-type d", "Only directories"],
    ],
    examples: [
      ["find . -name '*.jpg'", "Pictures from here downward.", "./Photos/cat.jpg"],
      ["find Documents -type f", "Every file under Documents.", "./Documents/cv.pdf"],
    ],
    animationKind: "search",
    steps: [
      [
        "find . -name '*.txt'",
        "./notes.txt\n./Documents/todo.txt",
        "The search party lit up every .txt card. Quotes kept *.txt as a pattern, not ‘all files in this room’.",
        {
          items: [
            { name: "notes.txt", match: true },
            { name: "todo.txt", match: true },
            { name: "cat.jpg", match: false },
            { name: "song.mp3", match: false },
          ],
        },
      ],
    ],
    pitfalls: [
      "Unquoted * is expanded by the shell before find sees it.",
      "find / on a whole computer can take a long time and hit permission errors.",
    ],
    quiz: [
      q("find . starts…", ["At the disk of another country", "At the current folder", "At /Windows", "At hostname"], 1, "Dot = here."),
      q("Why quote '*.txt'?", ["Decoration", "So the shell does not expand * too soon", "find forbids quotes", "It deletes txt"], 1, "Quote patterns."),
      q("-type f means…", ["Folders only", "Regular files only", "Force delete", "Follow logs"], 1, "Files."),
      q("find is like locate?", ["find walks live; locate uses a pre-built index (may be stale)", "Identical always", "locate walks slower always", "find cannot use names"], 0, "Live vs index."),
      q("find Photos -name cat.jpg…", ["Searches under Photos for that name", "Deletes cat.jpg", "cds into it", "Chmods it"], 0, "Start path + test."),
    ],
  }),
  cmd({
    id: "grep",
    name: "grep",
    tab: "finding",
    difficulty: "intermediate",
    metaphor: "grep is a highlighter: it paints every line that contains your word.",
    explanation:
      "grep pattern file prints matching lines. grep -i ignores case. grep -r walks folders. Combine with pipes: ps | grep firefox. Special characters in patterns are ‘regex’ — start with plain words.",
    flags: [
      ["-i", "Ignore uppercase/lowercase"],
      ["-n", "Show line numbers"],
      ["-r", "Search inside a folder tree"],
      ["-v", "Invert: lines that do not match"],
    ],
    examples: [
      ["grep milk notes.txt", "Lines containing milk.", "Buy milk"],
      ["grep -i linux notes.txt", "Linux or LINUX or linux.", "Learn Linux"],
    ],
    animationKind: "search",
    steps: [
      [
        "grep milk shopping.txt",
        "Buy milk",
        "Only the milk line glowed. The eggs line stayed dim. That is grep.",
        {
          items: [
            { name: "Buy milk", match: true },
            { name: "Learn ls", match: false },
            { name: "Eggs x12", match: false },
          ],
        },
      ],
    ],
    pitfalls: [
      "grep looks at text; it will not magically search inside every photo.",
      "A pattern with [ or * is regex — quote it until you know regex.",
    ],
    quiz: [
      q("grep milk file…", ["Deletes milk", "Prints lines that contain milk", "Creates milk", "Moves the file"], 1, "Highlighter."),
      q("-i means…", ["Install", "Ignore case", "Inode only", "Interactive rm"], 1, "LINUX matches linux."),
      q("grep -v foo…", ["Only lines without foo", "Only foo", "Deletes foo", "Verbose copy"], 0, "Invert."),
      q("ps | grep nano means…", ["Search running-process text for nano", "Install nano", "Kill all processes", "Format /"], 0, "Pipe + highlighter."),
      q("grep is for pictures of cats?", ["Yes, it views JPEG", "No, it searches text lines", "Only with -r photos", "It is file(1)"], 1, "Text."),
    ],
  }),
  cmd({
    id: "locate",
    name: "locate",
    tab: "finding",
    difficulty: "intermediate",
    metaphor: "locate is looking up a name in a printed phone book instead of knocking on every door.",
    explanation:
      "locate uses a database (updated by updatedb, often daily). It is fast but can miss brand-new files until the database refreshes. Some systems need sudo updatedb or do not install locate by default (plocate/mlocate).",
    examples: [
      ["locate cat.jpg", "Fast name lookup.", "/home/you/Photos/cat.jpg"],
      ["sudo updatedb", "Refresh the phone book (admin).", "(rebuild index)"],
    ],
    animationKind: "search",
    steps: [
      [
        "locate cat.jpg",
        "/home/you/Photos/cat.jpg",
        "The phone book already knew. A file created one second ago might be missing until updatedb runs.",
        {
          items: [
            { name: "cat.jpg (indexed)", match: true },
            { name: "brand-new.txt (too fresh)", match: false },
          ],
        },
      ],
    ],
    pitfalls: [
      "Brand-new files can be invisible to locate.",
      "locate may be absent on minimal installs.",
    ],
    quiz: [
      q("locate is fast because…", ["It walks every disk live like find", "It consults a pre-built index", "It deletes files", "It uses ping"], 1, "Phone book."),
      q("A file created 2 seconds ago might be…", ["Always in locate", "Missing until the database updates", "Always a folder", "Root-only"], 1, "Stale index."),
      q("updatedb is…", ["A text editor", "The indexer for locate", "A network tool", "rm alias"], 1, "Rebuild book."),
      q("find vs locate for a file you just saved?", ["find is more up to date", "locate is always fresher", "Neither can see files", "Use hostname"], 0, "Live walk."),
      q("locate is installed everywhere?", ["Guaranteed", "Not always — some systems skip it", "Only on phones", "It replaces ls"], 1, "Optional package."),
    ],
  }),
  cmd({
    id: "which",
    name: "which",
    tab: "finding",
    difficulty: "intermediate",
    metaphor: "which is asking ‘when I type python, which program on the PATH actually runs?’",
    explanation:
      "which prints the path of an executable the shell would run. Useful when you have two versions installed. It is about programs, not your holiday photos.",
    examples: [
      ["which ls", "Where is the ls program?", "/usr/bin/ls"],
      ["which python3", "Which Python will run?", "/usr/bin/python3"],
    ],
    animationKind: "search",
    steps: [
      [
        "which ls",
        "/usr/bin/ls",
        "Not a document search — a ‘which tool from the toolbox?’ search.",
        {
          items: [
            { name: "/usr/bin/ls", match: true },
            { name: "notes.txt", match: false },
          ],
        },
      ],
    ],
    pitfalls: [
      "which does not find random data files; use find/locate for those.",
      "Shell aliases/functions may not show the same as which (type is wiser).",
    ],
    quiz: [
      q("which ls shows…", ["All .ls files in Photos", "The ls program’s path", "Hidden files", "Disk free space"], 1, "Executable path."),
      q("which is for holiday photos?", ["Yes", "No — it is for programs on PATH", "Only jpg", "Only with -r"], 1, "Programs."),
      q("Two python installs: which helps you…", ["See which one runs", "Delete Linux", "chmod both", "Ping both"], 0, "Disambiguate."),
      q("If which says not found…", ["The program is not on PATH (or not installed)", "The disk melted", "You must use Windows", "pwd is broken"], 0, "PATH/install."),
      q("type vs which?", ["type also explains aliases; which is a simple path", "which explains aliases better always", "Identical by law", "type deletes PATH"], 0, "type is richer."),
    ],
  }),
  cmd({
    id: "whereis",
    name: "whereis",
    tab: "finding",
    difficulty: "intermediate",
    metaphor: "whereis is a librarian pointing at the book, the manual, and the source piles for one program.",
    explanation:
      "whereis ls may show the binary, the man page, and sometimes source paths. It is a quick ‘where does this program live?’ not a full-disk search.",
    examples: [
      ["whereis ls", "Binary and man page locations.", "ls: /usr/bin/ls /usr/share/man/man1/ls.1.gz"],
      ["whereis python3", "Find Python pieces.", "python3: /usr/bin/python3 ..."],
    ],
    animationKind: "search",
    steps: [
      [
        "whereis ls",
        "ls: /usr/bin/ls /usr/share/man/man1/ls.1.gz",
        "Toolbox and handbook in one answer. Still not a search for cat.jpg.",
        {
          items: [
            { name: "/usr/bin/ls", match: true },
            { name: "man ls", match: true },
            { name: "cat.jpg", match: false },
          ],
        },
      ],
    ],
    pitfalls: [
      "whereis is not find. It uses a small set of usual directories.",
      "Empty answers can mean the program is not in standard places.",
    ],
    quiz: [
      q("whereis often shows…", ["Only photos", "Program + man page paths", "Wi-Fi keys", "All txt files"], 1, "Binary and docs."),
      q("whereis vs find / -name ls?", ["whereis is a shallow standard lookup; find walks", "find is always worse", "whereis walks the whole disk", "They delete ls"], 0, "Scope."),
      q("whereis cat.jpg is the right tool?", ["Usually no — that is a data file", "Yes, always", "It opens JPEG", "It is grep"], 0, "Programs."),
      q("A man path in whereis means…", ["You can likely man that command", "The command is illegal", "rm is required", "It is a folder named man only"], 0, "Handbook lives there."),
      q("which vs whereis?", ["which: what will run; whereis: extra related files", "whereis only aliases", "which shows man always", "Identical"], 0, "Run vs related paths."),
    ],
  }),
  cmd({
    id: "type",
    name: "type",
    tab: "finding",
    difficulty: "intermediate",
    metaphor: "type is asking the waiter: ‘when I say ls, is that a real dish, a nickname, or a house special?’",
    explanation:
      "type ls tells you whether the name is a shell builtin, an alias, a function, or an external program. This solves ‘why is my command behaving weird?’ faster than which.",
    examples: [
      ["type ls", "What is ls in this shell?", "ls is /usr/bin/ls"],
      ["type cd", "cd is often a builtin.", "cd is a shell builtin"],
      ["type echo", "Might be builtin.", "echo is a shell builtin"],
    ],
    animationKind: "search",
    steps: [
      [
        "type cd",
        "cd is a shell builtin",
        "cd is not a separate app you which — the shell itself knows how to walk rooms.",
        {
          items: [
            { name: "cd (builtin)", match: true },
            { name: "/usr/bin/ls (program)", match: false },
          ],
        },
      ],
    ],
    pitfalls: [
      "Aliases can shadow real programs — type reveals that.",
      "Output differs between bash, zsh, and others.",
    ],
    quiz: [
      q("type tells you…", ["The weather", "What kind of command a name is", "Disk size", "Users"], 1, "Builtin/alias/program."),
      q("cd is often…", ["A JPEG", "A shell builtin", "A user named cd", "A hostname"], 1, "Built into the shell."),
      q("If type says alias ls='ls --color'…", ["ls is nicknamed to add color", "ls is deleted", "You must rm ls", "PATH is empty"], 0, "Shadow/nickname."),
      q("type vs which for builtins?", ["type can explain builtins; which may miss them", "which is always better", "type cannot run in bash", "They format /"], 0, "Builtins."),
      q("Weird command behavior? First try…", ["rm -rf /", "type commandname", "unplug", "date +%F only"], 1, "See what you are really calling."),
    ],
  }),
];
