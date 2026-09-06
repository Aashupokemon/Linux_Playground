import { cmd, q } from "./helpers";

const home = {
  cwd: "/home/you",
  rooms: ["Documents", "Photos", "Music"],
  files: ["notes.txt"],
};

export const gettingStarted = [
  cmd({
    id: "what-is-linux",
    name: "What is Linux?",
    tab: "getting-started",
    difficulty: "intro",
    metaphor:
      "Linux is the kitchen staff of a restaurant: you never have to see them, but they cook every meal the computer serves.",
    explanation:
      "Linux is an operating system — the host that lets programs, files, and hardware work together. Phones (Android), supercomputers, and many laptops use it. You talk to it with a terminal: a text window where you type short commands instead of clicking icons. This playground simulates that window so you can learn safely.",
    examples: [
      [
        "(open a terminal)",
        "On many computers this is called Terminal, Konsole, or tty.",
        "you@computer:~$",
      ],
      [
        "whoami",
        "The computer answers with your username — proof someone is listening.",
        "you",
      ],
    ],
    animationKind: "intro",
    steps: [
      [
        "whoami",
        "you",
        "The computer knows your name. The blinking box is waiting for the next sentence.",
        { message: "Hello. I am Linux. Type a command and press Enter.", cwd: "/home/you" },
      ],
    ],
    pitfalls: [
      "Linux is not one brand of laptop. It is the software underneath many brands.",
      "Commands are case-sensitive: Whoami is not the same as whoami.",
    ],
    quiz: [
      q("What is Linux?", ["A web browser", "An operating system (the computer’s host software)", "A type of keyboard", "Only a video game"], 1, "Linux runs the computer so other programs can work."),
      q("How do you talk to Linux in this course?", ["Only by drawing pictures", "By typing short commands in a terminal", "By mailing a letter", "By shouting at the screen"], 1, "The terminal is a text conversation with the computer."),
      q("Why are commands case-sensitive?", ["Linux ignores letters", "Uppercase and lowercase are different words to Linux", "You must always use CAPS LOCK", "Spaces are forbidden"], 1, "whoami and Whoami are not the same command."),
      q("Android phones are related to Linux because…", ["They use a Linux-based system underneath", "They cannot install apps", "They have no files", "Linux is only for phones"], 0, "Android is built on the Linux kernel."),
      q("This playground runs real rm -rf / on your PC?", ["Yes, always", "No — demos are simulated and safe", "Only on Fridays", "Only if you blink"], 1, "Nothing here executes on your real machine."),
    ],
  }),
  cmd({
    id: "pwd",
    name: "pwd",
    tab: "getting-started",
    difficulty: "intro",
    metaphor: "pwd is asking “which room am I standing in?”",
    explanation:
      "pwd means print working directory. A directory is just a folder. Linux always has a current folder — the room you are in. pwd writes that folder’s full address on the screen, starting from the root of the house (/).",
    flags: [["(none needed)", "pwd is usually used alone"]],
    examples: [
      ["pwd", "Show the folder you are in right now.", "/home/you"],
      ["pwd", "After you walk into Photos, the address changes.", "/home/you/Photos"],
    ],
    animationKind: "walk",
    steps: [
      ["pwd", "/home/you", "You are in your home room. The path is the street address of this folder.", home],
    ],
    pitfalls: [
      "pwd does not list files — it only tells you where you are.",
      "The first slash / is the very top of the folder tree, not a typo.",
    ],
    quiz: [
      q("pwd stands for…", ["please wait, dude", "print working directory", "put weird data", "password wizard"], 1, "It prints the folder you are standing in."),
      q("A directory is…", ["A phone number", "Another word for a folder", "A virus", "A keyboard key"], 1, "Directory = folder."),
      q("If pwd shows /home/you/Photos, you are in…", ["The Photos folder inside your home", "The root of the internet", "A deleted file", "Music"], 0, "Read the path from left to right: home → you → Photos."),
      q("Does pwd list the files in the folder?", ["Yes, always", "No, it only prints the path", "Only on Tuesdays", "Only hidden files"], 1, "Use ls to list files."),
      q("The starting / in a path means…", ["A comment", "The top of the filesystem (the whole house)", "Home of another user", "A search"], 1, "Paths starting with / are absolute addresses."),
    ],
  }),
  cmd({
    id: "whoami",
    name: "whoami",
    tab: "getting-started",
    difficulty: "intro",
    metaphor: "whoami is glancing at the name tag on your shirt.",
    explanation:
      "whoami prints the username you are logged in as. Linux can have several people (accounts). Your username decides which files you own and what you are allowed to change.",
    examples: [
      ["whoami", "Print your login name.", "you"],
      ["id", "A related command that also shows user numbers and groups.", "uid=1000(you) gid=1000(you)"],
    ],
    animationKind: "intro",
    steps: [
      ["whoami", "you", "The nametag says you. Later, sudo will mean borrowing the manager’s badge for one job.", { message: "Logged in as: you", cwd: "/home/you" }],
    ],
    pitfalls: [
      "whoami is your account name, not always your real-world full name.",
      "The superuser account is often called root — that is the building manager.",
    ],
    quiz: [
      q("whoami shows…", ["The weather", "Your login username", "All files", "The Wi-Fi password"], 1, "It prints the account you are using."),
      q("Why does Linux care who you are?", ["For wallpaper color", "Permissions: whose files you may change", "To play music", "It does not"], 1, "Accounts protect other people’s files."),
      q("The powerful admin account is often named…", ["guest", "root", "windows", "mouse"], 1, "root is the superuser."),
      q("whoami and pwd are the same?", ["Yes", "No — whoami is who, pwd is where", "Only on Linux phones", "Only with sudo"], 1, "Who vs where."),
      q("If the screen prints sam after whoami, you are…", ["User sam", "In the sam folder always", "Offline", "Root forever"], 0, "The output is the username."),
    ],
  }),
  cmd({
    id: "hostname",
    name: "hostname",
    tab: "getting-started",
    difficulty: "intro",
    metaphor: "hostname is the computer’s own nickname on the nametag of the building.",
    explanation:
      "hostname prints the machine’s name on the network. Your user is whoami; the box itself is hostname. Helpful when you jump between several computers with ssh.",
    examples: [
      ["hostname", "Show this computer’s name.", "kitchen-laptop"],
      ["hostnamectl", "On many Linux desktops, a fancier cousin that also shows the OS.", "Static hostname: kitchen-laptop"],
    ],
    animationKind: "intro",
    steps: [
      ["hostname", "kitchen-laptop", "This machine introduced itself. You are you@kitchen-laptop.", { message: "This computer is named kitchen-laptop", cwd: "/home/you" }],
    ],
    pitfalls: [
      "Changing a hostname permanently is a settings job, not something beginners need.",
      "hostname is the computer, whoami is the person.",
    ],
    quiz: [
      q("hostname names…", ["A file", "The computer (the machine)", "A printer only", "Your password"], 1, "It is the machine’s nickname."),
      q("you@kitchen-laptop means…", ["User you on computer kitchen-laptop", "A website", "An error", "A folder named @"], 0, "user@machine is a common prompt."),
      q("whoami vs hostname?", ["Same thing", "whoami = person, hostname = computer", "Both list files", "Both delete files"], 1, "Person vs machine."),
      q("Why learn hostname before ssh?", ["So you know which remote box you landed on", "It installs games", "It formats disks", "It is required to type"], 0, "Remote login shows a hostname."),
      q("hostname always equals your username?", ["Yes", "No, they are independent names", "Only on Fridays", "Only for root"], 1, "You can be you on kitchen-laptop."),
    ],
  }),
  cmd({
    id: "date",
    name: "date",
    tab: "getting-started",
    difficulty: "intro",
    metaphor: "date is looking at the clock on the kitchen wall.",
    explanation:
      "date prints the current date and time according to the computer. Linux uses this clock for logs, scheduled jobs, and file timestamps. You can also ask for a custom layout with a format string.",
    flags: [["+%F", "Date only, like 2026-08-22"], ["+%H:%M", "Hours and minutes"]],
    examples: [
      ["date", "Show the full local date and time.", "Sat Aug 22 01:40:00 IST 2026"],
      ["date +%F", "Show just the calendar date.", "2026-08-22"],
    ],
    animationKind: "intro",
    steps: [
      ["date", "Sat Aug 22 01:40:00 IST 2026", "The wall clock spoke. Computers timestamp almost everything they do.", { message: "Wall clock: Sat Aug 22 01:40:00 IST 2026" }],
    ],
    pitfalls: [
      "date does not change the clock unless you are an administrator with special flags.",
      "Timezones can make two computers disagree by hours — that is normal.",
    ],
    quiz: [
      q("date prints…", ["A fruit list", "The computer’s current date and time", "Your birthday always", "Disk size"], 1, "It reads the system clock."),
      q("date +%F is useful because…", ["It formats a short calendar date", "It deletes files", "It hides the clock", "It is a username"], 0, "Format strings start with +."),
      q("Do beginners need to change the clock with date?", ["Yes, every hour", "Usually no — viewing is enough", "Yes, or Linux stops", "Only with cat"], 1, "Changing time is an admin task."),
      q("File timestamps use…", ["The system clock date knows about", "A random number", "Your hair color", "The hostname only"], 0, "ls -l times come from the clock."),
      q("IST in the sample output is…", ["A file type", "A timezone label", "A command", "An error"], 1, "Timezones appear in date’s default output."),
    ],
  }),
  cmd({
    id: "clear",
    name: "clear",
    tab: "getting-started",
    difficulty: "intro",
    metaphor: "clear is wiping the chalkboard so you can think again.",
    explanation:
      "clear erases the visible terminal text. Your command history is still there — you only cleaned the glass. Ctrl+L often does the same thing.",
    examples: [
      ["clear", "Blank the screen.", "(the terminal looks empty, prompt remains)"],
      ["Ctrl+L", "Keyboard shortcut many terminals accept.", "(screen clears)"],
    ],
    animationKind: "intro",
    steps: [
      ["clear", "", "The chalkboard is blank. History is not deleted — only the view.", { message: "Screen wiped. Prompt still waiting." }],
    ],
    pitfalls: [
      "clear does not undo commands or delete files.",
      "You can still scroll up in many terminals to see old output.",
    ],
    quiz: [
      q("clear does what?", ["Deletes your home folder", "Cleans the visible terminal screen", "Logs you out", "Shuts down"], 1, "It is a visual tidy-up."),
      q("After clear, history is…", ["Gone forever", "Still saved — you only wiped the view", "Moved to Photos", "Printed on paper"], 1, "Use the history command later."),
      q("A common shortcut for clear is…", ["Ctrl+C", "Ctrl+L", "Alt+F4", "Shift+Space"], 1, "Ctrl+L redraws a blank screen."),
      q("clear is dangerous?", ["Extremely", "No, it does not change files", "It formats disks", "It emails root"], 1, "Safe tidy-up."),
      q("The prompt after clear…", ["Disappears forever", "Still waits for a command", "Turns into Windows", "Becomes pwd"], 1, "you@computer:~$ remains."),
    ],
  }),
  cmd({
    id: "history",
    name: "history",
    tab: "getting-started",
    difficulty: "intro",
    metaphor: "history is a diary of every sentence you already typed.",
    explanation:
      "history lists recent commands. Up-arrow recalls the last one so you can edit and rerun it. This saves typing and helps you remember how you solved something yesterday.",
    flags: [["(number)", "Some shells let you rerun with !number — learn that later"]],
    examples: [
      ["history", "Show numbered past commands.", "  1  pwd\\n  2  ls\\n  3  date"],
      ["Up arrow", "Recall the previous command without typing it.", "date"],
    ],
    animationKind: "intro",
    steps: [
      ["history", "  1  pwd\n  2  whoami\n  3  date", "The diary lists what you already said. The up-arrow is a time machine for typing.", { message: "Diary: pwd → whoami → date" }],
    ],
    pitfalls: [
      "History can contain passwords if you typed them on the command line — avoid that habit.",
      "Different terminals/users have different history files.",
    ],
    quiz: [
      q("history shows…", ["Future commands", "Commands you already ran", "Only errors", "Only pictures"], 1, "It is a diary of the shell."),
      q("Up-arrow is useful because…", ["It shuts down", "It recalls a previous command", "It deletes history", "It opens Firefox"], 1, "Edit and rerun quickly."),
      q("Should you type passwords as commands?", ["Yes", "No — they may sit in history", "Only in CAPS", "Only with echo"], 1, "History can leak secrets."),
      q("history deletes old files?", ["Yes", "No", "Only mp3s", "Only in /tmp"], 1, "It only lists commands."),
      q("If history shows 3 date, that means…", ["date was the third remembered command", "The time is 3", "Three users exist", "pwd failed"], 0, "Numbers index the diary."),
    ],
  }),
  cmd({
    id: "man",
    name: "man",
    tab: "getting-started",
    difficulty: "intro",
    metaphor: "man is the thick paper manual that lives inside the computer.",
    explanation:
      "man opens the official handbook for a command. Press q to quit the viewer. You do not memorize every flag — you look them up. If man is missing on a tiny system, try command --help.",
    examples: [
      ["man ls", "Open the handbook for ls.", "(a scrollable manual page)"],
      ["q", "Quit the manual and return to the prompt.", "you@computer:~$"],
    ],
    animationKind: "intro",
    steps: [
      ["man pwd", "PWD(1)  User commands\n\npwd — print name of current directory\n\nPress q to quit.", "The handbook opened. q is the door back to the prompt.", { message: "Manual: pwd — print working directory  (press q)" }],
    ],
    pitfalls: [
      "Beginners freeze in man because they forget q quits.",
      "man pages are dense; skim EXAMPLES if the page has that section.",
    ],
    quiz: [
      q("man ls means…", ["Delete ls", "Open the manual for ls", "Rename ls", "Install Linux"], 1, "man = manual."),
      q("How do you leave a man page?", ["Type exit twice", "Press q", "Unplug the PC", "Type man again"], 1, "q quits the viewer."),
      q("You must memorize every flag?", ["Yes", "No — look them up with man or --help", "Only 400 flags", "Only on Mondays"], 1, "Professionals look things up constantly."),
      q("man is a person?", ["Yes, a sysadmin named Man", "No, it is short for manual", "Only in movies", "It means mandatory"], 1, "manual pages."),
      q("If man is missing, try…", ["throwing the laptop", "ls --help or the command’s --help", "whoami forever", "date +%F only"], 1, "--help is the pocket card."),
    ],
  }),
  cmd({
    id: "help-flag",
    name: "--help",
    tab: "getting-started",
    difficulty: "intro",
    metaphor: "--help is a pocket cheat-sheet taped to the tool itself.",
    explanation:
      "Most commands accept --help (and often -h). They print a short usage summary and exit. It is faster than man when you only need a reminder of the flags.",
    examples: [
      ["ls --help", "Pocket card for ls.", "Usage: ls [OPTION]... [FILE]..."],
      ["mkdir --help", "How to make folders, in brief.", "Usage: mkdir [OPTION]... DIRECTORY..."],
    ],
    animationKind: "intro",
    steps: [
      ["ls --help", "Usage: ls [OPTION]... [FILE]...\nList information about files.\n  -l  use a long listing format", "The tool handed you its own cheat-sheet.", { message: "Cheat-sheet: ls --help → flags like -l" }],
    ],
    pitfalls: [
      "A few old commands use -h for something else (like human-readable sizes). Then try --help.",
      "Help text can still look cryptic — pair it with this course’s metaphors.",
    ],
    quiz: [
      q("--help usually…", ["Deletes the command", "Prints a short usage guide", "Hides the terminal", "Creates a user"], 1, "It is the pocket manual."),
      q("man vs --help?", ["Same length always", "man is the book, --help is the cheat-sheet", "help is slower", "man cannot quit"], 1, "Use both."),
      q("If -h does something else, try…", ["--help", "whoami", "rm -rf", "clear"], 0, "Long option --help is clearer."),
      q("ls --help lists files in the folder?", ["That is its main job", "No, it explains ls instead of listing your files", "It formats the disk", "It opens Photos"], 1, "Help mode documents the tool."),
      q("Flags like -l are…", ["Optional switches that change behavior", "Usernames", "Folders", "Viruses"], 0, "Options tweak the command."),
    ],
  }),
  cmd({
    id: "echo",
    name: "echo",
    tab: "getting-started",
    difficulty: "intro",
    metaphor: "echo is a parrot: it repeats the words you give it.",
    explanation:
      "echo prints text back. It seems silly until you use it to write a line into a file or to see what a variable contains. Quotes keep spaces together as one message.",
    flags: [["-n", "Do not add a newline at the end"]],
    examples: [
      ["echo hello", "Parrot the word hello.", "hello"],
      ['echo "Hello, Linux"', "Quotes keep the whole sentence together.", "Hello, Linux"],
    ],
    animationKind: "intro",
    steps: [
      ['echo "Hello, Linux"', "Hello, Linux", "The parrot spoke your sentence. Later you will echo words into files with >.", { message: "Parrot says: Hello, Linux" }],
    ],
    pitfalls: [
      "Without quotes, * and other symbols can mean ‘all files’ — quotes make echo safer.",
      "echo is not a conversation with a person; it only prints text.",
    ],
    quiz: [
      q("echo hello prints…", ["goodbye", "hello", "your password", "nothing ever"], 1, "It repeats arguments."),
      q("Why use quotes with echo?", ["To keep a sentence as one message", "To delete files", "To become root", "Quotes are illegal"], 0, "Spaces and special characters stay literal."),
      q("echo is mainly for…", ["Printing text (and later writing files)", "Drawing maps", "Video calls", "Formatting disks"], 0, "A tiny printer."),
      q("echo -n means…", ["Never echo", "Skip the extra newline", "Scream", "Numbers only"], 1, "-n = no newline."),
      q("echo * without quotes might…", ["Print all file names in the folder", "Always print a star", "Crash Linux forever", "Open man"], 0, "The shell expands * before echo runs."),
    ],
  }),
];
