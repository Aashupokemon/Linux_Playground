import { cmd, q } from "./helpers";

export const diskLessons = [
  cmd({
    id: "df",
    name: "df",
    tab: "disk",
    difficulty: "intermediate",
    metaphor: "df is asking how full each cupboard (filesystem) is.",
    explanation:
      "df -h prints disk free space in human sizes (G, M). 100% on / means the system cupboard is stuffed — that causes weird failures. df does not tell you which file is fat; du does.",
    flags: [
      ["-h", "Human readable"],
      ["-T", "Show filesystem type"],
    ],
    examples: [
      ["df -h", "Space on mounted filesystems.", "/dev/sda1  50G  20G  28G  42% /"],
      ["df -h .", "The cupboard that holds this folder.", "(one row)"],
    ],
    animationKind: "files",
    steps: [
      [
        "df -h",
        "Filesystem  Size  Used  Avail  Use%  Mounted on\n/dev/sda1    50G   20G   28G   42%  /",
        "The main cupboard is 42% full. When it hits 100%, even tiny logs can break the kitchen.",
        { message: "Cupboard / is 42% full (20G of 50G)", items: [{ name: "/", folder: "disk" }] },
      ],
    ],
    pitfalls: [
      "tmpfs and snap mounts make the table noisy — look at / first.",
      "df is about filesystems, not a single folder’s contents.",
    ],
    quiz: [
      q("df -h shows…", ["Running PIDs", "Free/used disk space", "Users", "grep matches"], 1, "Disk free."),
      q("-h means…", ["Hidden", "Human-readable sizes", "Help kill", "Hard links"], 1, "G and M."),
      q("100% on / is…", ["Perfect", "Dangerously full", "A good umask", "Required"], 1, "Leave room."),
      q("Which file is huge? Use…", ["df only", "du (then maybe sort)", "hostname", "chmod"], 1, "du next."),
      q("df vs du?", ["df: cupboards; du: this pile of boxes", "du: whole disks only", "Identical", "df deletes"], 0, "Scope."),
    ],
  }),
  cmd({
    id: "du",
    name: "du",
    tab: "disk",
    difficulty: "intermediate",
    metaphor: "du is weighing one pile of boxes — ‘how heavy is this folder?’",
    explanation:
      "du -sh folder summarizes a directory. du -h --max-depth=1 * lists each child. This is the ‘what ate my disk?’ detective after df looks scary.",
    flags: [
      ["-h", "Human sizes"],
      ["-s", "Summary only (this folder)"],
      ["--max-depth=1", "One level of children (GNU)"],
    ],
    examples: [
      ["du -sh Photos", "How heavy is Photos?", "1.2G\tPhotos"],
      ["du -h --max-depth=1 .", "Each subfolder’s weight.", "800M\t./Videos\n12K\t./notes"],
    ],
    animationKind: "files",
    steps: [
      [
        "du -sh Photos",
        "1.2G\tPhotos",
        "The Photos pile weighs 1.2G. df said the cupboard is filling; du found the heavy pile.",
        {
          items: [
            { name: "Photos 1.2G", folder: "home", match: true },
            { name: "notes.txt 4K", folder: "home" },
          ],
        },
      ],
    ],
    pitfalls: [
      "Permission denied lines mean you cannot see some rooms — sudo du if you must.",
      "du on huge trees takes time.",
    ],
    quiz: [
      q("du -sh Photos…", ["Deletes Photos", "Prints a size summary of Photos", "Mounts Photos", "Pings"], 1, "Weight."),
      q("After df shows full /, next detective is often…", ["whoami", "du on big folders", "date", "echo"], 1, "Find fat piles."),
      q("-s means…", ["sudo", "summarize (don’t list every file)", "sort", "ssh"], 1, "Summary."),
      q("du vs ls -l folder size?", ["ls -l dir size is not ‘contents weight’; du is", "They always match", "ls -l is heavier always", "du cannot see folders"], 0, "Metadata vs contents."),
      q("--max-depth=1 helps by…", ["Formatting disk", "Showing each child folder’s total", "Killing PIDs", "Changing hosts"], 1, "One level."),
    ],
  }),
  cmd({
    id: "free",
    name: "free",
    tab: "disk",
    difficulty: "intermediate",
    metaphor: "free is peeking at the fridge of short-term memory (RAM), not the cupboards (disk).",
    explanation:
      "free -h shows RAM and swap. Linux uses leftover RAM for cache, so ‘available’ matters more than a naive ‘used’. Low available + heavy swap can mean the computer is gasping.",
    flags: [["-h", "Human readable"], ["-s 2", "Refresh every 2 seconds (GNU)"]],
    examples: [
      ["free -h", "Memory snapshot.", "Mem:  16G  4.0G  2.1G  ...  9.0G available"],
      ["free -h -s 2", "Watch memory live.", "(updates)"],
    ],
    animationKind: "intro",
    steps: [
      [
        "free -h",
        "       total  used  free  shared  buff/cache  available\nMem:     16G   4.0G  2.1G    200M        9.9G       11G\nSwap:   4.0G     0B  4.0G",
        "Fridge (RAM) vs basement freezer (swap). Available is the friendly number for beginners.",
        { message: "RAM available ~ 11G  ·  swap unused" },
      ],
    ],
    pitfalls: [
      "A small ‘free’ column is normal because of cache.",
      "Swap in use is not always an emergency, but constant heavy swap is slow.",
    ],
    quiz: [
      q("free -h shows…", ["Disk cupboards", "RAM (and swap) memory", "Users", "Files in Photos"], 1, "Memory."),
      q("Beginners should glance at…", ["Only buff/cache panic", "available", "hostname", "umask"], 1, "Available."),
      q("Swap is…", ["A USB brand", "Overflow space on disk when RAM is tight", "A grep flag", "A user"], 1, "Backup fridge."),
      q("Linux cache using RAM means…", ["You must reboot hourly", "Often healthy; unused RAM would be wasted", "Disk is broken", "chmod 777"], 1, "Cache is OK."),
      q("df vs free?", ["df disk, free RAM", "Same", "free is disk only", "df is RAM only"], 0, "Two resources."),
    ],
  }),
  cmd({
    id: "lsblk",
    name: "lsblk",
    tab: "disk",
    difficulty: "intermediate",
    metaphor: "lsblk is a family tree of physical disks and the partitions (rooms) carved on them.",
    explanation:
      "lsblk lists block devices: sda, nvme0n1, partitions, sizes, and mount points. It is a map before you ever touch fdisk. Beginners use it to answer ‘is my USB even plugged in?’",
    flags: [["-f", "Also show filesystem types and UUIDs"]],
    examples: [
      ["lsblk", "Tree of disks.", "sda  50G\n├─sda1 49G /"],
      ["lsblk -f", "Types and UUIDs.", "sda1 ext4 ... /"],
    ],
    animationKind: "files",
    steps: [
      [
        "lsblk",
        "NAME   SIZE TYPE MOUNTPOINTS\nsda     50G disk\n└─sda1  50G part /",
        "One physical box (sda) with a partition mounted as the house / . USB sticks appear as extra names when plugged in.",
        {
          items: [
            { name: "sda (disk)", folder: "hardware" },
            { name: "sda1 → /", folder: "hardware", match: true },
          ],
        },
      ],
    ],
    pitfalls: [
      "This course will not walk through wiping disks with fdisk/mkfs.",
      "Names like sda vs nvme depend on hardware.",
    ],
    quiz: [
      q("lsblk lists…", ["Processes", "Disks and partitions", "Users", "Packages"], 1, "Block devices."),
      q("A MOUNTPOINT of / means…", ["Unplugged", "That partition is the system’s root house", "A JPEG", "swap only"], 1, "Root fs."),
      q("Check if a USB appeared with…", ["whoami", "lsblk (new name/size)", "chmod 000", "history -c"], 1, "New device."),
      q("lsblk vs df?", ["lsblk: hardware tree; df: space of mounted fs", "df shows sda always better", "Identical", "lsblk is RAM"], 0, "Map vs fullness."),
      q("Beginners should fdisk blindly?", ["Yes weekly", "No — easy to destroy data", "Only with -9", "lsblk requires it"], 1, "Don’t wipe."),
    ],
  }),
  cmd({
    id: "tar",
    name: "tar",
    tab: "disk",
    difficulty: "intermediate",
    metaphor: "tar is packing many boxes into one moving crate (and unpacking later).",
    explanation:
      "tar originally meant tape archive. Today: tar -czf pack.tgz folder packs and compresses. tar -tzf pack.tgz lists. tar -xzf pack.tgz unpacks. Flags stick together: c create, x extract, t list, z gzip, f filename.",
    flags: [
      ["-c", "Create"],
      ["-x", "Extract"],
      ["-t", "List"],
      ["-z", "gzip"],
      ["-f", "The archive file name (keep last among these)"],
    ],
    examples: [
      ["tar -czf photos.tgz Photos", "Pack Photos.", "(photos.tgz appears)"],
      ["tar -tzf photos.tgz", "Peek inside without unpacking.", "Photos/cat.jpg"],
      ["tar -xzf photos.tgz", "Unpack here.", "(Photos/ returns)"],
    ],
    animationKind: "files",
    steps: [
      [
        "tar -czf photos.tgz Photos",
        "",
        "Many pictures sat down in one crate. z squeezed air out. f named the crate photos.tgz.",
        {
          items: [
            { name: "Photos/", folder: "home" },
            { name: "photos.tgz", folder: "home", match: true },
          ],
        },
      ],
    ],
    pitfalls: [
      "Order: -f must be immediately before the filename (or as -f=file in some variants). Classic is tar -czf file.tgz dir",
      "Extracting as root in the wrong folder can sprinkle files everywhere — peek with -t first.",
    ],
    quiz: [
      q("tar -czf a.tgz dir…", ["Deletes dir always", "Creates a compressed archive", "Formats disk", "Starts ssh"], 1, "Create gzip tar."),
      q("-x vs -c?", ["extract vs create", "same", "x is chmod", "c is cat"], 0, "Unpack vs pack."),
      q("-t is useful to…", ["Delete the tar", "List contents before extracting", "Compress twice", "Mount USB"], 1, "Peek."),
      q("f flag is…", ["force rm", "the archive’s filename", "foreground", "free RAM"], 1, "File."),
      q("Unpack with…", ["tar -xzf archive.tgz", "tar -czf only", "killall tar", "df -h tar"], 0, "x z f."),
    ],
  }),
  cmd({
    id: "gzip",
    name: "gzip",
    tab: "disk",
    difficulty: "intermediate",
    metaphor: "gzip is a vacuum bag for a single file: big.txt becomes big.txt.gz and the original is usually gone.",
    explanation:
      "gzip file compresses to file.gz by default and removes the uncompressed original. gunzip (or gzip -d) reverses it. For folders, wrap tar then gzip (tar -z). Keep a copy if you still need the plain file.",
    flags: [
      ["-k", "Keep the original (GNU gzip)"],
      ["-d", "Decompress"],
    ],
    examples: [
      ["gzip -k notes.txt", "Make notes.txt.gz, keep notes.txt.", "(both exist)"],
      ["gzip -d notes.txt.gz", "Restore notes.txt.", "(uncompressed returns)"],
    ],
    animationKind: "files",
    steps: [
      [
        "gzip -k notes.txt",
        "",
        "A vacuum-packed twin appeared. -k kept the original sticky note so beginners do not panic.",
        {
          items: [
            { name: "notes.txt", folder: "home" },
            { name: "notes.txt.gz", folder: "home", match: true },
          ],
        },
      ],
    ],
    pitfalls: [
      "Without -k, gzip removes the original — that surprises people.",
      "gzip is one file; tar is many files.",
    ],
    quiz: [
      q("gzip file usually…", ["Creates file.gz (and may remove file)", "Creates a user", "Mounts disks", "Lists PIDs"], 0, "Compress."),
      q("-k is friendlier because…", ["It keeps the original file", "It kills processes", "It is sudo", "It deletes .gz"], 0, "Keep."),
      q("Folders with gzip alone?", ["gzip wants files; use tar -z for trees", "gzip -r is the only way forever", "Impossible on Linux", "Use ping"], 0, "tar+gzip."),
      q("Decompress with…", ["gzip -d or gunzip", "chmod", "fg", "whoami"], 0, "Inflate."),
      q("tar vs gzip?", ["tar bundles; gzip squeezes (often together)", "gzip bundles folders better", "tar cannot zip", "Identical flags"], 0, "Bundle vs squeeze."),
    ],
  }),
  cmd({
    id: "zip",
    name: "zip",
    tab: "disk",
    difficulty: "intermediate",
    metaphor: "zip is the suitcase format many Windows friends already know.",
    explanation:
      "zip -r archive.zip folder packs a tree into a .zip. unzip unpacks. zip is handy for sharing with non-Linux tools. On Linux, tar.gz is equally common.",
    flags: [["-r", "Recursive folders"]],
    examples: [
      ["zip -r photos.zip Photos", "Suitcase of Photos.", "(photos.zip)"],
      ["unzip -l photos.zip", "List without extracting.", "cat.jpg"],
    ],
    animationKind: "files",
    steps: [
      [
        "zip -r photos.zip Photos",
        "  adding: Photos/cat.jpg",
        "A .zip suitcase appeared. Your cousin on another OS can often open this without tar.",
        {
          items: [
            { name: "Photos/", folder: "home" },
            { name: "photos.zip", folder: "home", match: true },
          ],
        },
      ],
    ],
    pitfalls: [
      "zip/unzip may need installing.",
      "Password zip is not great modern encryption — do not trust it for secrets.",
    ],
    quiz: [
      q("zip -r a.zip dir…", ["Packs dir into a.zip", "Removes Linux", "Is df", "Kills dir’s PIDs"], 0, "Recurse pack."),
      q("zip vs tar.gz?", ["zip is friendlier for mixed-OS sharing; both archive", "tar cannot store files", "zip is only for RAM", "Identical"], 0, "Ecosystem."),
      q("-r is needed because…", ["Folders need recursion", "It means root", "It means reverse sort", "It is rm"], 0, "Tree."),
      q("List a zip with…", ["unzip -l", "chmod -l", "jobs -l", "id -l"], 0, "Peek."),
      q("zip passwords are…", ["Fort Knox", "Better than nothing but not great secrecy", "Required", "The same as sudo"], 1, "Weak for secrets."),
    ],
  }),
  cmd({
    id: "unzip",
    name: "unzip",
    tab: "disk",
    difficulty: "intermediate",
    metaphor: "unzip is opening the suitcase and putting clothes back on hangers.",
    explanation:
      "unzip archive.zip extracts into the current folder unless you pass -d dest. Peek first with unzip -l so you do not explode a mess of files over your home.",
    flags: [
      ["-l", "List"],
      ["-d dir", "Extract into dir"],
    ],
    examples: [
      ["unzip -l photos.zip", "Peek.", "Photos/cat.jpg"],
      ["unzip photos.zip -d /tmp/preview", "Unpack to a sandbox folder.", "(files under preview)"],
    ],
    animationKind: "files",
    steps: [
      [
        "unzip photos.zip -d preview",
        "extracting: Photos/cat.jpg",
        "Clothes came out into preview/, not scattered on the hallway floor. Peek with -l first.",
        {
          items: [
            { name: "photos.zip", folder: "home" },
            { name: "preview/Photos/cat.jpg", folder: "preview", match: true },
          ],
        },
      ],
    ],
    pitfalls: [
      "Zip slips (nasty archives) are a reason to extract in an empty folder.",
      "Overwriting existing files can happen — read prompts.",
    ],
    quiz: [
      q("unzip file.zip…", ["Creates a zip", "Extracts the suitcase", "Is gzip -k", "Mounts sda"], 1, "Open."),
      q("unzip -l…", ["Deletes", "Lists contents", "Compresses", "chown"], 1, "Peek."),
      q("-d preview is safer because…", ["It isolates extracted files in a folder", "It deletes preview", "It is sudo", "It formats"], 0, "Sandbox dir."),
      q("Extract in home without peeking can…", ["Scatter many files among your things", "Always fail", "Only create one file", "Change hostname"], 0, "Mess."),
      q("unzip vs tar -x?", ["Different suitcase formats, same idea: unpack", "unzip only for RAM", "tar cannot unpack", "Identical flags"], 0, "Format."),
    ],
  }),
];
