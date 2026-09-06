import { cmd, q } from "./helpers";

export const permissionsLessons = [
  cmd({
    id: "id",
    name: "id",
    tab: "permissions",
    difficulty: "intermediate",
    metaphor: "id is your employee badge: number, name, and which clubs (groups) you belong to.",
    explanation:
      "id prints your user id (uid), primary group, and extra groups. Linux decides permissions using these numbers, not your smile. id alice inspects another account if you are allowed.",
    examples: [
      ["id", "Your badge.", "uid=1000(you) gid=1000(you) groups=1000(you),27(sudo)"],
      ["id -un", "Just the username.", "you"],
    ],
    animationKind: "lock",
    steps: [
      [
        "id",
        "uid=1000(you) gid=1000(you) groups=1000(you),27(sudo)",
        "Badge numbers. If sudo is in the list, you may sometimes borrow the manager’s key.",
        { file: "you", mode: "uid 1000", message: "clubs: you, sudo", lock: "badge" },
      ],
    ],
    pitfalls: [
      "uid 0 is root — the building manager.",
      "Group names like sudo/wheel mean ‘may request admin powers’ on many systems — not automatic chaos.",
    ],
    quiz: [
      q("id shows…", ["Only the date", "User/group identity numbers and names", "All files", "Wi-Fi"], 1, "Badge."),
      q("uid 0 is usually…", ["A guest", "root (superuser)", "A printer", "Invalid"], 1, "Manager."),
      q("groups=...sudo might mean…", ["You may use sudo when asked", "You are banned", "id is broken", "You own /"], 0, "Admin club."),
      q("whoami vs id?", ["id is a richer badge; whoami is just the name", "whoami shows groups", "Identical", "id deletes users"], 0, "Detail."),
      q("Linux permissions key off…", ["Hair color", "uids/gids", "Wallpaper", "hostname only"], 1, "Numbers."),
    ],
  }),
  cmd({
    id: "groups",
    name: "groups",
    tab: "permissions",
    difficulty: "intermediate",
    metaphor: "groups lists the club memberships printed on the back of your badge.",
    explanation:
      "groups prints the groups your account belongs to. Extra groups can grant access to printers, docker, or sudo. Changing groups is an admin task (usermod) — reboot or re-login may be needed to feel a new group.",
    examples: [
      ["groups", "Your clubs.", "you sudo"],
      ["groups sam", "Someone else’s clubs.", "sam students"],
    ],
    animationKind: "lock",
    steps: [
      [
        "groups",
        "you sudo",
        "Club list. Files can be opened to a whole club, not only to one person.",
        { file: "shared.txt", mode: "club: sudo", message: "you, sudo" },
      ],
    ],
    pitfalls: [
      "New group membership often needs a fresh login.",
      "Do not add yourself to random groups ‘just in case’.",
    ],
    quiz: [
      q("groups lists…", ["Files", "Group memberships", "PIDs", "Hosts"], 1, "Clubs."),
      q("A group can be used to…", ["Share access among several users", "Delete Linux", "Replace pwd", "Name a JPEG"], 0, "Shared keys."),
      q("After usermod -aG, you may need…", ["A new login session", "rm -rf", "Nothing ever", "to format /"], 0, "Session refresh."),
      q("groups vs id?", ["id includes numbers; groups is names-focused", "groups shows uids better", "Identical always", "groups is find"], 0, "Overlap."),
      q("sudo group typically…", ["Lets you request admin commands", "Is a photo album", "Blocks all commands", "Is hostname"], 0, "Admin club."),
    ],
  }),
  cmd({
    id: "chmod",
    name: "chmod",
    tab: "permissions",
    difficulty: "intermediate",
    metaphor: "chmod is changing the lock on a box: who may read, write, or walk in (execute).",
    explanation:
      "Every file has three audiences: owner, group, others. r=read, w=write, x=execute (or ‘enter’ on folders). chmod u+x script.sh gives you execute. chmod 644 is a numeric recipe (rw-r--r--). Never chmod 777 the whole disk ‘to fix it’.",
    flags: [
      ["u+x", "Add execute for the user (you)"],
      ["go-w", "Remove write for group and others"],
      ["-R", "Recursive (powerful — be careful)"],
    ],
    examples: [
      ["chmod u+x run.sh", "Allow you to run the script.", "(run.sh becomes executable)"],
      ["chmod 644 notes.txt", "You rw, others r.", "-rw-r--r--"],
    ],
    animationKind: "lock",
    steps: [
      [
        "chmod u+x run.sh",
        "",
        "You added a key for yourself: execute. The padlock diagram in ls -l will show an extra x.",
        { file: "run.sh", mode: "u+x → rwxr--r--", message: "You may now run it" },
      ],
    ],
    pitfalls: [
      "chmod -R 777 . is a famous own-goal.",
      "Execute on a folder means ‘you may enter it’, not ‘run it like an app’.",
    ],
    quiz: [
      q("chmod changes…", ["The hostname", "Who may read/write/execute a file", "The date only", "PIDs"], 1, "Locks."),
      q("r, w, x mean…", ["root, wheel, x11", "read, write, execute (or enter folder)", "red, white, extra", "rm, wc, xargs"], 1, "Three verbs."),
      q("u+x adds…", ["Execute for the owner", "Delete for everyone", "Sudo", "A user"], 0, "User plus execute."),
      q("777 on everything is…", ["Best practice", "Dangerously wide open", "Required by ls", "A date format"], 1, "Don’t."),
      q("x on a directory means…", ["Play a video", "Permission to enter/traverse the folder", "Always download", "gzip"], 1, "Traverse."),
    ],
  }),
  cmd({
    id: "chown",
    name: "chown",
    tab: "permissions",
    difficulty: "intermediate",
    metaphor: "chown is writing a new name on the box’s ‘property of’ sticker.",
    explanation:
      "chown user file changes owner. chown user:group file sets both. You usually need sudo because you cannot steal other people’s files. Ownership is who the first ‘u’ in chmod refers to.",
    examples: [
      ["sudo chown you notes.txt", "Make you the owner.", "(ownership updates)"],
      ["sudo chown you:you notes.txt", "Owner and group.", "(both set)"],
    ],
    animationKind: "lock",
    steps: [
      [
        "sudo chown you notes.txt",
        "",
        "The sticker now says Property of you. chmod’s ‘user’ slot follows this sticker.",
        { file: "notes.txt", mode: "owner: you", message: "Property sticker updated" },
      ],
    ],
    pitfalls: [
      "chown without sudo often fails on files you do not own.",
      "chown -R on the wrong path can scramble a system — go slow.",
    ],
    quiz: [
      q("chown changes…", ["File contents", "Ownership (who the file belongs to)", "The kernel", "The prompt color only"], 1, "Owner."),
      q("user:group syntax sets…", ["Two hostnames", "Owner and group together", "A URL", "A pipe"], 1, "Both stickers."),
      q("Why sudo?", ["chown is a joke", "Changing others’ property is an admin act", "Always required for ls", "chown is ping"], 1, "Privilege."),
      q("chmod vs chown?", ["chmod = locks, chown = whose box", "Same", "chown is cat", "chmod names users"], 0, "Lock vs name."),
      q("chown -R / is…", ["A gentle tip", "Extremely dangerous on a real system", "Required weekly", "The same as pwd"], 1, "Don’t."),
    ],
  }),
  cmd({
    id: "umask",
    name: "umask",
    tab: "permissions",
    difficulty: "intermediate",
    metaphor: "umask is the factory default lock style for brand-new boxes you create.",
    explanation:
      "When you touch a file, Linux applies a default permission minus the umask. umask with no arguments prints the mask. Beginners rarely change it; knowing it exists explains why new files are not world-writable.",
    examples: [
      ["umask", "Show the mask.", "0022"],
      ["umask -S", "Symbolic view on some systems.", "u=rwx,g=rx,o=rx"],
    ],
    animationKind: "lock",
    steps: [
      [
        "umask",
        "0022",
        "New files get a standard lock. 0022 often means ‘others cannot write’ — a polite default.",
        { file: "new files", mode: "umask 0022", message: "Others: no write by default" },
      ],
    ],
    pitfalls: [
      "A too-open umask (like 0000) makes new files easy for others to overwrite.",
      "umask is a shell setting — different terminals can differ.",
    ],
    quiz: [
      q("umask affects…", ["Old photos’ pixels", "Default permissions of newly created files", "The hostname", "grep"], 1, "Defaults."),
      q("umask with no args…", ["Deletes files", "Prints the current mask", "Formats /", "Starts ssh"], 1, "Show."),
      q("Why care as a beginner?", ["You must set it hourly", "It explains why new files aren’t world-writable", "It replaces chmod", "It is rm"], 1, "Context."),
      q("0000 umask is…", ["Very open defaults (risky on shared machines)", "Maximum safety", "A date", "Invalid always"], 0, "No mask."),
      q("umask vs chmod?", ["umask is default factory; chmod is a specific box", "chmod is only for users", "Identical", "umask edits text"], 0, "When they apply."),
    ],
  }),
  cmd({
    id: "sudo",
    name: "sudo",
    tab: "permissions",
    difficulty: "intermediate",
    metaphor: "sudo is borrowing the manager’s key for one job, after you prove you are on the list.",
    explanation:
      "sudo command runs that one command as root (by default). You type your password, not root’s, on typical desktops. sudo is powerful: a typo can change the whole system. Prefer the smallest command possible, never sudo rm -rf /.",
    danger: true,
    examples: [
      ["sudo apt update", "Admin-level package refresh (Debian/Ubuntu).", "(asks for your password)"],
      ["sudo -k", "Forget cached sudo password.", "(next sudo asks again)"],
    ],
    animationKind: "lock",
    steps: [
      [
        "sudo whoami",
        "root",
        "For one command, the badge said root. Then you go back to being you. That is the point of sudo.",
        { file: "whoami", mode: "borrowed root key", message: "one job as the manager" },
      ],
    ],
    pitfalls: [
      "sudo is not a magic ‘make errors go away’ prefix.",
      "GUI password prompts and terminal sudo can cache credentials for a few minutes.",
    ],
    quiz: [
      q("sudo runs a command…", ["As a random user", "As an administrator (usually root)", "Only in Photos", "Without permissions ever"], 1, "Borrow key."),
      q("Typical password is…", ["root’s always", "Your user password (on many desktops)", "The Wi-Fi", "hostname"], 1, "Your password."),
      q("sudo whoami prints…", ["you", "root", "nobody", "error always"], 1, "The command sees root."),
      q("Best sudo habit?", ["sudo every ls", "Smallest necessary command; read it twice", "sudo rm -rf / weekly", "Never use man"], 1, "Minimize."),
      q("Not in the sudo club?", ["sudo may refuse", "sudo always works", "Linux reinstalls", "id becomes 0"], 0, "Policy."),
    ],
  }),
  cmd({
    id: "su",
    name: "su",
    tab: "permissions",
    difficulty: "intermediate",
    metaphor: "su is putting on someone else’s entire uniform, not just borrowing a key for one task.",
    explanation:
      "su (substitute user) opens a session as another account. su - (or su -l) is a login shell that loads that user’s environment. Many desktops prefer sudo -i instead of a root password. Know the difference: sudo = one command, su = switch identity.",
    flags: [["-", "Login shell: full switch of environment"]],
    examples: [
      ["su - sam", "Become sam with sam’s environment.", "(password for sam, if allowed)"],
      ["sudo -i", "Interactive root via sudo (common on Ubuntu).", "root#"],
    ],
    animationKind: "lock",
    steps: [
      [
        "su -",
        "Password:\nroot#",
        "You put on the whole uniform. Prompts often change to # for root. Type exit to become you again.",
        { file: "identity", mode: "now root shell", message: "exit returns your clothes" },
      ],
    ],
    pitfalls: [
      "Forgetting you are root in an su session is how accidents happen — watch the prompt.",
      "su without - may keep your old PATH and confuse you.",
    ],
    quiz: [
      q("su means…", ["super unique", "substitute user (switch account)", "sort uniq", "system update"], 1, "Switch."),
      q("sudo vs su?", ["sudo: one job; su: switch identity", "su: one job only", "Identical", "sudo cannot be admin"], 0, "Scope."),
      q("su - is…", ["A minus user", "A login shell with that user’s environment", "Delete account", "chmod"], 1, "Dash = login."),
      q("Leave an su root shell with…", ["unplug", "exit (or Ctrl+D)", "rm -rf", "cd Photos"], 1, "Take uniform off."),
      q("Root prompt often uses…", ["$", "#", "@", "% only on Windows"], 1, "Hash means careful."),
    ],
  }),
];
