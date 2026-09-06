import { cmd, q } from "./helpers";

export const textLessons = [
  cmd({
    id: "pipe",
    name: "| (pipe)",
    tab: "text",
    difficulty: "intermediate",
    metaphor: "A pipe is a conveyor belt: the leftover words of one machine become the next machine’s ingredients.",
    explanation:
      "The | character sends the output of the left command into the input of the right command. ls | wc -l counts how many names ls printed. You did not create a temporary file — the belt carries the text.",
    examples: [
      ["ls | wc -l", "How many names in this folder?", "5"],
      ["cat notes.txt | grep milk", "Highlight milk lines from a file via a belt.", "Buy milk"],
    ],
    animationKind: "pipe",
    steps: [
      [
        "ls | wc -l",
        "5",
        "ls dumped names onto the belt. wc -l counted the boxes as they passed. No extra file needed.",
        {
          boxes: [
            { label: "ls", items: ["Documents", "Music", "Photos", "notes.txt", "todo.txt"] },
            { label: "wc -l", items: ["5"] },
          ],
        },
      ],
    ],
    pitfalls: [
      "Spaces around | are optional; the idea is left-to-right flow.",
      "If the right command does not read stdin, the belt dumps into nowhere useful.",
    ],
    quiz: [
      q("| does what?", ["Deletes the left command", "Sends left output to right input", "Means ‘or’ in English only", "Changes directory"], 1, "Conveyor."),
      q("ls | wc -l answers…", ["How many listed names", "Disk size", "Hostname", "Permissions of /"], 0, "Count lines of listing."),
      q("Pipes create a file on disk?", ["Always", "Not required — data can stream in memory", "Always in Photos", "Only with sudo"], 1, "Stream."),
      q("cat file | grep x vs grep x file?", ["Both can find x; grep file is simpler", "Pipes are illegal with grep", "cat is required always", "grep cannot read files"], 0, "Don’t cat-abuse, but the idea is valid."),
      q("The belt runs…", ["Right to left", "Left to right", "Randomly", "Only at noon"], 1, "Left | right."),
    ],
  }),
  cmd({
    id: "redirect-out",
    name: "> (redirect)",
    tab: "text",
    difficulty: "intermediate",
    metaphor: "> is pouring the conveyor into a labeled jar — replacing whatever was in the jar.",
    explanation:
      "command > file.txt writes output into a file, creating it if needed, overwriting if it existed. That overwrite is the sharp edge. echo hello > a.txt is how you make a tiny file without an editor.",
    examples: [
      ["echo hello > a.txt", "Put hello into a.txt (replace).", "(file now contains hello)"],
      ["ls > listing.txt", "Save a listing for later.", "(listing.txt created)"],
    ],
    animationKind: "pipe",
    steps: [
      [
        "echo hello > a.txt",
        "",
        "The parrot’s words went into the jar a.txt. If the jar had old jam, it was emptied first.",
        {
          boxes: [
            { label: "echo hello", items: ["hello"] },
            { label: "a.txt (replaced)", items: ["hello"] },
          ],
        },
      ],
    ],
    pitfalls: [
      "> oldfile destroys previous contents without asking.",
      "Spaces: > is a shell feature, not an argument to echo.",
    ],
    quiz: [
      q("> file means…", ["Read file", "Write (overwrite) output into file", "Pipe to grep", "Change dir"], 1, "Redirect out."),
      q("Danger of > ?", ["It asks 10 times", "It can overwrite a file silently", "It never creates files", "It is rm -rf"], 1, "Silent replace."),
      q("echo hi > a.txt then cat a.txt…", ["hi", "empty always", "the listing of /", "hi hi hi"], 0, "Jar contains hi."),
      q("ls > listing.txt prints ls on screen?", ["Usually no — output went to the file", "Always yes", "Only folders", "Only with sudo"], 0, "Screen stays quiet."),
      q("> vs | ?", ["> saves to a file; | feeds another command", "Identical", "| overwrites files always", "> is grep"], 0, "Jar vs belt."),
    ],
  }),
  cmd({
    id: "redirect-append",
    name: ">> (append)",
    tab: "text",
    difficulty: "intermediate",
    metaphor: ">> is adding a new layer of jam on top of the old jam instead of washing the jar.",
    explanation:
      "command >> file.txt appends. Logs and notes grow this way. If the file does not exist, it is created. Prefer >> when you do not want to destroy history.",
    examples: [
      ["echo day1 >> diary.txt", "Create or add a line.", "(diary grows)"],
      ["echo day2 >> diary.txt", "Add another line.", "day1\nday2"],
    ],
    animationKind: "pipe",
    steps: [
      [
        "echo day2 >> diary.txt",
        "",
        "Old day1 stayed. day2 sat underneath. Two chevrons = add, one chevron = replace.",
        {
          boxes: [
            { label: "echo day2", items: ["day2"] },
            { label: "diary.txt", items: ["day1", "day2"] },
          ],
        },
      ],
    ],
    pitfalls: [
      ">> still cannot undo — it only refuses to wipe the old text.",
      "Mixing > and >> by accident is a classic diary disaster.",
    ],
    quiz: [
      q(">> means…", ["Overwrite always", "Append to the file", "Pipe", "Home"], 1, "Add to the end."),
      q("One > vs two >> ?", ["> replace, >> add", "Opposite", "Same", ">> is cd"], 0, "Jam jar."),
      q("First >> on a missing file…", ["Errors always", "Creates the file", "Deletes /", "Opens less"], 1, "Create then write."),
      q("Growing a log is usually…", ["> every time", ">>", "rm", "chmod 000"], 1, "Keep history."),
      q("echo x > diary after a long diary…", ["Wipes the diary down to x", "Adds x", "Prints man", "Fails always"], 0, "Single > is replace."),
    ],
  }),
  cmd({
    id: "redirect-in",
    name: "< (input redirect)",
    tab: "text",
    difficulty: "intermediate",
    metaphor: "< is feeding a jar’s contents into a machine’s mouth.",
    explanation:
      "command < file.txt uses the file as standard input, as if you typed the file’s bytes. Many commands also accept a filename argument instead — both work. This shines with programs that only read stdin.",
    examples: [
      ["wc -l < notes.txt", "Count lines via stdin.", "2"],
      ["sort < names.txt", "Sort lines from a file.", "amy\nbob"],
    ],
    animationKind: "pipe",
    steps: [
      [
        "wc -l < notes.txt",
        "2",
        "The jar poured into wc. Same numbers as wc -l notes.txt, different plumbing.",
        {
          boxes: [
            { label: "notes.txt", items: ["Buy milk", "Learn ls"] },
            { label: "wc -l", items: ["2"] },
          ],
        },
      ],
    ],
    pitfalls: [
      "< does not mean ‘less than’ here — in the shell it is plumbing.",
      "Do not confuse < file with command file (argument vs stdin).",
    ],
    quiz: [
      q("< file feeds…", ["The file into the command’s input", "The command into the trash", "A pipe both ways", "cd"], 0, "Stdin."),
      q("In the shell, < is…", ["Always math", "Redirect in (plumbing)", "grep", "A folder"], 1, "Not less-than math."),
      q("wc -l < f vs wc -l f…", ["Similar counts; different plumbing", "Opposite counts", "< deletes f", "Illegal"], 0, "stdin vs filename."),
      q("> vs < ?", ["> write out, < read in", "Same", "< overwrites", "> reads"], 0, "Arrows show direction."),
      q("sort < names.txt…", ["Sorts lines from names.txt", "Deletes names", "Creates names as a folder", "Pings"], 0, "Input redirect."),
    ],
  }),
  cmd({
    id: "sort",
    name: "sort",
    tab: "text",
    difficulty: "intermediate",
    metaphor: "sort is lining index cards in dictionary order (or number order with -n).",
    explanation:
      "sort prints lines in order. sort -n uses number sense so 10 does not sit before 2. sort -u unique-sorts. Combine: sort file | uniq.",
    flags: [
      ["-n", "Numeric sort"],
      ["-r", "Reverse"],
      ["-u", "Unique (like uniq while sorting)"],
    ],
    examples: [
      ["sort names.txt", "A to Z.", "amy\nbob\ncam"],
      ["sort -n nums.txt", "2 before 10.", "2\n10"],
    ],
    animationKind: "pipe",
    steps: [
      [
        "sort names.txt",
        "amy\nbob\ncam",
        "Cards lined up A→Z. Without -n, 10 can sneak before 2 because ‘1’ is a character.",
        {
          boxes: [
            { label: "messy", items: ["cam", "amy", "bob"] },
            { label: "sort", items: ["amy", "bob", "cam"] },
          ],
        },
      ],
    ],
    pitfalls: [
      "Default sort is by characters, not by human numbers — use -n.",
      "sort does not edit the file unless you redirect (careful with same name).",
    ],
    quiz: [
      q("sort file…", ["Shuffles randomly", "Prints lines in order", "Deletes duplicates only", "Moves file"], 1, "Order."),
      q("sort -n is for…", ["Names only", "Numbers that should compare as numbers", "Network", "chmod"], 1, "2 before 10."),
      q("-r means…", ["Recursive delete", "Reverse order", "Root required", "Random"], 1, "Z→A."),
      q("sort writes the file by itself?", ["Always overwrites", "No, it prints unless you redirect", "It rm’s the file", "It uses ping"], 1, "Stdout."),
      q("10 before 2 without -n because…", ["Character ‘1’ vs ‘2’", "Math bug in CPU", "Linux forbids 10", "sort is broken"], 0, "Text sort."),
    ],
  }),
  cmd({
    id: "uniq",
    name: "uniq",
    tab: "text",
    difficulty: "intermediate",
    metaphor: "uniq is a bouncer who only removes repeat guests if they are standing next to each other.",
    explanation:
      "uniq hides consecutive duplicate lines. If duplicates are not adjacent, sort first: sort file | uniq. uniq -c counts the runs.",
    flags: [
      ["-c", "Prefix count of repeats"],
      ["-d", "Only the duplicated lines"],
    ],
    examples: [
      ["sort votes.txt | uniq", "Each name once.", "amy\nbob"],
      ["sort votes.txt | uniq -c", "How many votes each.", "      3 amy\n      1 bob"],
    ],
    animationKind: "pipe",
    steps: [
      [
        "sort votes.txt | uniq",
        "amy\nbob",
        "sort made duplicates stand together. uniq then let only one of each through the rope.",
        {
          boxes: [
            { label: "sort", items: ["amy", "amy", "bob"] },
            { label: "uniq", items: ["amy", "bob"] },
          ],
        },
      ],
    ],
    pitfalls: [
      "uniq without sort misses duplicates that are not neighbors.",
      "Spaces can make two ‘same’ lines look different.",
    ],
    quiz: [
      q("uniq removes duplicates only if they are…", ["Anywhere in the file", "Consecutive (neighbors)", "JPG files", "Owned by root"], 1, "Adjacent."),
      q("Usual combo is…", ["rm | uniq", "sort | uniq", "ping | uniq", "cd | uniq"], 1, "Sort first."),
      q("uniq -c…", ["Creates files", "Counts how many times each run appeared", "Chmods", "Clears screen"], 1, "Vote count."),
      q("amy, bob, amy without sort then uniq…", ["Both amys remain (not neighbors)", "One amy always", "File deleted", "Error always"], 0, "Need sort."),
      q("uniq edits the original file?", ["Always", "No, it prints the cleaned stream", "Only -c", "Only with > same name accidentally"], 1, "Use redirect carefully."),
    ],
  }),
  cmd({
    id: "cut",
    name: "cut",
    tab: "text",
    difficulty: "intermediate",
    metaphor: "cut is scissors: keep only column 1, or the field between commas.",
    explanation:
      "cut -d ',' -f 1 file takes the first comma-separated field. cut -c 1-5 takes characters 1–5. It is a simple column tool before you need awk.",
    flags: [
      ["-d ','", "Delimiter (the separator)"],
      ["-f 2", "Which field (column)"],
      ["-c 1-10", "Character range"],
    ],
    examples: [
      ["cut -d ',' -f 1 people.csv", "First CSV column.", "amy\nbob"],
      ["cut -c 1-3 file", "First three characters of each line.", "Buy\nLea"],
    ],
    animationKind: "pipe",
    steps: [
      [
        "cut -d ',' -f 1 people.csv",
        "amy\nbob",
        "Scissors kept the name column and dropped the ages. -d is the perforation line.",
        {
          boxes: [
            { label: "people.csv", items: ["amy,22", "bob,31"] },
            { label: "cut -f1", items: ["amy", "bob"] },
          ],
        },
      ],
    ],
    pitfalls: [
      "cut is awkward with quoted CSV that contains commas inside quotes.",
      "Fields start at 1, not 0.",
    ],
    quiz: [
      q("cut -f 1 with -d ',' keeps…", ["The last column", "The first comma-separated field", "The whole file zipped", "Line 1 only"], 1, "Field 1."),
      q("-d means…", ["Delete file", "Delimiter (separator character)", "Directory", "Date"], 1, "What splits columns."),
      q("Field numbers start at…", ["0", "1", "2", "-1"], 1, "1-based."),
      q("cut vs awk?", ["cut is simpler columns; awk is a mini language", "cut is harder always", "awk cannot print fields", "Identical"], 0, "Start with cut."),
      q("cut edits in place?", ["Always", "No, prints to stdout", "Deletes CSV", "Needs sudo"], 1, "Redirect to save."),
    ],
  }),
  cmd({
    id: "tr",
    name: "tr",
    tab: "text",
    difficulty: "intermediate",
    metaphor: "tr is a translator booth: every ‘a’ becomes ‘A’, or every punctuation becomes a space.",
    explanation:
      "tr reads stdin and maps characters. echo hello | tr a-z A-Z shouts HELLO. tr -d '\\r' is a classic ‘Windows line ending’ cleaner. tr does not take a filename argument — pipe or < in.",
    flags: [
      ["-d", "Delete the listed characters"],
      ["-s", "Squeeze repeats"],
    ],
    examples: [
      ["echo hello | tr a-z A-Z", "Uppercase.", "HELLO"],
      ["tr -d '0-9' < file", "Strip digits.", "(letters remain)"],
    ],
    animationKind: "pipe",
    steps: [
      [
        "echo hello | tr a-z A-Z",
        "HELLO",
        "Each small letter swapped its coat for a capital. tr is a character booth, not a word editor.",
        {
          boxes: [
            { label: "echo hello", items: ["hello"] },
            { label: "tr A-Z", items: ["HELLO"] },
          ],
        },
      ],
    ],
    pitfalls: [
      "tr file.txt is wrong — use < file.txt or a pipe.",
      "Ranges depend on locale; keep it simple (a-z) while learning.",
    ],
    quiz: [
      q("tr usually reads…", ["A filename as its first argument always", "stdin (pipe or <)", "Only JPGs", "The network"], 1, "Filter."),
      q("echo hi | tr a-z A-Z…", ["HI", "hi", "error", "h i"], 0, "Uppercase."),
      q("-d means…", ["Directory", "Delete those characters", "Delimiter like cut", "Date"], 1, "Delete set."),
      q("tr notes.txt …", ["Often a mistake — pass data via stdin", "Always works as cat", "Deletes notes", "Is mkdir"], 0, "No file arg."),
      q("tr is for whole-word find-replace?", ["That’s more sed’s job; tr is characters", "tr replaces paragraphs", "tr is grep", "tr is cd"], 0, "Characters."),
    ],
  }),
  cmd({
    id: "diff",
    name: "diff",
    tab: "text",
    difficulty: "intermediate",
    metaphor: "diff is two essays with a teacher’s red marks showing what changed.",
    explanation:
      "diff old new reports line changes. diff -u is the unified style you see in code reviews. Exit status is 0 when files match — scripts use that.",
    flags: [
      ["-u", "Unified view (readable)"],
      ["-r", "Compare two folders"],
    ],
    examples: [
      ["diff -u v1.txt v2.txt", "What changed?", "--- v1\n+++ v2\n-old line\n+new line"],
      ["diff a.txt b.txt && echo same", "Silence + same if identical.", "same"],
    ],
    animationKind: "pipe",
    steps: [
      [
        "diff -u v1.txt v2.txt",
        "--- v1.txt\n+++ v2.txt\n-Buy milk\n+Buy oat milk",
        "Red minus left, green plus arrived. The teacher marked only the milk line.",
        {
          boxes: [
            { label: "v1", items: ["Buy milk"] },
            { label: "v2", items: ["Buy oat milk"] },
          ],
        },
      ],
    ],
    pitfalls: [
      "diff on huge binaries is noisy — use specialized tools.",
      "Order is old then new so minus/plus make sense.",
    ],
    quiz: [
      q("diff compares…", ["Two clocks only", "Two files (or folders with -r)", "Users", "PIDs"], 1, "Differences."),
      q("In unified diff, + often means…", ["Deleted", "Added in the second file", "A pipe", "Home"], 1, "Incoming line."),
      q("-u is useful because…", ["It is a common readable format", "It deletes files", "It is sudo", "It hides all changes"], 0, "Unified."),
      q("Identical files: diff output is…", ["A long novel", "Usually empty (success)", "rm list", "A JPEG"], 1, "No news."),
      q("Argument order…", ["old then new (typical)", "never matters", "new then old required by physics", "only folders"], 0, "Minus/plus story."),
    ],
  }),
  cmd({
    id: "sed",
    name: "sed",
    tab: "text",
    difficulty: "intermediate",
    metaphor: "sed is a find-and-replace clerk on a stream of paper — ‘s/old/new/’ means substitute.",
    explanation:
      "sed is the stream editor. The first recipe to learn is sed 's/old/new/' file which replaces the first old on each line. Add g for every match on the line: s/old/new/g. By default it prints; it does not save unless you use -i (be careful).",
    flags: [
      ["-i", "Edit file in place (danger for beginners — copy first)"],
      ["-n", "Quiet; pair with p to print picks"],
    ],
    examples: [
      ["sed 's/milk/oat milk/' notes.txt", "First milk → oat milk on each line.", "Buy oat milk"],
      ["sed 's/a/A/g' file", "Every a becomes A.", "(shouting a’s)"],
    ],
    animationKind: "pipe",
    steps: [
      [
        "sed 's/milk/oat milk/' notes.txt",
        "Buy oat milk",
        "The clerk swapped the word on the fly. Without -i the original file still has milk.",
        {
          boxes: [
            { label: "notes.txt", items: ["Buy milk"] },
            { label: "sed s///", items: ["Buy oat milk"] },
          ],
        },
      ],
    ],
    pitfalls: [
      "-i edits for real — keep backups while learning.",
      "Slashes in the text need a different separator, like s|old|new|.",
    ],
    quiz: [
      q("s/old/new/ means…", ["Sort", "Substitute old with new", "sudo new", "split disk"], 1, "Substitute."),
      q("The trailing g means…", ["grep only", "Replace every match on the line", "Go to home", "Groups"], 1, "Global on the line."),
      q("Without -i, the file on disk…", ["Always changes", "Stays the same; you see a printed copy", "Deletes", "Becomes a folder"], 1, "Stdout."),
      q("sed vs tr?", ["sed can replace words/patterns; tr is characters", "tr replaces paragraphs better", "Identical", "sed cannot print"], 0, "Scope."),
      q("Beginner safety with -i?", ["Copy the file first", "Use -i on / always", "Never quote", "Combine with rm -rf"], 0, "Backup."),
    ],
  }),
  cmd({
    id: "awk",
    name: "awk",
    tab: "text",
    difficulty: "intermediate",
    metaphor: "awk is a tiny spreadsheet brain: ‘print column 2 of every line’.",
    explanation:
      "awk splits each line into fields. $1 is column one, $2 column two, $0 the whole line. awk '{print $1}' file is the gentle start. -F, sets comma as the splitter for CSV-ish data.",
    flags: [["-F,", "Use comma as the field separator"]],
    examples: [
      ["awk '{print $1}' people.txt", "First word of each line.", "amy\nbob"],
      ["awk -F, '{print $2}' people.csv", "Second CSV field.", "22\n31"],
    ],
    animationKind: "pipe",
    steps: [
      [
        "awk -F, '{print $1}' people.csv",
        "amy\nbob",
        "The spreadsheet brain handed you column 1. $2 would have been the ages.",
        {
          boxes: [
            { label: "csv", items: ["amy,22", "bob,31"] },
            { label: "awk $1", items: ["amy", "bob"] },
          ],
        },
      ],
    ],
    pitfalls: [
      "awk is a whole language — stay with print $N at first.",
      "Default splitter is whitespace, not comma — set -F for CSV.",
    ],
    quiz: [
      q("$1 in awk is…", ["The whole line", "Field (column) 1", "The filename", "PID 1"], 1, "First field."),
      q("$0 means…", ["Nothing", "The entire line", "Field zero error", "Home"], 1, "Whole record."),
      q("-F, is for…", ["Force delete", "Comma as separator", "Folders", "Follow logs"], 1, "CSV-ish."),
      q("awk vs cut?", ["awk is more programmable; cut is simpler scissors", "cut can do math easily", "awk cannot print fields", "Identical"], 0, "Power."),
      q("awk '{print $2}' on 'amy 22' prints…", ["amy", "22", "amy 22", "error always"], 1, "Second whitespace field."),
    ],
  }),
];
