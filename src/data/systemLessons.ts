import { cmd, q } from "./helpers";

export const systemLessons = [
  cmd({
    id: "uname",
    name: "uname",
    tab: "system",
    difficulty: "advanced",
    metaphor: "uname is the computer reading the label sewn inside its collar: kernel name and version.",
    explanation:
      "uname -a prints a bundle: Linux, hostname, kernel version, architecture. Helpful when installing drivers or reporting a bug. It is not your username (that is whoami).",
    flags: [
      ["-a", "All the common fields"],
      ["-r", "Kernel release only"],
    ],
    examples: [
      ["uname -a", "Collar label.", "Linux kitchen-laptop 6.8.0-40-generic ... x86_64"],
      ["uname -r", "Just the kernel version.", "6.8.0-40-generic"],
    ],
    animationKind: "intro",
    steps: [
      [
        "uname -a",
        "Linux kitchen-laptop 6.8.0-40-generic #40 SMP x86_64 GNU/Linux",
        "Kernel 6.8 on a 64-bit PC named kitchen-laptop. whoami would still just say you.",
        { message: "Linux kernel 6.8 · x86_64 · kitchen-laptop" },
      ],
    ],
    pitfalls: [
      "uname is kernel identity, not ‘Ubuntu vs Fedora’ pretty names (see /etc/os-release).",
      "x86_64 vs aarch64 matters for which packages you download.",
    ],
    quiz: [
      q("uname -a is about…", ["Your login name", "Kernel/system identity", "Disk free", "grep"], 1, "Collar."),
      q("whoami vs uname?", ["whoami person, uname kernel/machine info", "Same", "uname is a user", "whoami is kernel"], 0, "Who vs what OS kernel."),
      q("-r prints…", ["root password", "Kernel release", "RAM", "IPs"], 1, "Version."),
      q("x86_64 means…", ["A printer model", "64-bit PC architecture (typical Intel/AMD)", "A zip flag", "IPv6 only"], 1, "Arch."),
      q("Pretty distro name is better from…", ["uname only", "/etc/os-release (or hostnamectl)", "ps aux", "chmod"], 1, "os-release."),
    ],
  }),
  cmd({
    id: "uptime",
    name: "uptime",
    tab: "system",
    difficulty: "advanced",
    metaphor: "uptime is how long the kitchen has been open without a full closing (reboot).",
    explanation:
      "uptime shows time since boot, how many users are logged in, and load averages (a rough busyness score). Long uptime is a badge of honor until updates need a reboot.",
    examples: [
      ["uptime", "Open since when, plus load.", " 01:40:00 up 3 days,  2 users,  load average: 0.20, 0.15, 0.10"],
      ["uptime -p", "Pretty duration on GNU.", "up 3 days, 4 hours"],
    ],
    animationKind: "intro",
    steps: [
      [
        "uptime",
        "01:40:00 up 3 days, 2 users, load average: 0.20, 0.15, 0.10",
        "Open 3 days. Load 0.20 is a quiet kitchen. Sudden huge loads pair with top to find the busy chef.",
        { message: "up 3 days · load 0.20 0.15 0.10" },
      ],
    ],
    pitfalls: [
      "Load averages need context (CPU count). 1.0 on a single core is busy; on 16 cores it is napping.",
      "Uptime does not mean you skipped security updates.",
    ],
    quiz: [
      q("uptime shows…", ["File sizes", "Time since boot and load", "apt lists", "SSH keys"], 1, "Since boot."),
      q("Load average is…", ["Disk % only", "A busyness hint (not a perfect grade)", "A username", "umask"], 1, "Load."),
      q("2 users in uptime means…", ["Two logged-in sessions/accounts connected", "Two files", "Two disks", "Two PIDs named user"], 0, "Logins."),
      q("Pair a high load with…", ["top/ps", "chmod 777 /", "rm -rf", "date +%F only"], 0, "Find hogs."),
      q("Reboot resets…", ["uptime to near zero", "your username forever", "the internet", "man pages"], 0, "Clock of openness."),
    ],
  }),
  cmd({
    id: "systemctl",
    name: "systemctl",
    tab: "system",
    difficulty: "advanced",
    metaphor: "systemctl is the clipboard of building services: lights, heating, and the web elevator — start, stop, status.",
    explanation:
      "On most modern Linux desktops, systemd runs background services. systemctl status ssh shows if the ssh door is alive. start/stop/enable are admin verbs (often sudo). This is an overview: do not disable random services to ‘go faster’.",
    examples: [
      ["systemctl status ssh", "Is ssh running? (name may be sshd).", "(active/inactive)"],
      ["systemctl list-units --type=service --state=running", "What is alive?", "(a table)"],
    ],
    animationKind: "process",
    steps: [
      [
        "systemctl status ssh",
        "ssh.service — OpenBSD Secure Shell server\n     Active: active (running)",
        "The ssh elevator is running. enable would mean ‘start at boot’. Leave unknown services alone.",
        {
          workers: [{ name: "ssh.service (active)", alive: true }],
        },
      ],
    ],
    pitfalls: [
      "Service names differ (ssh vs sshd).",
      "stop on the wrong service can drop a remote session — including yours.",
    ],
    quiz: [
      q("systemctl manages…", ["JPEG colors", "systemd services (background daemons)", "only tar", "only users’ Photos"], 1, "Services."),
      q("status is the safe verb because…", ["It only inspects", "It deletes the service", "It formats /", "It always sudo-drops SSH"], 0, "Read-only-ish."),
      q("enable typically means…", ["Start at boot", "Uninstall", "chmod +x the kernel", "ping"], 0, "Boot."),
      q("Why sudo for start/stop?", ["Changing system services is admin work", "status always needs it", "Linux jokes", "It is grep"], 0, "Privilege."),
      q("Disable random services to speed up?", ["Great idea", "Risky — you may break login/network", "Required weekly", "Same as sleep"], 1, "Don’t."),
    ],
  }),
  cmd({
    id: "journalctl",
    name: "journalctl",
    tab: "system",
    difficulty: "advanced",
    metaphor: "journalctl is the building’s CCTV log book: what systemd and many programs whispered.",
    explanation:
      "journalctl -e jumps to the end. journalctl -u ssh.service follows one unit. journalctl -f is live (like tail -f). Logs can need sudo. This is how grown-ups debug ‘it didn’t start’.",
    flags: [
      ["-e", "Jump to end"],
      ["-u name", "One unit"],
      ["-f", "Follow"],
      ["-xe", "End + extra explanations (common combo)"],
    ],
    examples: [
      ["journalctl -u ssh.service -e", "Recent ssh logs.", "(lines of log)"],
      ["journalctl -f", "Live stream.", "(new lines appear)"],
    ],
    animationKind: "files",
    steps: [
      [
        "journalctl -u ssh.service -n 5",
        "sshd[1022]: Server listening on 0.0.0.0 port 22",
        "Five latest whispers from the ssh service. -f would keep the CCTV live. q in some pagers still quits.",
        {
          items: [{ name: "ssh.service log", match: true }],
          message: "listening on port 22",
        },
      ],
    ],
    pitfalls: [
      "Huge journals — filter with -u and --since today.",
      "Privacy: logs can contain paths and usernames.",
    ],
    quiz: [
      q("journalctl reads…", ["Only Photos", "the systemd journal (logs)", "apt packages as files", "PIDs to kill"], 1, "Logs."),
      q("-f is like…", ["fg", "tail -f (follow)", "free -h", "find"], 1, "Live."),
      q("-u ssh.service…", ["Uninstalls ssh", "Filters to that unit", "Uploads logs", "Unzips"], 1, "Unit."),
      q("Need sudo sometimes because…", ["Logs can be privileged", "journalctl is rm", "It pings", "It is always public"], 0, "Access."),
      q("Debug a failed service with…", ["journalctl -u that.service", "chmod 777 /var", "rm -rf /var/log", "whoami loop"], 0, "Read why."),
    ],
  }),
  cmd({
    id: "apt",
    name: "apt",
    tab: "system",
    difficulty: "advanced",
    metaphor: "apt is the grocery app for Debian/Ubuntu: search, install, update the catalog.",
    explanation:
      "Linux software often comes as packages. On Debian/Ubuntu: sudo apt update refreshes the catalog, sudo apt install tree buys a tool. Other families use dnf, pacman, zypper — same idea, different store. Prefer the store over random website installers.",
    examples: [
      ["apt search tree", "Look in the catalog (may not need sudo).", "(descriptions)"],
      ["sudo apt update", "Refresh catalog.", "(indexes download)"],
      ["sudo apt install tree", "Install tree.", "(asks to confirm)"],
    ],
    animationKind: "files",
    steps: [
      [
        "sudo apt install tree",
        "Installing tree...\nSetting up tree (2.1.1)",
        "The grocery bag now includes tree. Fedora would say dnf install instead — same shopping trip, different supermarket.",
        {
          items: [{ name: "tree (package)", folder: "store", match: true }],
          message: "Debian/Ubuntu supermarket",
        },
      ],
    ],
    pitfalls: [
      "update vs upgrade: update = catalog, upgrade = apply newer packages.",
      "Do not mix random .deb from the internet with no review.",
    ],
    quiz: [
      q("apt is used on…", ["Only Windows", "Debian/Ubuntu-style systems", "Only phones", "Only BSD"], 1, "Family."),
      q("apt update…", ["Installs every app", "Refreshes the package catalog", "Deletes /", "Changes hostname"], 1, "Index."),
      q("install a program with…", ["sudo apt install name", "chmod name", "ping name", "fg name"], 0, "Install."),
      q("Other distros?", ["dnf, pacman, etc. — same idea", "Nobody else has packages", "Only tar.gz forever", "apt runs on Fedora identically"], 0, "Stores differ."),
      q("Prefer apt over random downloaders because…", ["Updates and trust chains are built in", "apt cannot install", "Random is safer", "apt is ping"], 0, "Store."),
    ],
  }),
  cmd({
    id: "dnf",
    name: "dnf",
    tab: "system",
    difficulty: "advanced",
    metaphor: "dnf is Fedora/RHEL’s grocery app — same shopping, different supermarket chain.",
    explanation:
      "sudo dnf install tree, dnf search tree, sudo dnf upgrade. If you learned apt, map the verbs. Do not run apt on Fedora or dnf on Ubuntu and expect joy.",
    examples: [
      ["dnf search tree", "Catalog search.", "(matches)"],
      ["sudo dnf install tree", "Install.", "(transaction)"],
    ],
    animationKind: "files",
    steps: [
      [
        "sudo dnf install tree",
        "Installing: tree\nComplete!",
        "Same tree command, Fedora bags. Match the store to your distro (see /etc/os-release).",
        {
          items: [{ name: "tree (dnf)", folder: "fedora", match: true }],
          message: "Fedora/RHEL supermarket",
        },
      ],
    ],
    pitfalls: [
      "Copy-pasting Ubuntu apt guides onto Fedora wastes an afternoon.",
      "Enterprise distros may use versioned dnf modules — read the docs when it yells.",
    ],
    quiz: [
      q("dnf belongs with…", ["Ubuntu only", "Fedora/RHEL family", "Windows Store", "only Alpine"], 1, "RPM world."),
      q("dnf install is like…", ["apt install", "chmod", "useradd only", "ss -l"], 0, "Map verbs."),
      q("Use apt on Fedora?", ["Usually the wrong store", "Required", "It is an alias", "It replaces systemd"], 0, "Mismatch."),
      q("dnf search…", ["Needs to format /", "Finds packages by name/description", "Kills dnf", "Is ping"], 1, "Search."),
      q("Why two lessons apt and dnf?", ["So you pick the supermarket that matches your kitchen", "They are identical binaries", "One is a user", "dnf is a disk"], 0, "Distros."),
    ],
  }),
  cmd({
    id: "useradd",
    name: "useradd",
    tab: "system",
    difficulty: "advanced",
    metaphor: "useradd is printing a new employee badge (an account) — usually an admin job.",
    explanation:
      "sudo useradd -m sam creates sam and a home with -m. Then passwd sam sets a password. Many desktops prefer adduser (friendlier) or a GUI. Never casually create extra root-like users.",
    flags: [
      ["-m", "Create a home directory"],
      ["-s /bin/bash", "Login shell"],
    ],
    examples: [
      ["sudo useradd -m sam", "New account + home.", "(sam exists)"],
      ["sudo passwd sam", "Set sam’s password.", "(prompt twice)"],
    ],
    animationKind: "lock",
    steps: [
      [
        "sudo useradd -m sam",
        "",
        "A new badge and an empty apartment /home/sam. Next: a password, then groups if needed.",
        { file: "sam", mode: "new uid", message: "/home/sam created" },
      ],
    ],
    pitfalls: [
      "useradd vs adduser: adduser is a helper on Debian.",
      "Accounts without -m can confuse beginners (no home).",
    ],
    quiz: [
      q("useradd creates…", ["A zip", "A user account", "A process named user", "A disk"], 1, "Account."),
      q("-m is important because…", ["It makes a home folder", "It is mkdir /", "It is mandatory ping", "It deletes sam"], 0, "Home."),
      q("Needs sudo?", ["Usually yes", "Never", "Only on Fridays", "useradd is grep"], 0, "Admin."),
      q("Next step often…", ["passwd sam", "rm sam", "ping sam", "tar sam"], 0, "Password."),
      q("Casual extra admin users?", ["Bad idea", "Best practice hourly", "Required by ls", "Same as groups you"], 0, "Least privilege."),
    ],
  }),
  cmd({
    id: "passwd",
    name: "passwd",
    tab: "system",
    difficulty: "advanced",
    metaphor: "passwd is changing the combination on your badge — or an admin changing someone else’s.",
    explanation:
      "passwd with no arguments changes your password (old then new). sudo passwd sam resets sam. Strong unique passwords (or SSH keys) matter more than clever command flags.",
    examples: [
      ["passwd", "Change your own.", "(current + new twice)"],
      ["sudo passwd sam", "Admin reset.", "(new twice; may skip old)"],
    ],
    animationKind: "lock",
    steps: [
      [
        "passwd",
        "Current password:\nNew password:\nRetype new password:\npasswd: password updated successfully",
        "The combination changed. You will not see stars in some terminals — type carefully anyway.",
        { file: "your badge", mode: "new combination", lock: "updated" },
      ],
    ],
    pitfalls: [
      "Password on the command line (passwd foo) is not how it works — it prompts.",
      "History should never contain passwords.",
    ],
    quiz: [
      q("passwd with no args…", ["Prints /etc/passwd on screen always", "Changes your password via prompts", "Creates a user", "Opens ssh"], 1, "Self."),
      q("sudo passwd sam…", ["Deletes sam", "Resets sam’s password", "Logs in as sam always", "Is ping"], 1, "Admin reset."),
      q("Type passwords as echo hello?", ["No — they leak into history/screen", "Yes, best practice", "Only with |", "Only on Fridays"], 0, "Secrets."),
      q("SSH keys vs passwords for servers?", ["Keys are often nicer for ssh", "Passwords required by physics", "Keys disable passwd", "passwd uninstalls ssh"], 0, "Auth."),
      q("/etc/passwd is…", ["Usually public usernames (hashes live in shadow)", "Everyone’s secret passwords in clear", "A JPEG", "apt"], 0, "Name is historical."),
    ],
  }),
  cmd({
    id: "crontab",
    name: "crontab",
    tab: "system",
    difficulty: "advanced",
    metaphor: "crontab is a repeating sticky note: ‘every morning at 7, run this command’.",
    explanation:
      "cron is a scheduler. crontab -l lists your jobs. crontab -e edits them. A line like 0 7 * * * /home/you/backup.sh means 07:00 daily. Output mail and paths surprise beginners — use full paths. systemd timers are a modern alternative.",
    flags: [
      ["-l", "List"],
      ["-e", "Edit"],
    ],
    examples: [
      ["crontab -l", "Show your schedule.", "0 7 * * * /home/you/backup.sh"],
      ["crontab -e", "Edit in $EDITOR.", "(opens editor)"],
    ],
    animationKind: "intro",
    steps: [
      [
        "crontab -l",
        "0 7 * * * /home/you/backup.sh",
        "At 07:00 every day the backup script runs even if you are asleep. Five time fields: minute hour day-of-month month weekday.",
        { message: "07:00 daily → backup.sh" },
      ],
    ],
    pitfalls: [
      "cron’s PATH is tiny — write /usr/bin/command not command.",
      "Do not schedule rm experiments.",
    ],
    quiz: [
      q("crontab -l…", ["Logs you in", "Lists your cron jobs", "Lists disks", "Starts top"], 1, "List."),
      q("0 7 * * * means roughly…", ["07:00 every day", "7th of never", "PID 7", "chmod 7"], 0, "Hour 7."),
      q("Use full paths because…", ["cron has a small PATH", "Linux forbids short names in cron by law", "It is grep", "ssh requires it"], 0, "Environment."),
      q("-e opens…", ["An editor for the schedule", "Ethernet", "echo", "exit"], 0, "Edit."),
      q("systemd timers vs cron?", ["Timers are a modern sibling; cron is classic", "cron is only for Windows", "Timers delete cron", "Identical files"], 0, "Both valid."),
    ],
  }),
];
