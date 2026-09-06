import { cmd, q } from "./helpers";

const house = {
  cwd: "/home/you",
  rooms: ["Documents", "Photos", "Music"],
  files: ["notes.txt", "todo.txt"],
};

export const movingAround = [
  cmd({
    id: "ls",
    name: "ls",
    tab: "moving-around",
    difficulty: "beginner",
    metaphor: "ls is switching on the light and looking at what is in the room.",
    explanation:
      "ls lists the names of files and folders in the current directory. It does not open them; it just lets you see the labels. Add a path to peek into another room without walking there.",
    flags: [
      ["-a", "Show hidden items (names starting with a dot)"],
      ["-l", "Long view: size, date, permissions (see the ls -l lesson)"],
    ],
    examples: [
      ["ls", "List this folder.", "Documents  Music  Photos  notes.txt"],
      ["ls Photos", "List inside Photos without cd.", "cat.jpg  sunset.png"],
    ],
    animationKind: "walk",
    steps: [
      ["ls", "Documents  Music  Photos  notes.txt  todo.txt", "The light came on. Folders and files are just labels on boxes.", house],
    ],
    pitfalls: [
      "ls does not tell you where you are — pair it with pwd when lost.",
      "Hidden files (like .bashrc) stay invisible until you use ls -a.",
    ],
    quiz: [
      q("ls means…", ["lose stuff", "list files and folders", "log out", "long sleep"], 1, "List the room."),
      q("Does ls open cat.jpg?", ["Yes", "No, it only shows names", "It prints the photo in color", "It emails it"], 1, "Listing ≠ opening."),
      q("ls Photos does what?", ["Deletes Photos", "Lists inside Photos without moving you", "Renames Photos", "Creates Photos"], 1, "You can peek with a path."),
      q("Hidden files start with…", ["!", "A dot (.)", "#", "space"], 1, "ls -a reveals them."),
      q("If ls shows nothing, the folder is…", ["Always broken", "Empty (or only hidden files)", "Not Linux", "A network"], 1, "Empty rooms exist."),
    ],
  }),
  cmd({
    id: "ls-l",
    name: "ls -l",
    tab: "moving-around",
    difficulty: "beginner",
    metaphor: "ls -l is reading the museum label under each object: size, date, and who may touch it.",
    explanation:
      "The long listing adds details: permissions, owner, size, and last-changed time. The first character is d for a folder (directory) or - for a regular file. You do not need to decode every letter yet — just notice folders vs files and dates.",
    flags: [
      ["-h", "Human-readable sizes (K, M) when combined like ls -lh"],
      ["-l", "Long format"],
    ],
    examples: [
      ["ls -l", "Detailed list.", "-rw-r--r-- 1 you you 120 Aug 22 01:00 notes.txt"],
      ["ls -lh", "Sizes that look like 4.0K instead of 4096.", "-rw-r--r-- 1 you you 4.0K Aug 22 notes.txt"],
    ],
    animationKind: "walk",
    steps: [
      [
        "ls -l",
        "drwxr-xr-x 2 you you 4096 Aug 21  Documents\n-rw-r--r-- 1 you you  120 Aug 22  notes.txt",
        "d means folder, - means file. The rest is the museum label.",
        { ...house, highlight: ["notes.txt", "Documents"] },
      ],
    ],
    pitfalls: [
      "The first column is permissions, not a decoration. You will learn chmod later.",
      "Size of a directory in ls -l is not ‘how much stuff is inside’ — use du for that.",
    ],
    quiz: [
      q("In ls -l, a line starting with d is…", ["Deleted", "A directory (folder)", "A danger flag", "A driver"], 1, "d = directory."),
      q("A line starting with - is…", ["A minus command", "A regular file", "Hidden always", "A pipe"], 1, "- = file."),
      q("ls -lh is nicer because…", ["It hides files", "Sizes are easier for humans (K, M)", "It is faster always", "It skips folders"], 1, "h ≈ human."),
      q("Does ls -l move you to another folder?", ["Yes", "No", "Only with d", "Only as root"], 1, "It still only lists."),
      q("Owner in the sample is…", ["Aug 22", "you", "4096", "rwx"], 1, "The username column."),
    ],
  }),
  cmd({
    id: "cd",
    name: "cd",
    tab: "moving-around",
    difficulty: "beginner",
    metaphor: "cd is walking through a doorway into another room.",
    explanation:
      "cd means change directory. After cd Photos you are inside Photos; pwd will prove it. Tab-complete names to avoid typos. If Linux says No such file or directory, check spelling and ls first.",
    examples: [
      ["cd Photos", "Walk into Photos.", "(no output — success is quiet)"],
      ["pwd", "Confirm the new room.", "/home/you/Photos"],
    ],
    animationKind: "walk",
    steps: [
      ["pwd", "/home/you", "Before walking, note the room.", house],
      [
        "cd Photos",
        "",
        "You stepped into Photos. Quiet success: Linux often says nothing when a move worked.",
        { cwd: "/home/you/Photos", rooms: [".. (back)"], files: ["cat.jpg", "sunset.png"] },
      ],
      ["pwd", "/home/you/Photos", "The address on the wall changed.", { cwd: "/home/you/Photos", rooms: [".. (back)"], files: ["cat.jpg", "sunset.png"] }],
    ],
    pitfalls: [
      "cd into a file fails — you can only enter folders.",
      "Names with spaces need quotes: cd \"My Photos\".",
    ],
    quiz: [
      q("cd stands for…", ["copy data", "change directory", "create desktop", "close disk"], 1, "Change directory = walk."),
      q("A successful cd usually prints…", ["DONE", "Nothing (quiet success)", "All file contents", "The kernel version"], 1, "No news is good news."),
      q("You confirm the move with…", ["whoami", "pwd", "date", "clear"], 1, "pwd is the nametag of the room."),
      q("cd notes.txt if notes.txt is a file…", ["Opens it in paint", "Fails — not a folder", "Deletes it", "Always works"], 1, "Only directories."),
      q("cd \"My Photos\" needs quotes because…", ["Spaces would split the name into two words", "Quotes delete spaces", "Linux hates photos", "Quotes mean sudo"], 0, "The shell splits on spaces."),
    ],
  }),
  cmd({
    id: "cd-up",
    name: "cd ..",
    tab: "moving-around",
    difficulty: "beginner",
    metaphor: "cd .. is walking back out of the room into the hallway you came from.",
    explanation:
      "Every folder except the very top has a parent. .. means ‘the folder above this one’. One cd .. per level. You can chain: cd ../.. goes up twice.",
    examples: [
      ["cd ..", "Go up one folder.", "(quiet success)"],
      ["cd ../..", "Go up two folders.", "(quiet success)"],
    ],
    animationKind: "walk",
    steps: [
      [
        "pwd",
        "/home/you/Photos",
        "You start inside Photos.",
        { cwd: "/home/you/Photos", rooms: [".. (back)"], files: ["cat.jpg"] },
      ],
      [
        "cd ..",
        "",
        "Back in the hallway: /home/you. .. is not a weird name — it is a shortcut for ‘parent’.",
        house,
      ],
      ["pwd", "/home/you", "Address updated.", house],
    ],
    pitfalls: [
      "cd .. from / does nothing useful — you are already at the roof.",
      "Do not confuse .. with hidden files like .bashrc (single dot names).",
    ],
    quiz: [
      q(".. means…", ["This folder", "The parent folder (one level up)", "Home always", "Delete"], 1, "Parent shortcut."),
      q("cd .. from /home/you/Photos lands in…", ["/home/you", "/Photos", "/", "/home/you/Photos/cat.jpg"], 0, "Strip the last part."),
      q(". vs .. ?", [". is now, .. is parent", "They are identical", ". deletes files", ".. is hostname"], 0, "Single dot = current folder."),
      q("cd ../.. from /a/b/c goes to…", ["/a", "/a/b", "/a/b/c", "/"], 0, "Up twice: c→b→a."),
      q("Is .. a real folder you created?", ["You must mkdir .. first", "Linux provides .. in every folder", "Only in Photos", "Only for root"], 1, "Built-in parent link."),
    ],
  }),
  cmd({
    id: "cd-home",
    name: "cd ~",
    tab: "moving-around",
    difficulty: "beginner",
    metaphor: "cd ~ (or just cd) is teleporting home, no matter which hallway you were lost in.",
    explanation:
      "Your home directory is your apartment: /home/you on many systems. ~ is a nickname for that apartment. A bare cd with no path also returns home. This is the safest ‘I’m lost’ button.",
    examples: [
      ["cd", "Go home with no arguments.", "(now in /home/you)"],
      ["cd ~", "Same idea using the tilde nickname.", "(now in /home/you)"],
      ["cd ~/Photos", "Home, then into Photos.", "/home/you/Photos"],
    ],
    animationKind: "walk",
    steps: [
      [
        "pwd",
        "/etc",
        "You wandered into a system hallway.",
        { cwd: "/etc", rooms: ["network"], files: ["hosts"] },
      ],
      ["cd ~", "", "Teleport home. ~ always means your apartment, not someone else’s.", house],
      ["pwd", "/home/you", "Safe on the couch again.", house],
    ],
    pitfalls: [
      "~ is your home, ~root would be root’s home — don’t wander there as a beginner.",
      "If you type the wrong username after ~ you may hit ‘no such file’.",
    ],
    quiz: [
      q("~ means…", ["Random folder", "Your home directory", "The root of the disk always", "A pipe"], 1, "Tilde = home."),
      q("Plain cd with no path…", ["Deletes home", "Goes to your home folder", "Lists files", "Opens man"], 1, "The I’m-lost button."),
      q("cd ~/Photos is…", ["Photos on another planet", "Photos inside your home", "Always /Photos", "A hostname"], 1, "~ expands first."),
      q("You are lost in /var/log. Fastest home is…", ["cd .. many times", "cd or cd ~", "rm -rf /", "whoami"], 1, "Teleport."),
      q("Home is usually…", ["/home/your-username", "/etc", "/Windows", "/tmp only"], 0, "Classic layout."),
    ],
  }),
  cmd({
    id: "tree",
    name: "tree",
    tab: "moving-around",
    difficulty: "beginner",
    metaphor: "tree is a family-tree drawing of folders nested inside folders.",
    explanation:
      "tree prints a map of the directory instead of a flat list. It may need installing (sudo apt install tree) on some systems. If it is missing, ls -R recursively lists names without the pretty branches.",
    flags: [["-L 2", "Only two levels deep so the map stays readable"]],
    examples: [
      ["tree -L 1", "One level of branches.", ".\n├── Documents\n├── Music\n└── Photos"],
      ["ls -R", "Fallback recursive list if tree is not installed.", "./Photos:\ncat.jpg"],
    ],
    animationKind: "walk",
    steps: [
      [
        "tree -L 1",
        ".\n├── Documents\n├── Music\n├── Photos\n├── notes.txt\n└── todo.txt",
        "A map, not a mystery. Limit depth with -L so the tree does not swallow the screen.",
        house,
      ],
    ],
    pitfalls: [
      "tree is not always installed by default.",
      "Huge folders make enormous trees — use -L or pick a smaller starting path.",
    ],
    quiz: [
      q("tree shows…", ["Only photos of plants", "Nested folders as a map", "The date", "Users"], 1, "A visual hierarchy."),
      q("-L 2 means…", ["Two computers", "Only two folder levels deep", "Two users", "Delete two files"], 1, "Limit depth."),
      q("If tree is missing you can…", ["Never list files again", "Use ls -R or install tree", "Only use Windows", "Use ping"], 1, "Optional tool."),
      q("tree vs ls?", ["tree shows nesting; ls is a flat list", "They are identical", "ls draws branches", "tree deletes files"], 0, "Map vs list."),
      q("Running tree on / without limits is…", ["A tiny one-line map", "Often huge and slow", "Forbidden always", "The same as pwd"], 1, "Start small."),
    ],
  }),
  cmd({
    id: "file",
    name: "file",
    tab: "moving-around",
    difficulty: "beginner",
    metaphor: "file is a librarian who peeks inside a box and says ‘this is a picture, not a song’.",
    explanation:
      "Names lie: holiday.mp3 might not be music. file looks at the contents and guesses the type. Useful before you open mystery downloads.",
    examples: [
      ["file cat.jpg", "What kind of thing is this?", "cat.jpg: JPEG image data"],
      ["file notes.txt", "Plain text vs binary.", "notes.txt: ASCII text"],
    ],
    animationKind: "walk",
    steps: [
      [
        "file cat.jpg",
        "cat.jpg: JPEG image data",
        "The librarian peeked: it really is a picture, even if someone renamed it.",
        { cwd: "/home/you/Photos", files: ["cat.jpg", "secret.bin"], highlight: ["cat.jpg"] },
      ],
    ],
    pitfalls: [
      "file is a guess based on content, not a security scanner.",
      "A wrong extension does not change what the bytes actually are.",
    ],
    quiz: [
      q("file cat.jpg tells you…", ["To delete it", "What type of data it likely is", "The hostname", "Permissions only"], 1, "Content sniffing."),
      q("Why not trust the name .mp3 always?", ["Extensions can be lies", "mp3 means folder", "Linux forbids music", "file cannot run on music"], 0, "Peek inside."),
      q("file is a full antivirus?", ["Yes", "No, it only guesses type", "Yes if sudo", "Only for jpg"], 1, "Not a security tool."),
      q("ASCII text means…", ["A picture", "Readable plain text", "A program always", "A zip"], 1, "Human-readable characters."),
      q("file notes.txt vs cat notes.txt?", ["file describes type; cat shows words inside", "Same output", "file deletes text", "cat guesses type"], 0, "Label vs contents."),
    ],
  }),
  cmd({
    id: "stat",
    name: "stat",
    tab: "moving-around",
    difficulty: "beginner",
    metaphor: "stat is the full ID card of a file: size, timestamps, and inode number.",
    explanation:
      "stat prints metadata — data about the file, not the story inside it. You will see size, permissions, and several timestamps (last modified, last accessed). Beginners use it when ls -l is not enough.",
    examples: [
      ["stat notes.txt", "ID card for a file.", "Size: 120  ...  Modify: 2026-08-22"],
      ["stat Photos", "Folders have metadata too.", "Directory"],
    ],
    animationKind: "walk",
    steps: [
      [
        "stat notes.txt",
        "  File: notes.txt\n  Size: 120\n  Access: (0644/-rw-r--r--)\n  Modify: 2026-08-22 01:00:00",
        "This is the ID card, not the essay inside. cat would show the essay.",
        { ...house, highlight: ["notes.txt"] },
      ],
    ],
    pitfalls: [
      "Modify time is not always ‘when a human last edited it’ on every filesystem.",
      "stat output looks busy — start with Size and File.",
    ],
    quiz: [
      q("stat shows…", ["Only the poem inside", "Metadata (size, times, permissions)", "Wi-Fi", "Other users’ passwords"], 1, "About the file."),
      q("To read the words inside notes.txt use…", ["stat only", "cat (or less)", "hostname", "ping"], 1, "stat ≠ contents."),
      q("Folders can be stat’d?", ["No", "Yes, directories have metadata too", "Only if empty", "Only with tree"], 1, "Everything is a file-ish thing."),
      q("0644 in the sample relates to…", ["The date 6/44", "Permissions (you will meet chmod)", "File size 644 MB", "A port"], 1, "Numeric mode."),
      q("ls -l vs stat?", ["stat is a deeper ID card; ls -l is a one-line summary", "stat lists all files", "ls -l is metadata-free", "They delete files"], 0, "Depth of detail."),
    ],
  }),
];
