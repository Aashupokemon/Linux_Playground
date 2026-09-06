import { cmd, q } from "./helpers";

export const filesLessons = [
  cmd({
    id: "touch",
    name: "touch",
    tab: "files",
    difficulty: "beginner",
    metaphor: "touch is placing a blank sticky note on the desk with a name already written on top.",
    explanation:
      "touch creates an empty file if it does not exist. If the file already exists, it updates the ‘last touched’ time without changing the words inside. It is the gentlest way to make a new file.",
    examples: [
      ["touch ideas.txt", "Create an empty file.", "(quiet success — then ls shows ideas.txt)"],
      ["touch notes.txt", "Refresh the timestamp on an existing file.", "(still the same words inside)"],
    ],
    animationKind: "files",
    steps: [
      [
        "touch ideas.txt",
        "",
        "A blank card named ideas.txt appeared. Empty does not mean useless — you can write later.",
        {
          cwd: "/home/you",
          items: [
            { name: "notes.txt", folder: "home" },
            { name: "ideas.txt", folder: "home" },
          ],
        },
      ],
    ],
    pitfalls: [
      "touch will not warn you if the name already exists — it just updates the time.",
      "A mistyped folder path can create a file in the wrong room.",
    ],
    quiz: [
      q("touch new.txt if new.txt is missing…", ["Deletes home", "Creates an empty new.txt", "Prints the date only", "Opens a browser"], 1, "Create empty file."),
      q("touch on an existing file…", ["Erases its contents", "Updates its timestamp", "Renames it", "Makes it a folder"], 1, "Touch the clock."),
      q("touch is the gentlest create because…", ["It formats disks", "It makes an empty file without opening an editor", "It needs root always", "It copies Photos"], 1, "No editor required."),
      q("Does touch print the file’s text?", ["Yes always", "No, success is quiet", "Only with -l", "Only for jpg"], 1, "Quiet success."),
      q("Wrong folder with touch…", ["Could create the file in an unexpected place", "Is impossible", "Deletes Linux", "Changes hostname"], 0, "Check pwd first."),
    ],
  }),
  cmd({
    id: "mkdir",
    name: "mkdir",
    tab: "files",
    difficulty: "beginner",
    metaphor: "mkdir is building a new room and hanging a sign on the door.",
    explanation:
      "mkdir creates a folder. Use mkdir -p path/to/nested to build a whole hallway of rooms at once, and to avoid errors if they already exist.",
    flags: [["-p", "Create parents as needed; stay quiet if the folder exists"]],
    examples: [
      ["mkdir Projects", "One new room.", "(quiet success)"],
      ["mkdir -p Projects/linux-playground", "Nested rooms in one go.", "(quiet success)"],
    ],
    animationKind: "files",
    steps: [
      [
        "mkdir Projects",
        "",
        "A new doorway labeled Projects. Folders are rooms; files are objects inside rooms.",
        {
          items: [
            { name: "notes.txt", folder: "home" },
            { name: "Projects", folder: "home" },
          ],
        },
      ],
    ],
    pitfalls: [
      "mkdir fails if the name already exists as a file.",
      "Without -p, mkdir a/b fails if a does not exist.",
    ],
    quiz: [
      q("mkdir Projects…", ["Deletes Projects", "Creates a folder named Projects", "Creates a photo", "Lists files"], 1, "Make directory."),
      q("mkdir -p a/b/c…", ["Builds nested folders, creating parents", "Deletes a, b, and c", "Only works on Windows", "Prints man"], 0, "Parents included."),
      q("A folder already exists; mkdir without -p…", ["Usually errors", "Always deletes it", "Renames it", "Becomes root"], 0, "-p is friendlier."),
      q("mkdir vs touch?", ["mkdir = room, touch = empty file", "Same thing", "touch makes folders", "mkdir makes text"], 0, "Room vs sticky note."),
      q("mkdir notes.txt if notes.txt is a file…", ["Turns the file into a folder", "Fails because the name is taken", "Always works", "Runs echo"], 1, "Names must not clash."),
    ],
  }),
  cmd({
    id: "cat",
    name: "cat",
    tab: "files",
    difficulty: "beginner",
    metaphor: "cat is dumping a whole box of papers onto the table at once.",
    explanation:
      "cat concatenates and prints file contents. Great for short files. For long files, the text will fly by — use less instead. You can also cat a b > c to glue files (later, with redirects).",
    examples: [
      ["cat notes.txt", "Print the whole file.", "Buy milk\nLearn ls"],
      ["cat ideas.txt notes.txt", "Print two files, one after the other.", "(ideas then notes)"],
    ],
    animationKind: "files",
    steps: [
      [
        "cat notes.txt",
        "Buy milk\nLearn ls",
        "The whole sticky note is on the table. Fine for short notes, messy for novels.",
        { items: [{ name: "notes.txt", folder: "home", match: true }], message: "Buy milk / Learn ls" },
      ],
    ],
    pitfalls: [
      "cat on a huge file floods the terminal.",
      "cat on a binary/picture looks like garbage — use file first if unsure.",
    ],
    quiz: [
      q("cat notes.txt…", ["Deletes notes", "Prints the text inside notes.txt", "Creates a cat picture", "Changes directory"], 1, "Print contents."),
      q("cat is named after…", ["Felines only", "Concatenate (glue together)", "Catalog servers", "A username"], 1, "Glue/print."),
      q("Long novels are better with…", ["cat only", "less (scroll)", "mkdir", "ping"], 1, "Pager."),
      q("cat photo.jpg usually…", ["Shows a pretty photo always", "Prints binary junk in the terminal", "Opens Instagram", "Formats disk"], 1, "Wrong tool for pictures."),
      q("Two files: cat a b…", ["Prints a then b", "Deletes b", "Swaps them", "Zips them"], 0, "Concatenate."),
    ],
  }),
  cmd({
    id: "less",
    name: "less",
    tab: "files",
    difficulty: "beginner",
    metaphor: "less is reading a book one page at a time instead of throwing all pages in the air.",
    explanation:
      "less is a pager: space/j to go down, k or b to go up, / to search, q to quit. It is the polite way to read long output, including man pages.",
    examples: [
      ["less notes.txt", "Open a scrollable reader.", "(viewer — press q to leave)"],
      ["command | less", "Pipe long output into the reader.", "(scroll the command’s output)"],
    ],
    animationKind: "files",
    steps: [
      [
        "less story.txt",
        "Page 1/40  Once upon a time…   (space = next, q = quit)",
        "You are holding one page. q puts the book back. This is the same idea as man.",
        { items: [{ name: "story.txt", folder: "home", match: true }], message: "Page 1 of 40 — press q to leave" },
      ],
    ],
    pitfalls: [
      "Beginners forget q — they are not stuck; they are inside the pager.",
      "less does not edit the file (use an editor for that).",
    ],
    quiz: [
      q("less is for…", ["Deleting text", "Reading long text page by page", "Making folders", "Killing processes"], 1, "Pager."),
      q("Quit less with…", ["Ctrl+Alt+Delete", "q", "exit exit exit", "cd ~"], 1, "Same as man."),
      q("less vs cat for a 10,000-line log?", ["Prefer less", "Prefer cat always", "Prefer mkdir", "Prefer ping"], 0, "Don’t flood the screen."),
      q("Does less change the file?", ["Yes, it saves always", "No, it only views", "It appends hello", "It chmod’s it"], 1, "Read-only view."),
      q("/ in less often…", ["Quits", "Starts a search", "Deletes a line", "Goes home"], 1, "Search inside the file."),
    ],
  }),
  cmd({
    id: "head",
    name: "head",
    tab: "files",
    difficulty: "beginner",
    metaphor: "head is reading only the headline and first lines of a newspaper.",
    explanation:
      "head prints the beginning of a file (10 lines by default). Use -n 5 for five lines. Perfect for peeking at CSV headers or config files.",
    flags: [["-n 20", "First 20 lines"]],
    examples: [
      ["head notes.txt", "First 10 lines.", "(top of the file)"],
      ["head -n 2 notes.txt", "Just two lines.", "Buy milk\nLearn ls"],
    ],
    animationKind: "files",
    steps: [
      [
        "head -n 2 story.txt",
        "Once upon a time\nthere was a terminal.",
        "You only asked for the opening lines — the rest of the book stays on the shelf.",
        { items: [{ name: "story.txt", folder: "home", match: true }], message: "First 2 lines only" },
      ],
    ],
    pitfalls: [
      "head is not an editor.",
      "Binary files still look ugly — same warning as cat.",
    ],
    quiz: [
      q("Default head shows…", ["Last 10 lines", "First 10 lines", "Entire file", "Nothing"], 1, "The beginning."),
      q("head -n 3 means…", ["3 files", "First 3 lines", "3 folders", "Wait 3 seconds"], 1, "-n is a count."),
      q("head vs less?", ["head prints a preview and exits; less is an interactive book", "Same", "head edits", "less creates files"], 0, "Preview vs pager."),
      q("CSV header peeking is a job for…", ["rm", "head", "ping", "chmod"], 1, "See column names."),
      q("head deletes the rest of the file?", ["Yes", "No, it only prints a preview", "Only with -n", "Only as root"], 1, "Read-only."),
    ],
  }),
  cmd({
    id: "tail",
    name: "tail",
    tab: "files",
    difficulty: "beginner",
    metaphor: "tail is jumping to the last page of the diary — where the newest gossip is.",
    explanation:
      "tail prints the end of a file. Logs grow at the bottom, so tail -f follows new lines as they appear (like live subtitles). Ctrl+C stops following.",
    flags: [
      ["-n 20", "Last 20 lines"],
      ["-f", "Follow: keep printing new lines"],
    ],
    examples: [
      ["tail notes.txt", "Last 10 lines.", "(bottom of the file)"],
      ["tail -f /var/log/syslog", "Watch a log live (may need permission).", "(lines appear as events happen)"],
    ],
    animationKind: "files",
    steps: [
      [
        "tail -n 2 story.txt",
        "…and they learned pwd.\nThe End.",
        "The newest sentences live at the bottom of many logs. -f means ‘keep watching’.",
        { items: [{ name: "story.txt", folder: "home", match: true }], message: "Last 2 lines — The End" },
      ],
    ],
    pitfalls: [
      "tail -f runs until you stop it with Ctrl+C.",
      "Some log files need extra permission to read.",
    ],
    quiz: [
      q("tail shows…", ["The start", "The end of a file", "Only pictures", "Users"], 1, "The tail."),
      q("tail -f is like…", ["Deleting logs", "Live subtitles for a growing file", "Formatting disk", "cd home"], 1, "Follow."),
      q("Stop tail -f with…", ["q only", "Ctrl+C", "clear", "man"], 1, "Interrupt the follower."),
      q("Logs often grow…", ["At the top", "At the bottom", "In /Photos only", "Never"], 1, "Why tail exists."),
      q("head vs tail?", ["head = start, tail = end", "Identical", "tail edits", "head follows live"], 0, "Two ends of a stick."),
    ],
  }),
  cmd({
    id: "cp",
    name: "cp",
    tab: "files",
    difficulty: "beginner",
    metaphor: "cp is a photocopier: the original stays, a duplicate appears.",
    explanation:
      "cp source dest copies a file. Use cp -r for folders (recursive), otherwise Linux refuses to copy a room. Add -i to be asked before overwriting.",
    flags: [
      ["-r or -R", "Copy folders and their contents"],
      ["-i", "Ask before overwrite"],
      ["-v", "Verbose: narrate what was copied"],
    ],
    examples: [
      ["cp notes.txt notes.bak", "Duplicate a file.", "(now both exist)"],
      ["cp -r Photos Photos-backup", "Duplicate a whole folder.", "(a second Photos-backup room)"],
    ],
    animationKind: "files",
    steps: [
      [
        "cp notes.txt notes.bak",
        "",
        "Photocopier: notes.txt still exists, notes.bak is the twin. Overwriting dest can happen if the name is taken — try -i.",
        {
          items: [
            { name: "notes.txt", folder: "home" },
            { name: "notes.bak", folder: "home" },
          ],
        },
      ],
    ],
    pitfalls: [
      "cp folder dest without -r fails.",
      "cp a b if b is an existing directory puts a copy inside b.",
    ],
    quiz: [
      q("cp a b when b does not exist…", ["Renames a (no)", "Creates file b as a copy of a", "Deletes a", "Moves a"], 1, "Photocopy."),
      q("Copy a folder with…", ["cp only", "cp -r", "touch", "hostname"], 1, "Recursive."),
      q("After cp, the original is…", ["Gone", "Still there", "Empty", "Root-owned"], 1, "Copy ≠ move."),
      q("-i is safer because…", ["It asks before overwrite", "It ignores errors always", "It copies the internet", "It hides files"], 0, "Interactive."),
      q("cp notes.txt Photos/ …", ["May place a copy inside the Photos folder", "Always fails", "Deletes Photos", "Formats disk"], 0, "Dest is a directory."),
    ],
  }),
  cmd({
    id: "mv",
    name: "mv",
    tab: "files",
    difficulty: "beginner",
    metaphor: "mv is picking up a box: it can change rooms (move) or change the label (rename).",
    explanation:
      "mv old new renames if new is just a new name in the same folder, or moves if new is another folder. There is no separate rename command in classic Unix — mv does both.",
    flags: [["-i", "Ask before overwriting"]],
    examples: [
      ["mv notes.txt diary.txt", "Rename in place.", "(notes.txt gone, diary.txt present)"],
      ["mv diary.txt Documents/", "Move into Documents.", "(Documents/diary.txt)"],
    ],
    animationKind: "files",
    steps: [
      [
        "mv notes.txt diary.txt",
        "",
        "Same box, new label. mv is also how you carry a box into another room.",
        { items: [{ name: "diary.txt", folder: "home" }] },
      ],
      [
        "mv diary.txt Documents/",
        "",
        "Carried into Documents. The old doorway no longer shows diary.txt.",
        { items: [{ name: "diary.txt", folder: "Documents" }] },
      ],
    ],
    pitfalls: [
      "mv can overwrite a file with the same destination name — use -i.",
      "There is no recycle bin in the terminal by default.",
    ],
    quiz: [
      q("mv file newname…", ["Copies and keeps both always", "Renames (old name disappears)", "Deletes both", "Opens less"], 1, "Rename."),
      q("mv file folder/ …", ["Moves file into folder", "Always copies", "Creates a zip", "Prints cat"], 0, "Relocate."),
      q("Unix rename command is usually…", ["rename-only tool required", "mv", "touch", "pwd"], 1, "mv does both."),
      q("mv vs cp?", ["mv relocates; cp duplicates", "Identical", "cp deletes source", "mv always copies"], 0, "Carry vs photocopy."),
      q("Overwrite danger: mv a b if b exists as a file…", ["b can be replaced", "Always asks", "Impossible", "Creates a/b/a"], 0, "Use -i."),
    ],
  }),
  cmd({
    id: "rm",
    name: "rm",
    tab: "files",
    difficulty: "beginner",
    metaphor: "rm is a shredder — not a recycle bin. The paper does not go to a tidy trash icon.",
    explanation:
      "rm deletes files. rm -r deletes a folder and everything inside. There is usually no undo. Never experiment with rm -rf / or wild paths you do not understand. Prefer rm -i while learning.",
    danger: true,
    flags: [
      ["-i", "Ask each time — excellent for learners"],
      ["-r", "Recursive, needed for folders"],
      ["-f", "Force: fewer warnings (avoid while learning)"],
    ],
    examples: [
      ["rm -i junk.txt", "Delete one file with a confirmation.", "rm: remove junk.txt? y"],
      ["rmdir emptydir", "Remove an empty folder (safer cousin).", "(fails if not empty)"],
    ],
    animationKind: "files",
    steps: [
      [
        "rm -i junk.txt",
        "rm: remove regular file 'junk.txt'? y",
        "The card vanished. This playground is fake; on a real computer rm is rarely undoable.",
        { items: [{ name: "junk.txt", folder: "home", gone: true }] },
      ],
    ],
    pitfalls: [
      "rm -rf path is famous for disasters when path is wrong.",
      "Spaces: rm my file.txt deletes my and file.txt as two names — quote it.",
    ],
    quiz: [
      q("rm junk.txt…", ["Moves to Recycle Bin always", "Deletes junk.txt (usually no undo)", "Renames it", "Prints it"], 1, "Shredder."),
      q("Delete a folder with contents using…", ["rm without flags", "rm -r (be careful)", "touch", "date"], 1, "Recursive."),
      q("While learning, prefer…", ["rm -rf /", "rm -i", "random rm *", "sudo rm everything"], 1, "Interactive."),
      q("This playground’s rm destroys your real PC?", ["Yes", "No, demos are simulated", "Only folders", "Only Photos"], 1, "Safe here."),
      q("rm my file.txt without quotes…", ["May delete two names: my and file.txt", "Always one file", "Creates my", "Runs sudo"], 0, "Spaces split words."),
    ],
  }),
  cmd({
    id: "rmdir",
    name: "rmdir",
    tab: "files",
    difficulty: "beginner",
    metaphor: "rmdir is taking down a room only if you already carried every box out.",
    explanation:
      "rmdir removes an empty directory. If anything is still inside, it refuses — that refusal is a safety feature. To remove a full tree you would need rm -r, which is more dangerous.",
    examples: [
      ["rmdir EmptyRoom", "Remove an empty folder.", "(quiet success)"],
      ["rmdir Photos", "Fails if Photos still has pictures.", "rmdir: failed: Directory not empty"],
    ],
    animationKind: "files",
    steps: [
      [
        "rmdir EmptyRoom",
        "",
        "The empty room vanished. If a sock was still on the floor, rmdir would have said no.",
        { items: [{ name: "EmptyRoom", folder: "home", gone: true }] },
      ],
    ],
    pitfalls: [
      "Hidden files (like .keep) also count as ‘not empty’.",
      "Do not jump to rm -rf just to silence rmdir — look inside with ls -a first.",
    ],
    quiz: [
      q("rmdir works when the folder is…", ["Full of photos", "Empty", "A file", "The whole disk"], 1, "Empty only."),
      q("Directory not empty means…", ["Success", "Something is still inside (maybe hidden)", "Linux crashed", "Use ping"], 1, "Check ls -a."),
      q("rmdir vs rm -r?", ["rmdir is picky/safer; rm -r can wipe a tree", "rmdir is more dangerous", "Identical", "rmdir copies"], 0, "Prefer rmdir when you can."),
      q("A hidden .keep file…", ["Is ignored by rmdir", "Blocks rmdir because the folder is not empty", "Is always Photos", "Is hostname"], 1, "Dots still count."),
      q("rmdir notes.txt if notes.txt is a file…", ["Deletes the file", "Fails — rmdir is for folders", "Renames it", "Cats it"], 1, "Wrong tool."),
    ],
  }),
  cmd({
    id: "ln",
    name: "ln",
    tab: "files",
    difficulty: "beginner",
    metaphor: "ln -s is a sticky note on the fridge that says ‘milk is in the other fridge’ — a shortcut, not a second carton.",
    explanation:
      "ln can make hard links (advanced) or symbolic links with ln -s. A symlink is a nickname pointing at another path. If the target moves, the shortcut can break (a dangling link).",
    flags: [["-s", "Symbolic link (the usual beginner choice)"]],
    examples: [
      ["ln -s /home/you/Photos/cat.jpg kitty", "Nickname kitty → cat.jpg.", "kitty -> /home/you/Photos/cat.jpg"],
      ["ls -l kitty", "See that it is a link.", "lrwxrwxrwx ... kitty -> .../cat.jpg"],
    ],
    animationKind: "files",
    steps: [
      [
        "ln -s Photos/cat.jpg kitty",
        "",
        "kitty is a pointer, not a second cat. ls -l shows the arrow.",
        {
          items: [
            { name: "cat.jpg", folder: "Photos" },
            { name: "kitty → cat.jpg", folder: "home" },
          ],
        },
      ],
    ],
    pitfalls: [
      "If you ln -s with the wrong order of arguments, the shortcut points at nonsense.",
      "Deleting a symlink does not delete the real file (usually); deleting the real file breaks the shortcut.",
    ],
    quiz: [
      q("ln -s makes…", ["A zip archive", "A shortcut (symbolic link)", "A user", "A process"], 1, "Symlink."),
      q("A dangling link means…", ["The shortcut points at a missing target", "A perfect copy", "A folder named dangle", "sudo"], 0, "Broken pointer."),
      q("ls -l shows a symlink with…", ["d at the start", "l at the start and an arrow ->", "Only size 0 always", "The word DELETE"], 1, "l and ->."),
      q("Removing the symlink kitty…", ["Usually removes only the nickname", "Always shreds cat.jpg", "Formats /", "Runs chmod"], 0, "Pointer vs object."),
      q("Beginners should prefer…", ["Hard links only", "ln -s for nicknames", "ln without reading", "rm -rf"], 1, "Symbolic."),
    ],
  }),
  cmd({
    id: "wc",
    name: "wc",
    tab: "files",
    difficulty: "beginner",
    metaphor: "wc is a clerk who counts lines, words, and letters so you don’t have to.",
    explanation:
      "wc means word count. By default it prints lines, words, and bytes. wc -l is the everyday trick: how many lines in this log?",
    flags: [
      ["-l", "Lines only"],
      ["-w", "Words"],
      ["-c", "Bytes"],
    ],
    examples: [
      ["wc notes.txt", "Lines, words, bytes.", "2  4  20 notes.txt"],
      ["wc -l notes.txt", "Just line count.", "2 notes.txt"],
    ],
    animationKind: "files",
    steps: [
      [
        "wc -l notes.txt",
        "2 notes.txt",
        "Two lines on the sticky note. Data people live on wc -l.",
        { items: [{ name: "notes.txt", folder: "home", match: true }], message: "2 lines · 4 words" },
      ],
    ],
    pitfalls: [
      "A file with no ending newline can surprise line counts.",
      "wc counts bytes with -c, which is not always ‘letters’ for Unicode.",
    ],
    quiz: [
      q("wc is mainly for…", ["Deleting words", "Counting lines/words/bytes", "Changing directory", "Ping"], 1, "Word count."),
      q("wc -l logs.txt is great for…", ["How many log lines", "Installing Linux", "chmod", "hostname"], 0, "Line count."),
      q("Default wc prints…", ["Only the filename", "Lines, words, and bytes", "A picture", "Permissions only"], 1, "Three numbers."),
      q("wc edits the file?", ["Yes", "No", "Only -l", "Only as root"], 1, "Read-only count."),
      q("Pipe later: command | wc -l means…", ["Count lines of that command’s output", "Delete output", "Sort output", "Zip output"], 0, "Factory counter."),
    ],
  }),
];

