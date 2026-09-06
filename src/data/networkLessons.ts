import { cmd, q } from "./helpers";

export const networkLessons = [
  cmd({
    id: "ping",
    name: "ping",
    tab: "network",
    difficulty: "advanced",
    metaphor: "ping is sonar: tap a remote island and listen for the echo.",
    explanation:
      "ping sends tiny packets to a host and reports whether they come back and how long they took. Ctrl+C stops the endless tap on Linux. Failed pings can mean a down host, a firewall, or your own Wi-Fi — not always ‘the website is dead’.",
    flags: [["-c 4", "Send 4 pings then stop (friendly)"]],
    examples: [
      ["ping -c 4 example.com", "Four sonars then quit.", "64 bytes from ... time=20 ms"],
      ["ping -c 3 127.0.0.1", "Tap yourself (loopback).", "time=0.04 ms"],
    ],
    animationKind: "network",
    steps: [
      [
        "ping -c 3 example.com",
        "64 bytes from example.com: seq=1 ttl=54 time=21.2 ms\n64 bytes from example.com: seq=2 ttl=54 time=20.8 ms\n3 packets transmitted, 3 received",
        "Packets swam out and came home. time= is the round trip. 127.0.0.1 is always ‘this computer’.",
        { from: "you", to: "example.com", packets: 3, status: "3 echoes, ~21ms" },
      ],
    ],
    pitfalls: [
      "Some hosts disable ping; silence is not always a corpse.",
      "ping needs network permission on some locked-down systems.",
    ],
    quiz: [
      q("ping checks…", ["Disk space", "Whether a host answers tiny echo packets", "File permissions", "Users"], 1, "Reachability/latency."),
      q("Stop endless ping with…", ["q only", "Ctrl+C", "cd ~", "chmod"], 1, "Interrupt."),
      q("-c 4 means…", ["4 CPUs", "Count: 4 packets", "Column 4", "chmod 4"], 1, "Finite."),
      q("127.0.0.1 is…", ["Google", "This computer (loopback)", "Your printer always", "Invalid"], 1, "Yourself."),
      q("No reply always means the site is down?", ["Yes", "No — firewalls can ignore ping", "Yes if sudo", "Only at night"], 1, "ICMP blocked."),
    ],
  }),
  cmd({
    id: "curl",
    name: "curl",
    tab: "network",
    difficulty: "advanced",
    metaphor: "curl is a grabber arm that fetches a URL and dumps the contents in your terminal (or a file).",
    explanation:
      "curl https://example.com prints the HTML. curl -O url saves using the remote name. curl is also the Swiss army knife for APIs (headers, POST). For a simple download with a progress bar, some people prefer wget.",
    flags: [
      ["-O", "Save to a file named like the URL"],
      ["-L", "Follow redirects"],
      ["-I", "Headers only"],
    ],
    examples: [
      ["curl -I https://example.com", "Just headers.", "HTTP/2 200"],
      ["curl -L -O https://example.com/index.html", "Download a file.", "(saved index.html)"],
    ],
    animationKind: "network",
    steps: [
      [
        "curl -I https://example.com",
        "HTTP/2 200\ncontent-type: text/html",
        "The arm tapped the web door. 200 means OK. -I peeked at the nameplate without hauling the whole house.",
        { from: "you", to: "example.com", packets: 2, status: "HTTP 200" },
      ],
    ],
    pitfalls: [
      "Huge curl output can flood the terminal — redirect to a file.",
      "https certificates can fail on broken clocks (date!).",
    ],
    quiz: [
      q("curl URL…", ["Pings only", "Fetches that URL’s content", "Deletes the site", "Starts ssh"], 1, "Transfer."),
      q("-I is useful to…", ["Install packages", "See headers/status without the whole body", "Ignore TLS", "chmod"], 1, "Head."),
      q("-L means…", ["List files", "Follow redirects", "Localhost only", "Less"], 1, "Location hops."),
      q("curl vs ping?", ["curl talks HTTP(S); ping is echo packets", "Identical", "ping downloads HTML", "curl is only LAN"], 0, "Layer."),
      q("Save a download with…", ["curl -O url (or -o file)", "curl -I only", "killall curl", "umask"], 0, "Output file."),
    ],
  }),
  cmd({
    id: "wget",
    name: "wget",
    tab: "network",
    difficulty: "advanced",
    metaphor: "wget is a dedicated downloader: ‘get that file onto my disk, please, and show a progress bar’.",
    explanation:
      "wget URL saves a file. wget -c continues a partial download. It is less of an API laboratory than curl and more of a ‘fetch this’ truck. May need installing.",
    flags: [
      ["-c", "Continue partial"],
      ["-O name", "Save as name"],
    ],
    examples: [
      ["wget https://example.com/file.zip", "Download file.zip.", "(progress bar)"],
      ["wget -c https://example.com/file.zip", "Resume.", "(continues)"],
    ],
    animationKind: "network",
    steps: [
      [
        "wget https://example.com/file.zip",
        "file.zip          100%[======>]  4.0M  1.2MB/s",
        "The truck backed up to your folder. -c is ‘finish a download that hiccuped’.",
        { from: "example.com", to: "you", packets: 8, status: "saved file.zip" },
      ],
    ],
    pitfalls: [
      "wget and curl overlap — either is fine for simple gets.",
      "Respect websites’ rules; do not hammer servers.",
    ],
    quiz: [
      q("wget is mainly for…", ["Editing text", "Downloading files from URLs", "Listing processes", "chmod"], 1, "Get."),
      q("-c means…", ["create user", "continue/resume", "cat", "clear"], 1, "Resume."),
      q("wget vs curl?", ["wget shines at simple downloads; curl is a broader toolkit", "curl cannot HTTPS", "wget is only ping", "Identical binaries"], 0, "Focus."),
      q("Progress bars help you…", ["See a transfer in motion", "Delete the file", "Become root", "Sort lines"], 0, "Feedback."),
      q("wget is guaranteed installed?", ["Always", "Not always — it can be a package", "Only with ping", "It is part of rm"], 1, "Optional."),
    ],
  }),
  cmd({
    id: "ssh",
    name: "ssh",
    tab: "network",
    difficulty: "advanced",
    metaphor: "ssh is sitting down at another computer’s keyboard through a secure tunnel.",
    explanation:
      "ssh user@hostname logs you into a remote Linux box. First connections ask to trust a fingerprint. Keys (ssh-keygen) beat passwords for daily use. exit logs out. You are still you, just in another building.",
    examples: [
      ["ssh you@kitchen-laptop", "Log into that machine.", "you@kitchen-laptop:~$"],
      ["ssh -p 2222 you@host", "If SSH listens on port 2222.", "(connects)"],
    ],
    animationKind: "network",
    steps: [
      [
        "ssh you@kitchen-laptop",
        "Welcome to Linux\nyou@kitchen-laptop:~$",
        "Your body stayed home; your prompt moved. hostname on that side should say kitchen-laptop.",
        { from: "this PC", to: "kitchen-laptop", packets: 4, status: "logged in as you" },
      ],
    ],
    pitfalls: [
      "Wrong host key warnings can mean a rebuilt server — or an attack. Don’t click through blindly.",
      "Leaving ssh sessions open on shared PCs is like leaving a key in the door.",
    ],
    quiz: [
      q("ssh you@host…", ["Copies files only", "Opens a remote login session", "Pings 4 times", "Formats host"], 1, "Remote shell."),
      q("exit in ssh…", ["Shuts down the remote forever always", "Logs you out of the session", "Deletes host", "Runs rm -rf"], 1, "Leave."),
      q("First connect fingerprint is…", ["Junk", "The remote’s identity — verify if you can", "Your password", "A PID"], 1, "Host key."),
      q("Keys vs passwords?", ["Keys are nicer for daily ssh", "Passwords are more secure always by law", "Keys disable Linux", "ssh forbids keys"], 0, "ssh-keygen later."),
      q("After ssh, whoami is…", ["Always root", "The account you logged in as on the remote", "Your laptop’s BIOS", "empty"], 1, "Remote you."),
    ],
  }),
  cmd({
    id: "scp",
    name: "scp",
    tab: "network",
    difficulty: "advanced",
    metaphor: "scp is handing a box through the same ssh tunnel — secure copy.",
    explanation:
      "scp file user@host:path sends a file. scp user@host:file . fetches it. -r copies folders. Newer setups may prefer rsync or sftp, but scp is the classic mental model: cp across ssh.",
    flags: [["-r", "Recursive folder copy"]],
    examples: [
      ["scp notes.txt you@host:~/notes.txt", "Send a file.", "(100%)"],
      ["scp you@host:~/photo.jpg .", "Fetch into this folder.", "(photo.jpg arrives)"],
    ],
    animationKind: "network",
    steps: [
      [
        "scp notes.txt you@kitchen-laptop:~/",
        "notes.txt          100%",
        "The sticky note traveled the tunnel. Same login idea as ssh, but the job is a copy, not a stay.",
        { from: "notes.txt", to: "kitchen-laptop:~", packets: 5, status: "100% copied" },
      ],
    ],
    pitfalls: [
      "Paths after the colon are on the remote machine.",
      "Quotes help spaces in names.",
    ],
    quiz: [
      q("scp copies…", ["Only RAM", "Files over ssh", "PIDs", "Users"], 1, "Secure copy."),
      q("user@host:~/file is…", ["A local path", "A remote path after the colon", "A grep pattern", "umask"], 1, "Colon = remote."),
      q("Fetch to here uses…", ["scp host:file .", "scp only uploads", "ping -c file", "chmod file host"], 0, "Dot is cwd."),
      q("-r is for…", ["root", "folders", "reverse ping", "random"], 1, "Recursive."),
      q("scp vs ssh?", ["ssh: stay and type; scp: send a box", "scp opens a full desktop always", "Identical", "ssh cannot use keys"], 0, "Session vs copy."),
    ],
  }),
  cmd({
    id: "rsync",
    name: "rsync",
    tab: "network",
    difficulty: "advanced",
    metaphor: "rsync is a smart mover that only packs what changed — a delta suitcase.",
    explanation:
      "rsync -av src/ dest/ syncs folders. Trailing slashes matter: src/ means ‘contents of src’. Over ssh: rsync -av -e ssh dir/ user@host:dir/. Great for backups because repeats are cheap.",
    flags: [
      ["-a", "Archive: keep times, permissions, recurse"],
      ["-v", "Verbose"],
      ["-n", "Dry run (show what would happen)"],
    ],
    examples: [
      ["rsync -av Photos/ backup/Photos/", "Local sync.", "(only new/changed files)"],
      ["rsync -avn Photos/ backup/Photos/", "Rehearsal.", "(no real copy)"],
    ],
    animationKind: "network",
    steps: [
      [
        "rsync -av Photos/ backup/Photos/",
        "cat.jpg\nsunset.png\nsent 2 files",
        "Second run would send almost nothing if nothing changed. -n is a rehearsal — use it before a big backup.",
        { from: "Photos/", to: "backup/", packets: 2, status: "delta copy" },
      ],
    ],
    pitfalls: [
      "Trailing slash mistakes copy a folder inside a folder (matryoshka).",
      "rsync can delete with --delete — rehearsal with -n first.",
    ],
    quiz: [
      q("rsync is smart because…", ["It formats dest", "It can copy only changes", "It is ping", "It kills PIDs"], 1, "Delta."),
      q("-n is…", ["network", "dry run / rehearsal", "nice kill", "numeric chmod"], 1, "Practice."),
      q("-a roughly means…", ["delete all", "archive: recurse + metadata", "append echo", "apt"], 1, "Preserve."),
      q("Trailing slashes…", ["Change what ‘contents vs folder’ means", "Never matter", "Mean sudo", "Mean gzip"], 0, "Subtle."),
      q("--delete is…", ["Gentle always", "Can remove dest files not in src — respect it", "A dry run", "scp only"], 1, "Dangerous extra."),
    ],
  }),
  cmd({
    id: "ip",
    name: "ip",
    tab: "network",
    difficulty: "advanced",
    metaphor: "ip is the modern nametag of your network doors (interfaces) and addresses.",
    explanation:
      "ip addr (or ip a) shows interfaces like eth0/wlan0 and their IPv4/IPv6. ip route shows how packets leave. Older ifconfig still exists on some systems but ip is the current tool.",
    examples: [
      ["ip a", "Addresses on your doors.", "wlan0 ... inet 192.168.1.20/24"],
      ["ip route", "Default way out.", "default via 192.168.1.1"],
    ],
    animationKind: "network",
    steps: [
      [
        "ip a",
        "1: lo: 127.0.0.1\n2: wlan0: 192.168.1.20/24",
        "lo is the indoor mirror. wlan0 is the Wi-Fi door with a local address. 192.168.x is a private home number.",
        { from: "wlan0", to: "LAN", packets: 1, status: "192.168.1.20" },
      ],
    ],
    pitfalls: [
      "Do not ip link set down your only interface unless you can still reach the machine.",
      "VPN adds extra interfaces — that is normal.",
    ],
    quiz: [
      q("ip a shows…", ["apt packages", "Network interfaces and addresses", "Disk df", "history"], 1, "Addresses."),
      q("lo is…", ["A printer", "Loopback (this computer)", "Lost output", "A user"], 1, "127.0.0.1 lives here."),
      q("192.168.x.x is often…", ["A public Google IP always", "A private LAN address", "A PID", "An inode"], 1, "Home network."),
      q("ifconfig vs ip?", ["ip is the modern replacement on Linux", "ifconfig is required in 2030", "ip cannot show addr", "Identical name"], 0, "iproute2."),
      q("ip route default via…", ["The usual gateway (the way out)", "A JPEG", "chmod", "tar"], 0, "Exit door."),
    ],
  }),
  cmd({
    id: "ss",
    name: "ss",
    tab: "network",
    difficulty: "advanced",
    metaphor: "ss is a list of open phone lines: which programs are listening or talking on which ports.",
    explanation:
      "ss -tulpn is a popular snapshot of TCP/UDP listeners and PIDs. ss replaced netstat on many Linuxes. ‘Listening’ means a server door is open on that port.",
    flags: [
      ["-t", "TCP"],
      ["-u", "UDP"],
      ["-l", "Listening"],
      ["-p", "Process"],
      ["-n", "Numeric ports (don’t resolve names)"],
    ],
    examples: [
      ["ss -tulpn", "Listeners + processes.", "tcp LISTEN 0.0.0.0:22 sshd"],
      ["ss -tp", "Established TCP with processes.", "(connections)"],
    ],
    animationKind: "network",
    steps: [
      [
        "ss -tulpn",
        "State   Local Address:Port  Process\nLISTEN  0.0.0.0:22          sshd\nLISTEN  127.0.0.1:631       cupsd",
        "Port 22 is the ssh door. 127.0.0.1:631 is a printer service only at home (this PC). That is how you find who is listening.",
        { from: "sshd", to: ":22", packets: 0, status: "LISTEN" },
      ],
    ],
    pitfalls: [
      "-p may need extra privilege to see every process name.",
      "Open ports are not automatically evil — but unexpected listeners deserve a look.",
    ],
    quiz: [
      q("ss is about…", ["Disk sort", "Sockets: network connections/ports", "Users’ photos", "tar"], 1, "Sockets."),
      q("LISTEN means…", ["A server door is open on a port", "The disk is full", "A job is fg", "grep invert"], 0, "Accepting."),
      q("Port 22 is classically…", ["HTTP", "SSH", "ping", "DNS only"], 1, "ssh."),
      q("ss vs netstat?", ["ss is the modern Linux go-to", "netstat is newer", "ss cannot show ports", "Identical 1980 name"], 0, "Replacement."),
      q("-tulpn is a mnemonic for…", ["TCP/UDP, listening, processes, numeric", "tar unzip ln ping nmap", "top users", "sudo"], 0, "Common bundle."),
    ],
  }),
];
