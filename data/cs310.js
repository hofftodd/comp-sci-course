CSA.addCourse({
  id: "cs310",
  code: "CS 310",
  title: "Operating Systems",
  credits: 4,
  kind: "required",
  term: "y3f",
  summary: "What sits between programs and hardware: how an operating system shares one machine among many programs (processes, system calls, CPU scheduling), lets them run at once safely (threads, locks, condition variables, semaphores, deadlock), gives each its own memory (paging, page replacement), keeps data safe on disk (file systems, journaling), and drives devices and virtual machines. C examples were compiled and run with GCC; every graded problem is a Python simulation of a real mechanism.",
  prereqs: ["CS 210 Computer Systems I", "CS 230 Computer Architecture and Digital Logic", "CS 201 Data Structures"],
  outcomes: [
    "Explain how the kernel, user mode, system calls, interrupts and traps let an operating system control a machine while programs run on it directly",
    "Create and manage processes with fork, exec and wait, and explain what a shell does with a command line",
    "Simulate and compare CPU scheduling policies using turnaround and response time",
    "Recognize race conditions and fix them with locks, condition variables and semaphores",
    "Explain how locks are built from atomic instructions, and when to spin or block",
    "Detect, prevent and avoid deadlock, including with the banker's algorithm",
    "Translate addresses through multi-level page tables and compare page-replacement policies",
    "Describe how a file system stores files with inodes and blocks, resolves paths and survives crashes",
    "Estimate storage performance from device characteristics, and explain RAID, virtual machines and containers"
  ],
  rubric: {
    criteriaFor: "problem sets and projects",
    assessments: [
      { name: "Lesson quizzes", weight: 10, desc: "The quiz at the end of each lesson. Your best attempt counts, and your lowest quiz score is dropped." },
      { name: "Problem sets", weight: 25, desc: "Weekly: the lesson's programming problems, plus written exercises such as Gantt charts, interleavings, page-table walks and crash scenarios." },
      { name: "Projects", weight: 30, desc: "Four projects in C on Linux: a shell with pipes and redirection, a thread-safe bounded queue and a thread pool, a page-replacement simulator driven by real memory traces, and a small file system with a journal that survives simulated crashes." },
      { name: "Midterm exam", weight: 15, desc: "Processes, scheduling and concurrency (lessons 1–5)." },
      { name: "Final exam", weight: 20, desc: "Cumulative, with emphasis on memory, file systems, storage and virtualization (lessons 6–8)." }
    ],
    criteria: [
      { name: "Correctness", desc: "Does it work, including under concurrency and failure?", levels: [
        "Correct on every test, including adversarial interleavings, edge cases and crashes at any point.",
        "Correct in normal use; a rare interleaving or edge case fails.",
        "Works only in simple, single-threaded cases.",
        "Doesn't work." ] },
      { name: "Design", desc: "Is it simple and well structured?", levels: [
        "Clear invariants, small critical sections, resources always released; no needless complexity.",
        "Sound, with some redundancy or overly broad locking.",
        "Works but is hard to follow, or leaks resources.",
        "No discernible structure." ] },
      { name: "Analysis", desc: "Is the reasoning about performance and correctness explained?", levels: [
        "Explains why it is correct (which invariant each lock protects) and what it costs, with measurements or numbers.",
        "Mostly correct reasoning, with gaps.",
        "Claims without reasons.",
        "No analysis." ] },
      { name: "Presentation", desc: "Can a reader follow it?", levels: [
        "Readable code and a clear write-up with diagrams where they help.",
        "Mostly clear.",
        "Hard to follow.",
        "Unreadable." ] }
    ],
    scale: [["A", "93–100"], ["A−", "90–92"], ["B+", "87–89"], ["B", "83–86"], ["B−", "80–82"], ["C+", "77–79"], ["C", "73–76"], ["C−", "70–72"], ["D", "60–69"], ["F", "below 60"]],
    policies: [
      "<b>Tools:</b> projects use C with GCC on Linux (a free virtual machine or container works on any computer), plus gdb, valgrind and strace. The graded problems on this site use Python, which runs in your browser.",
      "<b>Collaboration:</b> discuss ideas freely; write your own code and name your collaborators. Concurrency bugs are easy to copy and hard to explain, so projects include short oral checks.",
      "<b>AI assistants:</b> you may use them to explain concepts and error messages, and must say how. Code you submit must be your own, and you must be able to explain every line.",
      "<b>Late work:</b> four late days for projects, used in whole days; then 10% a day."
    ]
  },
  units: [
    {
      id: "os1",
      title: "What an operating system does",
      minutes: 90,
      summary: "The operating system as referee, illusionist and glue; user mode and kernel mode; system calls, interrupts and traps; the process abstraction and the process table; and creating processes with fork, exec and wait.",
      notes: `
<p>CS 210 Lesson 8 showed a C program calling <code>fork</code>, <code>exec</code> and <code>waitpid</code>, and said that a <strong>system call</strong> switches the processor into a privileged mode to run kernel code. CS 230 Lesson 7 showed how page tables give each process its own memory. This course is about the software that uses those mechanisms: the <strong>operating system</strong> (OS).</p>

<h3>Three jobs</h3>
<p>An operating system does three jobs.</p>
<ul>
<li><strong>Referee.</strong> Many programs share one machine. The OS decides who gets the processor, how much memory each gets, and who may open which file, and it stops one program from wrecking another.</li>
<li><strong>Illusionist.</strong> It gives each program a simpler machine than the real one: a processor of its own (even when there are hundreds of programs and eight cores), a large private memory (even when RAM is small and shared), and files with names (when the disk really holds numbered blocks). These illusions are called <strong>virtualization</strong>.</li>
<li><strong>Glue.</strong> It provides common services, such as files, network connections and windows, so that every program doesn't reinvent them, and programs can work together through them (a pipe connects two programs' standard input and output).</li>
</ul>
<p>The core of the OS that runs with full privileges is the <strong>kernel</strong>. Everything else (the shell, compilers, your programs, even much of what users think of as "the OS", like the desktop) runs as ordinary programs on top of it.</p>

<h3>User mode and kernel mode</h3>
<p>The OS must stay in control while programs run directly on the processor at full speed. (Interpreting every instruction would be safe but far too slow.) Hardware makes this possible with a <strong>mode bit</strong>. In <strong>kernel mode</strong> the processor can do anything: change page tables, talk to devices, disable interrupts. In <strong>user mode</strong>, those <em>privileged instructions</em> are forbidden, and memory pages not marked "user" in the page table (CS 230 Lesson 7) can't be touched. If a user program tries, the hardware stops it and runs the kernel instead. RISC-V calls these modes U (user), S (supervisor, where the kernel runs) and M (machine); x86 calls them rings 3 and 0.</p>
<p>A user program can enter the kernel in only three ways, and each one jumps to an address the kernel chose in advance (at boot, the kernel fills a table of handler addresses, the <strong>trap table</strong> or interrupt vector):</p>
<ul>
<li>A <strong>system call</strong>: the program deliberately executes a special instruction (<code>ecall</code> on RISC-V, <code>syscall</code> on x86-64) after putting a system-call number and arguments in registers.</li>
<li>An <strong>exception</strong> (also called a <strong>trap</strong> or fault): the instruction did something the hardware won't do alone, such as dividing by zero, touching an unmapped page (a page fault) or running a privileged instruction.</li>
<li>An <strong>interrupt</strong>: a device signals the processor, independently of what the program is doing. A disk says "your data is ready"; the network card says "a packet arrived"; and a <strong>timer</strong> interrupts every few milliseconds.</li>
</ul>
<p>In each case the hardware saves the program's registers (at least its program counter), switches to kernel mode and jumps to the handler. When the kernel is done, a special return instruction (<code>sret</code> on RISC-V, <code>sysret</code> or <code>iret</code> on x86-64) restores user mode and resumes the program. The timer is the referee's whistle: because it fires no matter what, a program stuck in <code>while (1) {}</code> can't keep the processor forever. On each timer interrupt the kernel may decide to switch to another program. This is how the OS regains control without trusting programs to give it back, called <strong>limited direct execution</strong>.</p>
<figure class="fig"><svg viewBox="0 0 460 200" width="460" role="img" aria-label="A timeline: a user program runs in user mode, executes a system call, the kernel runs the handler in kernel mode, then returns to the program in user mode.">
<g class="box"><rect x="20" y="30" width="130" height="40"/><rect x="310" y="30" width="130" height="40"/></g>
<g class="hl"><rect x="165" y="120" width="130" height="40"/></g>
<g class="text"><text x="85" y="55" text-anchor="middle">program runs</text><text x="375" y="55" text-anchor="middle">program resumes</text><text x="230" y="145" text-anchor="middle">handler runs</text>
<text x="10" y="20" class="m">user mode</text><text x="10" y="190" class="m">kernel mode</text>
<text x="10" y="112" class="m">ecall: save PC, switch mode</text><text x="450" y="112" class="m" text-anchor="end">sret: restore, switch back</text></g>
<g class="ln"><line x1="150" y1="70" x2="180" y2="120"/><line x1="280" y1="120" x2="310" y2="70"/><line x1="10" y1="95" x2="450" y2="95"/></g>
</svg><figcaption>A system call crosses the line between user mode and kernel mode twice. Interrupts and exceptions cross it the same way, but not at the program's request.</figcaption></figure>
<p>A system call costs more than a function call: on a modern processor, entering and leaving the kernel takes on the order of a hundred nanoseconds to a microsecond, hundreds of cycles, plus cache and TLB disruption. That's why the C library's <code>printf</code> collects output in a buffer and makes one <code>write</code> system call for many characters (CS 210 Lesson 8's <code>fflush</code> story).</p>

<h3>The process</h3>
<p>A <strong>process</strong> is a running program: CS 210 Lesson 8's definition. Now we can say what the kernel keeps about each one, in a record called its <strong>process control block</strong> (PCB). The table of all PCBs is the <strong>process table</strong>. A PCB holds:</p>
<ul>
<li>the process ID (PID) and the parent's PID;</li>
<li>the <strong>state</strong>: <em>running</em> (on a processor now), <em>ready</em> (could run, waiting for a processor), <em>blocked</em> (waiting for something, such as a disk read or a child to exit), or <em>zombie</em> (finished, but its parent hasn't collected its exit status yet);</li>
<li>saved registers, used when the process isn't running;</li>
<li>a pointer to its page table (its address space);</li>
<li>its open files (the file descriptor table), current directory, user ID and permissions.</li>
</ul>
<p>Switching the processor from one process to another is a <strong>context switch</strong>: the kernel saves the current process's registers into its PCB, picks another process (the next lesson's topic), loads that process's registers and page table, and returns to user mode in it. Each process seems to run continuously, but in fact runs in slices of a few milliseconds.</p>
<p>A process moves between states as events happen: <em>ready → running</em> when the scheduler picks it, <em>running → ready</em> when the timer takes the processor away, <em>running → blocked</em> when it asks for something slow, <em>blocked → ready</em> when that thing arrives (usually signalled by an interrupt), and <em>running → zombie</em> when it exits.</p>

<h3>fork, exec and wait</h3>
<p>Unix creates processes with three system calls, which CS 210 Lesson 8 met briefly:</p>
<ul>
<li><code>fork()</code> creates a child that is a copy of the caller: same code, a copy of all its memory, copies of its open file descriptors. Both continue from the return of <code>fork</code>, which returns 0 in the child and the child's PID in the parent (or −1 if it failed).</li>
<li><code>exec</code> (the <code>execve</code> system call and its library wrappers) replaces the calling process's program with a new one: new code, a fresh stack and heap. The PID and open file descriptors stay.</li>
<li><code>wait</code> or <code>waitpid</code> blocks the parent until a child exits, then returns its PID and exit status, and the kernel removes the child's PCB.</li>
</ul>
<p>"A copy of all its memory" is meant literally: after <code>fork</code>, the two processes have separate address spaces, and a change in one is invisible to the other.</p>
<pre data-label="C"><code>#include &lt;stdio.h&gt;
#include &lt;unistd.h&gt;
#include &lt;sys/wait.h&gt;

int main(void) {
    int x = 100;
    pid_t pid = fork();
    if (pid &lt; 0) {
        perror("fork");
        return 1;
    }
    if (pid == 0) {                       /* child */
        x = x + 1;
        printf("child:  x = %d\\n", x);
        return 7;
    }
    int status;
    waitpid(pid, &amp;status, 0);             /* parent */
    printf("parent: x = %d, child's exit code %d\\n", x, WEXITSTATUS(status));
    return 0;
}</code></pre>
<pre data-label="Output"><code>child:  x = 101
parent: x = 100, child's exit code 7</code></pre>
<p>Between the child's exit and the parent's <code>waitpid</code>, the child is a zombie: its memory is gone but its PCB remains, holding the exit code 7. If a parent exits without waiting, its children become <em>orphans</em> and are adopted by process 1 (<code>init</code>, or <code>systemd</code> on most Linux systems), which waits for them so that zombies don't pile up.</p>
<p>Why split creation into <code>fork</code> and <code>exec</code>? Because the code between them, running in the child, can set up the new program's environment with ordinary system calls before the program starts. Here is a complete, if tiny, shell that runs commands and supports output redirection with <code>&gt;</code>:</p>
<pre data-label="C"><code>#include &lt;stdio.h&gt;
#include &lt;string.h&gt;
#include &lt;fcntl.h&gt;
#include &lt;unistd.h&gt;
#include &lt;sys/wait.h&gt;

int main(void) {
    char line[256];
    while (printf("$ "), fflush(stdout), fgets(line, sizeof line, stdin)) {
        char *argv[16], *out = NULL;
        int argc = 0;
        for (char *w = strtok(line, " \\n"); w &amp;&amp; argc &lt; 15; w = strtok(NULL, " \\n")) {
            if (strcmp(w, "&gt;") == 0)
                out = strtok(NULL, " \\n");     /* the next word is the file */
            else
                argv[argc++] = w;
        }
        argv[argc] = NULL;
        if (argc == 0)
            continue;
        pid_t pid = fork();
        if (pid == 0) {                         /* child: set up, then become the command */
            if (out) {
                int fd = open(out, O_WRONLY | O_CREAT | O_TRUNC, 0644);
                dup2(fd, 1);                    /* descriptor 1 now means the file */
                close(fd);
            }
            execvp(argv[0], argv);
            perror(argv[0]);
            return 127;
        }
        int status;
        waitpid(pid, &amp;status, 0);
        printf("[exit %d]\\n", WEXITSTATUS(status));
    }
    printf("\\n");
    return 0;
}</code></pre>
<pre data-label="Terminal"><code>$ echo hello world
hello world
[exit 0]
$ echo saved &gt; note.txt
[exit 0]
$ cat note.txt
saved
[exit 0]
$ nosuchcmd
nosuchcmd: No such file or directory
[exit 127]</code></pre>
<p>The new pieces: the <code>while</code> condition uses C's comma operator, which evaluates each expression in turn and uses the last one's value, so the loop prints a prompt and stops when <code>fgets</code> returns <code>NULL</code> at the end of input. <code>strtok(line, " \\n")</code> returns the first word of <code>line</code> (it writes a terminator after each word, changing the buffer), and <code>strtok(NULL, " \\n")</code> returns the next word each time, or <code>NULL</code> when there are none. <code>execvp</code> is <code>execlp</code> from CS 210 with the arguments in an array (the <code>v</code>), ending in <code>NULL</code>. <code>open</code> returns a new file descriptor for the file (<code>O_CREAT</code> creates it, <code>O_TRUNC</code> empties it, and <code>0644</code> is its permission bits, in octal). <code>dup2(fd, 1)</code> makes descriptor 1 refer to the same open file as <code>fd</code>. The child redirects its own standard output and then execs <code>echo</code>, which writes to descriptor 1 as always, never knowing it's a file. A pipe works the same way, with <code>pipe()</code> creating a connected pair of descriptors and each child moving one end onto 0 or 1. (Exit code 127 is the shell convention for "command not found".)</p>
<p>Copying all of a process's memory on every <code>fork</code>, only to throw it away at <code>exec</code>, sounds wasteful. Lesson 6 shows how <em>copy-on-write</em> makes <code>fork</code> cheap.</p>
`,
      terms: [
        ["Operating system", "Software that manages a computer's hardware and provides programs with abstractions such as processes, memory and files."],
        ["Kernel", "The part of the operating system that runs in kernel mode with full access to the hardware."],
        ["Kernel mode and user mode", "Processor modes; privileged instructions and kernel-only pages are allowed only in kernel mode."],
        ["System call", "A request from a program to the kernel, made with a special instruction that switches to kernel mode."],
        ["Exception (trap)", "A transfer to the kernel caused by the current instruction, such as a page fault or division by zero."],
        ["Interrupt", "A signal from a device, such as the timer or a disk, that makes the processor run a kernel handler."],
        ["Trap table", "The table of handler addresses, set up by the kernel at boot, that system calls, exceptions and interrupts jump to."],
        ["Limited direct execution", "Running programs directly on the processor while the hardware's modes and timer keep the OS in control."],
        ["Process control block", "The kernel's record of a process: PID, state, saved registers, address space, open files."],
        ["Context switch", "Saving one process's registers and loading another's, so the processor runs a different process."],
        ["Zombie", "A process that has exited but whose exit status hasn't yet been collected by its parent's wait."],
        ["fork / exec / wait", "Unix's calls to copy a process, replace its program, and wait for a child to exit."]
      ],
      quiz: [
        { q: "Which of these can a program do in user mode?", choices: ["Disable interrupts", "Change its page table", "Execute an ecall instruction", "Write to a device's registers directly"], answer: 2, why: "ecall is how a user program asks for a system call; the others are privileged." },
        { q: "What makes sure a program in an infinite loop can't keep the processor forever?", choices: ["The compiler", "The timer interrupt, which returns control to the kernel", "The program's own exit", "The page table"], answer: 1, why: "The timer fires regardless of what the program does, and the kernel may then switch to another process." },
        { q: "A program divides by zero. What kind of entry into the kernel is this?", choices: ["A system call", "An exception (trap) caused by the instruction", "A device interrupt", "A context switch"], answer: 1, why: "It is caused by the current instruction, not requested and not from a device." },
        { q: "After fork, the child sets x = 5. What does the parent see in its x?", choices: ["5", "Its own value, unchanged", "It depends on timing", "0"], answer: 1, why: "The child has a separate copy of the address space." },
        { q: "What does exec keep from the old program?", choices: ["Its code", "Its stack", "Its process ID and open file descriptors", "Its heap"], answer: 2, why: "exec replaces the program and memory, but it's the same process, so the PID and descriptors stay. That's what makes redirection work." },
        { q: "A child has exited but its parent hasn't called wait. What state is the child in?", choices: ["Ready", "Blocked", "Zombie", "Running"], answer: 2, why: "Its PCB is kept, holding the exit status, until the parent reaps it." }
      ],
      practice: [
        {
          q: `<p>How many lines does this program print, and why? (Assume no call fails.)</p><pre data-label="C"><code>int main(void) {
    fork();
    fork();
    fork();
    printf("hi\\n");
    return 0;
}</code></pre>`,
          hint: `<p>Count processes after each <code>fork</code>: every process that exists runs the next one.</p>`,
          a: `<p>Each <code>fork</code> doubles the number of processes running the rest of the code: 1 → 2 → 4 → 8. All 8 print, so 8 lines. In general <em>n</em> forks in a row give 2<sup><em>n</em></sup> processes.</p>`
        },
        {
          q: `<p>For each event, say whether it enters the kernel by a system call, an exception or an interrupt: (a) a program calls <code>read</code> on a file; (b) a program dereferences a NULL pointer; (c) a key is pressed while a program computes; (d) the 4-millisecond timer fires; (e) a program touches a page of its heap that is still on disk.</p>`,
          a: `<p>(a) System call. (b) Exception: a page fault on an unmapped address, which the kernel turns into a segmentation fault. (c) Interrupt, from the keyboard controller. (d) Interrupt. (e) Exception: a page fault, which the kernel handles by loading the page and restarting the instruction (Lesson 6); the program never knows.</p>`
        },
        {
          q: `<p>Explain, step by step, what the shell in the notes does for <code>echo saved &gt; note.txt</code>, naming each system call and which process makes it.</p>`,
          a: `<p>The shell (parent) reads the line with <code>read</code> (inside <code>fgets</code>) and splits it into argv = ["echo", "saved"] and out = "note.txt". It calls <code>fork</code>. In the child: <code>open("note.txt", ...)</code> returns a descriptor, say 3; <code>dup2(3, 1)</code> makes 1 refer to the file; <code>close(3)</code>; <code>execve</code> (through <code>execvp</code>, which searches the command folders) replaces the child's program with <code>echo</code>, which calls <code>write(1, "saved\\n", 6)</code>, landing in the file, and exits with 0. Meanwhile the parent is blocked in <code>waitpid</code>; it wakes, reads exit status 0, and prints <code>[exit 0]</code> with a <code>write</code> to its own descriptor 1, still the terminal.</p>`
        },
        {
          q: `<p>Why must the redirection happen in the child, between <code>fork</code> and <code>exec</code>, rather than in the shell before <code>fork</code> or after <code>exec</code>?</p>`,
          a: `<p>Before <code>fork</code>, the shell would redirect its own standard output, so its prompts would go into the file too (it would have to undo it afterwards). After <code>exec</code>, the shell's code is gone: the child is running <code>echo</code>, which knows nothing about redirection. Between them, the child is still running shell code but its changes affect only itself, and <code>exec</code> keeps the descriptors, so the new program inherits them.</p>`
        }
      ],
      sources: ["ostep", "csapp", "manpages"]
    },
    {
      id: "os2",
      title: "CPU scheduling",
      minutes: 90,
      summary: "Choosing which ready process runs next: turnaround and response time, FIFO and the convoy effect, shortest job first and shortest time-to-completion first, round robin and its time slice, and the multi-level feedback queue that learns which jobs are interactive.",
      notes: `
<p>Many processes may be ready while only a few cores are free. The <strong>scheduler</strong> is the part of the kernel that picks which ready process runs next, and for how long. The choice has no single right answer: it depends on what we measure.</p>

<h3>Workload and metrics</h3>
<p>To compare policies we start with simplified <strong>jobs</strong>: each arrives at some time and needs a known amount of CPU time, its <em>length</em>. We'll relax these assumptions one by one. Two metrics:</p>
<p class="math">turnaround time = completion time − arrival time</p>
<p class="math">response time = first time it runs − arrival time</p>
<p>Turnaround matters for batch work (a compile, a simulation): when is it done? Response time matters for interactive programs: how long does a keypress wait before anything happens? We'll report the average over all jobs and ignore the cost of a context switch (about a microsecond, small next to slices of milliseconds).</p>

<h3>FIFO</h3>
<p><strong>First in, first out</strong> (FIFO, also called first come, first served) runs jobs to completion in order of arrival. Suppose A needs 100 time units and B and C need 10 each, all arriving at time 0 in that order.</p>
<figure class="fig"><svg viewBox="0 0 460 120" width="460" role="img" aria-label="Two Gantt charts. FIFO: A runs from 0 to 100, B from 100 to 110, C from 110 to 120. SJF: B from 0 to 10, C from 10 to 20, A from 20 to 120.">
<g class="box"><rect x="60" y="20" width="300" height="26"/><rect x="360" y="20" width="30" height="26"/><rect x="390" y="20" width="30" height="26"/>
<rect x="60" y="70" width="30" height="26"/><rect x="90" y="70" width="30" height="26"/><rect x="120" y="70" width="300" height="26"/></g>
<g class="text"><text x="10" y="38">FIFO</text><text x="10" y="88">SJF</text>
<text x="210" y="38" text-anchor="middle">A</text><text x="375" y="38" text-anchor="middle">B</text><text x="405" y="38" text-anchor="middle">C</text>
<text x="75" y="88" text-anchor="middle">B</text><text x="105" y="88" text-anchor="middle">C</text><text x="270" y="88" text-anchor="middle">A</text>
<text x="60" y="112" class="m" text-anchor="middle">0</text><text x="90" y="112" class="m" text-anchor="middle">10</text><text x="120" y="112" class="m" text-anchor="middle">20</text><text x="360" y="112" class="m" text-anchor="middle">100</text><text x="420" y="112" class="m" text-anchor="middle">120</text></g>
</svg><figcaption>Gantt charts (time runs left to right) for the same three jobs under FIFO and SJF.</figcaption></figure>
<p>Under FIFO, A finishes at 100, B at 110 and C at 120, so the average turnaround is (100 + 110 + 120)/3 = 110. The two short jobs wait behind the long one, like shoppers with one item behind a full cart: the <strong>convoy effect</strong>.</p>

<h3>Shortest job first</h3>
<p><strong>Shortest job first</strong> (SJF) runs the shortest available job next, to completion. Here it runs B, C, then A: turnarounds 10, 20 and 120, average 50. When all jobs arrive together, SJF gives the smallest possible average turnaround. The reason is an exchange argument like CS 220's greedy proofs: if a longer job ran just before a shorter one, swapping them would finish the short one earlier by the long one's length and the long one later by only the short one's length, so the sum of completion times would drop.</p>
<p>But jobs don't all arrive at once. If A arrives at 0 and B and C at 10, SJF must start A (it's the only job), and since SJF never interrupts a running job, B and C wait until 100: turnarounds 100, 100 and 110, average 103.3. The convoy is back.</p>

<h3>Preemption: shortest time-to-completion first</h3>
<p>A <strong>preemptive</strong> scheduler can take the processor away from a running job; the timer interrupt (Lesson 1) makes this possible. <strong>Shortest time-to-completion first</strong> (STCF, also called shortest remaining time first, SRTF) is SJF with preemption: whenever a job arrives, run whichever job has the least time <em>remaining</em>. At time 10, A has 90 left and B has 10, so B runs (10 to 20), then C (20 to 30), then A finishes at 120. Turnarounds 120, 10 and 20: average 50 again, and STCF is optimal for average turnaround even with arrivals.</p>
<p>The following function computes the metrics from a schedule written as a list of slices <code>(job, start, end)</code>; the practice problems use it to check Gantt charts.</p>
<pre><code>def metrics(slices, arrivals):
    """slices: list of (job, start, end); arrivals: dict job -> arrival time."""
    first, done = {}, {}
    for job, start, end in sorted(slices, key=lambda s: s[1]):
        first.setdefault(job, start)
        done[job] = end
    turnaround = {j: done[j] - arrivals[j] for j in arrivals}
    response = {j: first[j] - arrivals[j] for j in arrivals}
    avg = lambda d: round(sum(d.values()) / len(d), 2)
    return avg(turnaround), avg(response)

arrive = {"A": 0, "B": 10, "C": 10}
print(metrics([("A", 0, 100), ("B", 100, 110), ("C", 110, 120)], arrive))   # (103.33, 63.33)
print(metrics([("A", 0, 10), ("B", 10, 20), ("C", 20, 30), ("A", 30, 120)], arrive))   # (50.0, 3.33)</code></pre>
<p>(<code>setdefault</code> stores a value only if the key is absent, so <code>first</code> keeps each job's earliest start.) STCF needs to know how long each job will run, which a real OS doesn't. And its response times can be poor: a job that arrives behind a few short ones waits for all of them.</p>

<h3>Round robin</h3>
<p><strong>Round robin</strong> (RR) keeps a queue of ready jobs, runs the job at the front for one <strong>time slice</strong> (or <em>quantum</em>), then moves it to the back of the queue, unless it finished. Jobs that arrive join the back of the queue. Take A, B and C, each of length 5, arriving at 0. With a slice of 1, the schedule is A B C A B C …, so the first runs are at 0, 1 and 2: average response (0 + 1 + 2)/3 = 1. SJF would run A, B, C to completion: response 0, 5 and 10, average 5. But RR's turnarounds are 13, 14 and 15 (average 14) against SJF's 5, 10 and 15 (average 10): round robin stretches every job out. Any policy that is fair in the short term does badly on turnaround.</p>
<p>The slice length is a trade-off. Shorter slices give better response time, but every switch costs time: if a switch costs 1 µs, slices of 10 µs waste about 9% of the processor (1 of every 11 µs), and slices of 10 ms waste 0.01%. A switch also loses the cache and TLB contents (CS 210 Lesson 7, CS 230 Lesson 7) that the job had built up, so the true cost is higher. Real systems use slices of a few milliseconds.</p>

<h3>Input and output</h3>
<p>Real processes alternate between computing (a <em>CPU burst</em>) and waiting for I/O. When a process starts a disk read, it blocks, and the scheduler should run something else; when the read finishes, the interrupt makes it ready again. A job that does 10 ms of work between 10 ms disk reads, treated as a series of 10 ms jobs, lets the scheduler overlap one job's computing with another's I/O. Interactive programs have short bursts and long waits for the user, which is why they should get the processor quickly when they wake.</p>

<h3>The multi-level feedback queue</h3>
<p>We want SJF's good turnaround and RR's good response, without knowing job lengths. The <strong>multi-level feedback queue</strong> (MLFQ), first used in the CTSS system at MIT in 1962 by Fernando Corbató's group, learns from each job's behaviour. It keeps several queues, each a priority level, and follows these rules (as stated in OSTEP, <em>Operating Systems: Three Easy Pieces</em> by Remzi and Andrea Arpaci-Dusseau, this course's main textbook, free online):</p>
<ol>
<li>If A's priority is higher than B's, A runs.</li>
<li>Jobs of equal priority take turns, round robin, using that level's time slice.</li>
<li>A new job starts at the highest priority.</li>
<li>Once a job has used up its <em>allotment</em> of CPU time at a level (here, one time slice), whether in one go or spread over several bursts, it moves down one level.</li>
<li>Every <em>S</em> time units, a <strong>priority boost</strong> moves every job back to the top level.</li>
</ol>
<p>A short or interactive job finishes, or blocks for I/O, before using its allotment, so it stays near the top and gets the processor quickly: like SJF, without knowing lengths in advance. A long computation sinks to the bottom, where it shares the processor with other long jobs. Lower levels usually get longer slices (fewer switches for jobs that just compute).</p>
<p>Rule 5 fixes two problems. Without it, a steady stream of short jobs could keep the top levels busy forever, so that a long job at the bottom <strong>starves</strong>: it never runs. And a job whose behaviour changes, say a program that computes for a minute and then becomes interactive, would be stuck at the bottom. Rule 4 counts time across bursts to stop gaming: under a naive rule that a job keeps its priority whenever it gives up the processor before its slice ends, a program could issue a pointless I/O just before each slice ended and stay at the top forever.</p>
<p>Real schedulers are MLFQ's descendants or rivals. Windows and macOS use priority levels with feedback. Linux's long-time scheduler, CFS (2007–2023), instead gave each process a share of the processor in proportion to its weight, always running the process that had received the least weighted CPU time so far, kept in a red-black tree (a balanced search tree like CS 201's AVL trees); since version 6.6 it uses a related algorithm, EEVDF. Multicore machines add another question, which core: moving a process to another core loses its cached data, so schedulers prefer to keep a process where it ran (<em>cache affinity</em>), and each core usually keeps its own queue.</p>
`,
      terms: [
        ["Scheduler", "The part of the kernel that chooses which ready process runs next and for how long."],
        ["Turnaround time", "Completion time minus arrival time."],
        ["Response time", "The time from a job's arrival until it first runs."],
        ["Convoy effect", "Short jobs waiting behind a long one, as under FIFO."],
        ["SJF", "Shortest job first: run the shortest available job to completion."],
        ["Preemption", "Taking the processor away from a running job, made possible by the timer interrupt."],
        ["STCF (SRTF)", "Shortest time-to-completion first: preemptive SJF, always running the job with the least remaining time."],
        ["Round robin", "Running each ready job for one time slice in turn."],
        ["Time slice (quantum)", "The length of time a job runs before the scheduler may switch to another."],
        ["MLFQ", "Multi-level feedback queue: priority levels, with jobs moving down as they use CPU time and periodically boosted."],
        ["Starvation", "A job never getting to run because others are always chosen ahead of it."]
      ],
      quiz: [
        { q: "Jobs of length 30, 10 and 20 arrive together in that order. What is FIFO's average turnaround?", choices: ["20", "40", "43.3", "60"], answer: 2, why: "They finish at 30, 40 and 60: (30 + 40 + 60)/3 = 43.3." },
        { q: "For the same jobs, what is SJF's average turnaround?", choices: ["33.3", "40", "43.3", "60"], answer: 0, why: "Order 10, 20, 30: they finish at 10, 30 and 60, average 100/3 ≈ 33.3." },
        { q: "What does STCF need that a real OS usually doesn't have?", choices: ["A timer", "Knowledge of how long each job will run", "More than one core", "A page table"], answer: 1, why: "It picks by remaining time, which an OS can't know in advance. MLFQ approximates it from past behaviour." },
        { q: "Why does round robin have poor turnaround time?", choices: ["It switches too rarely", "It stretches every job out by interleaving them, so all finish late", "It starves long jobs", "It ignores arrivals"], answer: 1, why: "Every job shares the processor until near the end, so even short jobs finish late compared with SJF." },
        { q: "In MLFQ, why are jobs periodically boosted to the top priority?", choices: ["To make the scheduler faster", "To prevent long jobs from starving and to let jobs whose behaviour changed move back up", "To save memory", "To punish interactive jobs"], answer: 1, why: "Without the boost, a stream of short jobs could keep a long job at the bottom from ever running." },
        { q: "Why does MLFQ count a job's CPU time across bursts, rather than resetting it whenever the job blocks?", choices: ["It's cheaper to compute", "Otherwise a job could do a tiny I/O just before each slice ends and stay at top priority forever", "Because jobs never block", "To improve cache affinity"], answer: 1, why: "Counting the total allotment stops this way of gaming the scheduler." }
      ],
      practice: [
        {
          q: `<p>Jobs A (arrives 0, length 8), B (arrives 1, length 4) and C (arrives 2, length 2). Draw the schedule and compute the average turnaround and response time under FIFO, SJF and STCF.</p>`,
          hint: `<p>SJF can't interrupt A at time 1 or 2; STCF can.</p>`,
          a: `<p><b>FIFO:</b> A 0–8, B 8–12, C 12–14. Turnaround 8, 11, 12: average 31/3 ≈ 10.33. Response 0, 7, 10: average 17/3 ≈ 5.67.</p><p><b>SJF:</b> A must run 0–8 (only job at 0, and no preemption); then C (shorter) 8–10, then B 10–14. Turnaround 8, 13, 8: average 29/3 ≈ 9.67. Response 0, 9, 6: average 5.</p><p><b>STCF:</b> A 0–1; B arrives with 4 &lt; 7, so B 1–2; C arrives with 2 &lt; 3, so C 2–4; then B (3 left) 4–7; then A 7–14. Turnaround 14, 6, 2: average 22/3 ≈ 7.33. Response 0, 0, 0.</p><pre><code>arr = {"A": 0, "B": 1, "C": 2}
print(metrics([("A", 0, 1), ("B", 1, 2), ("C", 2, 4), ("B", 4, 7), ("A", 7, 14)], arr))   # (7.33, 0.0)</code></pre>`
        },
        {
          q: `<p>Run the same three jobs under round robin with a time slice of 2, assuming a job that arrives at the moment a slice ends joins the queue before the job that was just preempted. Give the Gantt chart and the averages.</p>`,
          a: `<p>Time 0: only A; A runs 0–2. B (arrived at 1) and C (arrived at 2) are queued before A: queue B, C, A. B 2–4, C 4–6 (C done), A 6–8, B 8–10 (B done), A 10–14 (two slices, nobody else waiting).</p><p>Turnaround: A 14, B 9, C 4, average 9. Response: A 0, B 1, C 2, average 1.</p><pre><code>arr = {"A": 0, "B": 1, "C": 2}
print(metrics([("A", 0, 2), ("B", 2, 4), ("C", 4, 6), ("A", 6, 8), ("B", 8, 10), ("A", 10, 14)], arr))   # (9.0, 1.0)</code></pre>`
        },
        {
          q: `<p>A context switch costs 5 µs (including the cache misses it causes afterwards). What fraction of the processor is lost to switching with time slices of 50 µs, 1 ms and 10 ms, if every slice ends with a switch?</p>`,
          a: `<p>The fraction lost is switch / (slice + switch): 5/55 ≈ 9.1% with 50 µs slices, 5/1005 ≈ 0.50% with 1 ms, and 5/10005 ≈ 0.05% with 10 ms. Very short slices waste a lot; beyond a few milliseconds the gain is small while response time keeps getting worse.</p>`
        },
        {
          q: `<p>An MLFQ has three levels with time slices of 1, 2 and 4 ms and no boost. A job A of length 10 ms arrives at time 0, and an interactive job B arrives at time 5 and needs 1 ms of CPU. When does each finish? What would happen to A if a new 1 ms job arrived every millisecond from time 5 on?</p>`,
          a: `<p>A runs 0–1 at level 0 and moves to level 1; runs 1–3 at level 1 and moves to level 2; runs 3–5 of its 4 ms slice at level 2 when B arrives at the top level. B preempts and runs 5–6, finishing at 6. A resumes 6–8 to finish its slice, then keeps running (alone at the bottom) until its 10 ms are done: 1 + 2 + 4 + 3 = 10 ms of CPU, finishing at 11. With a new 1 ms job every millisecond, the top level would always be busy, and A would never run again until the stream stopped: starvation, which the priority boost (rule 5) prevents.</p>`
        }
      ],
      sources: ["ostep", "corbato62"]
    },
    {
      id: "os3",
      title: "Threads and concurrency",
      minutes: 90,
      summary: "Threads as several flows of control in one address space; why shared memory leads to race conditions; a lost update shown in C and in Python, and why Python's global interpreter lock doesn't prevent it; atomicity and critical sections; and a deterministic simulator for exploring interleavings.",
      notes: `
<p>A process, as Lesson 1 described it, does one thing at a time. A web server serving thousands of clients, or a program that wants to use eight cores (CS 230 Lesson 8), needs several flows of control. It could use several processes, but processes don't share memory, so they must communicate through the kernel (pipes, files), and creating one copies a whole address space. <strong>Threads</strong> are the alternative.</p>

<h3>Threads</h3>
<p>A <strong>thread</strong> is a flow of control within a process: its own program counter, its own registers and its own stack, but sharing everything else with the other threads of the process, including the code, the global variables, the heap and the open files. One process with four threads is like four programs running in the same address space.</p>
<table>
<tr><th></th><th>Private to each thread</th><th>Shared by all threads of a process</th></tr>
<tr><td>Examples</td><td>registers, program counter, stack (local variables), thread ID</td><td>code, global variables, heap, open files, PID</td></tr>
</table>
<p>The kernel schedules threads, not processes: each thread has its own state (ready, running, blocked) in a <em>thread control block</em>, and on a multicore machine several threads of one process really run at the same time. Switching between two threads of the same process is cheaper than switching processes, because the page table stays the same (and so does the TLB's contents). In C on Unix, threads come from the POSIX threads library: <code>pthread_create(&amp;t, NULL, f, arg)</code> starts a thread running <code>f(arg)</code>, and <code>pthread_join(t, NULL)</code> waits for it to finish, as <code>waitpid</code> waits for a process.</p>

<h3>A race</h3>
<p>Sharing memory is the point of threads and the source of their bugs. Two threads each add 1 to a global counter a million times:</p>
<pre data-label="C"><code>#include &lt;stdio.h&gt;
#include &lt;pthread.h&gt;

long count = 0;                 /* global: shared by every thread */

void *work(void *arg) {
    long n = *(long *)arg;
    for (long i = 0; i &lt; n; i++)
        count = count + 1;      /* load, add, store */
    return NULL;
}

int main(void) {
    long n = 1000000;
    pthread_t a, b;
    pthread_create(&amp;a, NULL, work, &amp;n);
    pthread_create(&amp;b, NULL, work, &amp;n);
    pthread_join(a, NULL);
    pthread_join(b, NULL);
    printf("count = %ld (expected %ld)\\n", count, 2 * n);
    return 0;
}</code></pre>
<pre data-label="Terminal"><code>$ gcc -Wall -O0 -pthread race.c -o race
$ ./race
count = 1085575 (expected 2000000)
$ ./race
count = 1058686 (expected 2000000)</code></pre>
<p>(A thread's function takes and returns a <code>void *</code>, a pointer to anything; the code converts it back to a pointer to <code>long</code>. <code>-pthread</code> links the threads library.) Almost half the additions vanished, and the answer changes every run. The line <code>count = count + 1</code> compiles to three instructions (CS 210 Lesson 5):</p>
<pre data-label="x86-64"><code>movq  count(%rip), %rax     # load count into a register
addq  $1, %rax              # add 1 to the register
movq  %rax, count(%rip)     # store it back</code></pre>
<p>Suppose <code>count</code> is 5. Thread A loads 5 and adds 1, getting 6 in its register. Before A stores, thread B (on another core, or after a timer interrupt switches threads) loads <code>count</code>, still 5, and also computes 6. A stores 6; B stores 6. Two increments, one lost: a <strong>lost update</strong>. Each thread's register is private, so the two threads' copies of "count + 1" don't know about each other.</p>
<p>A <strong>race condition</strong> is a bug where the result depends on the timing of threads. A <strong>data race</strong>, the most common cause, is two threads accessing the same memory at the same time, at least one of them writing, with nothing to order the accesses. Races are hard to find because most runs are fine: the bad interleaving may need the switch to land within a few nanoseconds, and testing can run a million times without seeing it.</p>

<h3>Python and the GIL</h3>
<p>CPython has a <strong>global interpreter lock</strong> (GIL): only one thread at a time runs Python bytecode (the instructions CPython's interpreter executes; the module <code>dis</code> shows them). That might seem to rule out races. It doesn't. The GIL makes each <em>bytecode instruction</em> atomic, but a line of Python is several of them, and the interpreter may switch threads between any two. <code>count = count + one()</code> loads <code>count</code>, calls <code>one</code>, adds and stores, four steps; a switch between the load and the store loses an update, exactly as in C.</p>
<pre><code>import sys
import threading

sys.setswitchinterval(1e-5)   # offer a thread switch every 10 µs instead of every 5 ms

count = 0

def one():
    return 1

def work(n):
    global count
    for _ in range(n):
        count = count + one()

threads = [threading.Thread(target=work, args=(50_000,)) for _ in range(4)]
for t in threads:
    t.start()
for t in threads:
    t.join()
print(count)   # less than 200000, and different every run</code></pre>
<p>(<code>threading.Thread(target=f, args=(x,))</code> creates a thread that will run <code>f(x)</code>; <code>start</code> starts it and <code>join</code> waits for it to finish. CPython offers the processor to another thread every 5 ms by default; the first line makes that far more often, so that the bug shows up in a short run instead of only now and then, as it would in a long-running program.) Some read-modify-write lines, like <code>count += 1</code> on its own, happen to lose no updates on current CPython, because its interpreter only considers switching at certain points, such as calls and the jump back to the top of a loop. Nothing in the language promises that, and Python 3.13 introduced an optional "free-threaded" build without a GIL, where threads run Python code truly in parallel. Correct programs don't depend on where the interpreter happens to switch.</p>

<h3>Atomicity and critical sections</h3>
<p>An operation is <strong>atomic</strong> if it happens all at once as far as other threads can tell: no thread ever sees it half done. The increment fails because it isn't atomic. The code that accesses shared data and must not run in two threads at once is a <strong>critical section</strong>. What we want is <strong>mutual exclusion</strong>: while one thread is in a critical section, no other thread may be in a critical section for the same data. A <strong>lock</strong> (also called a mutex) provides it. A thread calls <code>acquire</code> before the critical section and <code>release</code> after; if another thread holds the lock, <code>acquire</code> waits.</p>
<pre><code>sys.setswitchinterval(0.005)   # back to the default
count = 0
lock = threading.Lock()

def safe_work(n):
    global count
    for _ in range(n):
        with lock:                    # acquire; release at the end of the block, even on an exception
            count = count + one()

threads = [threading.Thread(target=safe_work, args=(50_000,)) for _ in range(4)]
for t in threads:
    t.start()
for t in threads:
    t.join()
print(count)   # 200000</code></pre>
<p>In C, the same fix wraps the line in <code>pthread_mutex_lock(&amp;m)</code> and <code>pthread_mutex_unlock(&amp;m)</code>, with <code>pthread_mutex_t m = PTHREAD_MUTEX_INITIALIZER;</code> declared globally; the program then prints 2000000 every time. The lock makes the three instructions atomic with respect to every other thread that uses the same lock. That condition matters: a lock protects data only if <em>every</em> access to the data takes it. How a lock can be built, when the hardware only offers loads and stores, is Lesson 4.</p>
<p>Critical sections should be short. While one thread holds the lock, others that want it wait, so code inside a lock runs one thread at a time: it is a serial part, and as in Amdahl's law (CS 230 Lesson 8), the serial part limits speedup. If a fraction <em>s</em> of all the work is done holding one lock, that work takes at least <em>s</em> of the one-thread running time however many cores there are, so the program can never be more than 1/<em>s</em> times faster.</p>

<h3>Exploring interleavings deterministically</h3>
<p>Real races depend on timing, which makes them hard to study. This course uses a small simulator instead, which also runs in the browser, whose Python can't start real threads. A simulated thread is a Python <strong>generator</strong> (CS 102): a function containing <code>yield</code>, which runs until its next <code>yield</code> each time <code>next</code> is called on it. We put a <code>yield</code> wherever a real thread could be interrupted, so each step between yields is atomic, and the scheduler <code>run</code> decides which thread takes the next step.</p>
<pre><code>import random

def run(threads, schedule=(), seed=0, max_steps=100000):
    """Run generator "threads" one step at a time: each step resumes one thread until its next yield.
    The first steps follow schedule (a list of thread indexes); after that a random unfinished
    thread (seeded, so the run is repeatable) goes next. Returns the number of steps taken."""
    live = list(range(len(threads)))
    rng = random.Random(seed)
    plan = list(schedule)
    steps = 0
    while live:
        if steps &gt;= max_steps:
            raise RuntimeError("no progress after max_steps: deadlock?")
        i = plan.pop(0) if plan else rng.choice(live)
        if i not in live:
            continue
        steps += 1
        try:
            next(threads[i])
        except StopIteration:
            live.remove(i)
    return steps</code></pre>
<p>(<code>random.Random(seed)</code> is a random-number generator of its own, so the same seed always gives the same sequence of choices. A generator that has finished raises <code>StopIteration</code> when resumed.) Here is the increment as a simulated thread, with a possible switch between the load and the store:</p>
<pre><code>shared = {"count": 0}

def increment(times):
    for _ in range(times):
        tmp = shared["count"]        # load
        yield                        # the scheduler may switch here
        shared["count"] = tmp + 1    # store

run([increment(1), increment(1)], schedule=[0, 1, 0, 1])
print(shared["count"])   # 1

shared["count"] = 0
run([increment(1), increment(1)], schedule=[0, 0, 1, 1])
print(shared["count"])   # 2</code></pre>
<p>The schedule [0, 1, 0, 1] is the bad interleaving: thread 0 loads, thread 1 loads, both store. The schedule [0, 0, 1, 1] runs them one after the other. Trying many random schedules shows how common the bug is in this model:</p>
<pre><code>lost = 0
for seed in range(1000):
    shared["count"] = 0
    run([increment(5), increment(5)], seed=seed)
    lost += shared["count"] != 10
print(lost)   # 975</code></pre>
<p>How many interleavings are there? If two threads take <em>m</em> and <em>n</em> atomic steps, an interleaving is a choice of which <em>m</em> of the <em>m</em> + <em>n</em> positions belong to the first thread: C(<em>m</em> + <em>n</em>, <em>m</em>) of them (MATH 120's binomial coefficient). Two threads of 3 steps have C(6, 3) = 20; two of 10 steps have C(20, 10) = 184,756. Testing them all is possible only for tiny programs; that is why concurrent code must be correct by design, with every shared access protected, rather than "tested until it seems to work".</p>

<h3>A lock for simulated threads</h3>
<p>The programming problems use this lock with the simulator:</p>
<pre><code>class Lock:
    """A lock for simulated threads. acquire() is a generator: use  yield from lock.acquire()."""
    def __init__(self):
        self.held = False
    def acquire(self):
        while self.held:          # someone else holds it: let other threads run
            yield
        self.held = True          # test and set in one step, so it is atomic
    def release(self):
        self.held = False

lock = Lock()

def safe_increment(times):
    for _ in range(times):
        yield from lock.acquire()
        tmp = shared["count"]
        yield
        shared["count"] = tmp + 1
        lock.release()

lost = 0
for seed in range(1000):
    shared["count"] = 0
    run([safe_increment(5), safe_increment(5)], seed=seed)
    lost += shared["count"] != 10
print(lost)   # 0</code></pre>
<p><code>acquire</code> is a generator because waiting must give other threads a turn: a plain loop <code>while self.held: pass</code> would never end, since the thread holding the lock runs only when the waiter yields. But calling a generator function only creates a generator; nothing runs. <code>yield from g</code> runs the generator <code>g</code> as part of the current one: each time <code>g</code> yields, the current thread yields too (so the scheduler may switch), and when <code>g</code> finishes, the thread carries on after the <code>yield from</code> line. If the lock is free, <code>acquire</code> finishes without yielding at all. <code>release</code> never waits, so it is an ordinary method, called without <code>yield from</code>. Nothing yields between the test of <code>self.held</code> and setting it, so no other thread can slip in between: the check and the set are one atomic step. Lesson 4 shows how real hardware provides such a step.</p>
`,
      terms: [
        ["Thread", "A flow of control within a process, with its own registers and stack, sharing the process's memory with its other threads."],
        ["Race condition", "A bug where the result depends on the relative timing of threads."],
        ["Data race", "Two threads accessing the same memory at the same time, at least one writing, with nothing ordering the accesses."],
        ["Lost update", "One thread's write overwriting another's because both read the old value first."],
        ["Global interpreter lock (GIL)", "CPython's lock that lets only one thread run bytecode at a time; it doesn't make multi-step operations atomic."],
        ["Atomic", "Happening all at once as far as other threads can tell."],
        ["Critical section", "Code that accesses shared data and must not run in more than one thread at a time."],
        ["Mutual exclusion", "The guarantee that at most one thread is in a critical section."],
        ["Lock (mutex)", "An object with acquire and release that provides mutual exclusion."],
        ["Interleaving", "One possible order in which the steps of several threads are merged."]
      ],
      quiz: [
        { q: "Which of these do two threads of the same process NOT share?", choices: ["Global variables", "The heap", "Their stacks and registers", "Open files"], answer: 2, why: "Each thread has its own registers and stack; everything else is shared." },
        { q: "Why is count = count + 1 unsafe in two threads, even on a single core?", choices: ["It isn't; single cores have no races", "A timer interrupt can switch threads between the load and the store", "The compiler removes it", "Integers overflow"], answer: 1, why: "A context switch can land between the steps, so both threads read the same old value." },
        { q: "What does Python's GIL guarantee?", choices: ["That programs have no races", "That only one thread runs bytecode at any moment, so single bytecode instructions are atomic", "That threads run in parallel on all cores", "That locks are unnecessary for lists"], answer: 1, why: "A line of Python is many bytecodes, and threads can switch between them." },
        { q: "Two threads each take 4 atomic steps. How many interleavings are there?", choices: ["8", "16", "70", "256"], answer: 2, why: "C(8, 4) = 70." },
        { q: "A program protects writes to a shared dict with a lock, but reads it without the lock. Is it correct?", choices: ["Yes, reads are always safe", "No: a reader can see the dict in the middle of an update; every access must take the lock", "Only on one core", "Only in Python"], answer: 1, why: "A lock protects data only if every access to that data uses it." },
        { q: "In the course's simulator, what does a yield inside a simulated thread mark?", choices: ["The end of the thread", "A point where the scheduler may switch to another thread", "A lock", "A system call"], answer: 1, why: "The code between two yields runs as one atomic step." }
      ],
      practice: [
        {
          q: `<p>List all the interleavings of two threads that each run <code>tmp = x; x = tmp + 1</code> (load, then store) starting from <em>x</em> = 0, and give the final value of <em>x</em> for each.</p>`,
          hint: `<p>There are C(4, 2) = 6. Write A1, A2 for thread A's load and store.</p>`,
          a: `<p>A1 A2 B1 B2 → 2; B1 B2 A1 A2 → 2; A1 B1 A2 B2 → 1; A1 B1 B2 A2 → 1; B1 A1 A2 B2 → 1; B1 A1 B2 A2 → 1. Only the two serial orders give 2: in the other four, both loads happen before either store.</p>`
        },
        {
          q: `<p>Thread A runs <code>x = x + 1</code> and thread B runs <code>x = x * 2</code>, each as load, compute, store, with <em>x</em> = 5 at first. What final values are possible?</p>`,
          a: `<p>Serially: A then B gives (5 + 1) × 2 = 12; B then A gives 5 × 2 + 1 = 11. If both load 5 before either stores, the last store wins: A's 6 or B's 10. So {6, 10, 11, 12}. The programming problem <code>interleavings</code> checks this by trying all C(6, 3) = 20 interleavings.</p>`
        },
        {
          q: `<p>Using the notes' <code>run</code>, write a simulated thread <code>append_twice(lst, a, b)</code> that is meant to append two items to a list as one action, but has a switch point (a <code>yield</code>) between the two appends, and a schedule that shows another thread's items landing between them. Then explain what a lock would change.</p>`,
          a: `<pre><code>def append_twice(lst, a, b):
    lst.append(a)
    yield
    lst.append(b)

out = []
run([append_twice(out, "a1", "a2"), append_twice(out, "b1", "b2")], schedule=[0, 1, 0, 1])
print(out)   # ['a1', 'b1', 'a2', 'b2']</code></pre><p>Each <code>append</code> is atomic, but the pair isn't. With a lock held around both appends (<code>yield from lock.acquire()</code> before the first, <code>lock.release()</code> after the second), the other thread would wait in its acquire until the first released, so the output would be a1 a2 b1 b2 or b1 b2 a1 a2: the pairs stay together.</p>`
        },
        {
          q: `<p>A program's work is split evenly over 8 threads, and each spends 20% of its time inside a critical section protected by one shared lock. At most how much faster than one thread can it be on 8 cores, if the other threads can keep doing their own work while one holds the lock? What could you change?</p>`,
          a: `<p>Only one thread can be in the critical section at a time, so the 20% of all the work done holding the lock happens one piece after another: it takes at least 0.2 of the one-thread time, however many cores there are. So the program is at most 1/0.2 = 5 times faster, less than the 8 that 8 cores alone would allow. (Reaching 5 needs the lock to be busy all the time, with the other threads doing their 80% meanwhile; time spent waiting for the lock costs more. If instead the other threads had nothing to do while the lock was held, the locked work would be a serial part in Amdahl's sense and the limit would be 1/(0.2 + 0.8/8) ≈ 3.3.) Shrink the critical section (do work that doesn't touch shared data outside it), or split the data so that different threads use different locks (for example, one lock per hash-table bucket).</p>`
        }
      ],
      sources: ["ostep", "pythreading", "csapp"]
    },
    {
      id: "os4",
      title: "Locks and condition variables",
      minutes: 90,
      summary: "What a lock must guarantee; why simple software attempts fail and how Peterson's algorithm succeeds; building locks from atomic hardware instructions such as test-and-set; spinning versus blocking; condition variables and why waits go in a while loop; the producer–consumer bounded buffer; and monitors.",
      notes: `
<p>Lesson 3 used locks; this lesson builds them, and then adds a way for threads to wait for each other.</p>

<h3>What a lock must do</h3>
<p>A lock implementation is judged on four things:</p>
<ul>
<li><strong>Mutual exclusion:</strong> at most one thread holds the lock.</li>
<li><strong>Progress:</strong> if the lock is free and threads want it, one of them gets it; they can't all wait forever for each other.</li>
<li><strong>Bounded waiting (fairness):</strong> a thread that wants the lock gets it after a bounded number of other threads have had it, so none starves.</li>
<li><strong>Performance:</strong> acquiring a free lock is fast, and waiting threads don't waste much processor time.</li>
</ul>
<p>On a single core, one idea is to disable interrupts during the critical section: with no timer interrupt, there's no switch. But disabling interrupts is privileged (a user program that could do it could keep the processor forever), and it doesn't stop a thread on another core. Kernels do use it, briefly, for their own short critical sections on one core.</p>

<h3>Locks from loads and stores</h3>
<p>Can a lock be built from ordinary loads and stores? Let's try in the simulator from Lesson 3, repeated here with its <code>Lock</code> so this lesson's code runs on its own:</p>
<pre><code>import random

def run(threads, schedule=(), seed=0, max_steps=100000):
    live, rng, plan, steps = list(range(len(threads))), random.Random(seed), list(schedule), 0
    while live:
        if steps &gt;= max_steps:
            raise RuntimeError("no progress after max_steps: deadlock?")
        i = plan.pop(0) if plan else rng.choice(live)
        if i not in live:
            continue
        steps += 1
        try:
            next(threads[i])
        except StopIteration:
            live.remove(i)
    return steps

class Lock:
    def __init__(self):
        self.held = False
    def acquire(self):            # a generator: yield from lock.acquire()
        while self.held:
            yield
        self.held = True
    def release(self):            # a plain call: lock.release()
        self.held = False

def check(algorithm, seeds=1000):
    """Run two threads through the algorithm's critical section 3 times each, for many schedules.
    Return the number of schedules in which both threads were inside at once."""
    bad = 0
    for seed in range(seeds):
        s = {"flag": [False, False], "turn": 0, "inside": 0, "overlap": False}
        def thread(i):
            for _ in range(3):
                yield from algorithm.enter(s, i)
                s["inside"] += 1
                s["overlap"] |= s["inside"] &gt; 1
                yield
                s["inside"] -= 1
                yield from algorithm.leave(s, i)
        run([thread(0), thread(1)], seed=seed)
        bad += s["overlap"]
    return bad</code></pre>
<p>(As in Lesson 3, <code>yield from g</code> runs the generator <code>g</code> as part of the current thread, so an <code>enter</code> that waits makes the whole thread wait.) Each algorithm below is a class that only groups two generator functions, <code>enter</code> and <code>leave</code>, which <code>check</code> calls on the class itself (so they take no <code>self</code>). A first attempt: each thread has a flag saying "I want in"; wait while the other's flag is up, then raise your own.</p>
<pre><code>class FlagsOnly:
    def enter(s, i):
        while s["flag"][1 - i]:      # wait while the other wants in
            yield
        yield                        # (a switch can happen here)
        s["flag"][i] = True          # then say "I want in"
        yield
    def leave(s, i):
        s["flag"][i] = False
        yield

print(check(FlagsOnly))   # 542</code></pre>
<p>It fails in more than half the schedules: both threads check, both see the other's flag down, and both go in. Raising your flag <em>before</em> checking fixes that but can deadlock: both raise their flags, and each waits for the other forever. In 1981 Gary Peterson found a simple correct algorithm for two threads, using both the flags and a shared variable <code>turn</code>:</p>
<pre><code>class Peterson:
    def enter(s, i):
        j = 1 - i
        s["flag"][i] = True          # I want in
        yield
        s["turn"] = j                # but you go first if you also want in
        yield
        while s["flag"][j] and s["turn"] == j:
            yield
    def leave(s, i):
        s["flag"][i] = False
        yield

print(check(Peterson))   # 0</code></pre>
<p>Why it works: suppose both threads are inside. Each wrote <code>turn</code> before its final check, and <code>turn</code> holds whichever value was written last; say thread 0 wrote last, so <code>turn</code> = 1. Thread 0 can only have passed its loop by seeing <code>flag[1]</code> false or <code>turn</code> ≠ 1. <code>turn</code> stayed 1, and <code>flag[1]</code> was already true (thread 1 raised it before writing <code>turn</code>, which was before thread 0's write). So thread 0 couldn't have entered: a contradiction. If only one thread wants in, the other's flag is down and it enters at once (progress), and a waiting thread gets in after the other's next turn, because the other sets <code>turn</code> in its favour (bounded waiting). (The loop's condition reads two variables in one step; putting a <code>yield</code> between the reads changes nothing.)</p>
<p>The proof assumes <strong>sequential consistency</strong>: memory behaves as if the threads' loads and stores happened one at a time in a single order, with each thread's own operations in program order, as in the simulator. Peterson's algorithm is beautiful and not used in practice. It handles only two threads, and on modern processors, which aren't sequentially consistent, it fails: cores keep recent stores in a <em>store buffer</em> before they reach memory, and may let a later load go first, so a thread can read the other's old flag after "setting" its own. Making it work needs special <strong>memory fence</strong> instructions that force earlier stores to complete. Real locks instead use instructions designed for the job.</p>

<h3>Atomic instructions</h3>
<p>Processors provide instructions that read and write a memory location as one indivisible step, even with other cores trying at the same moment (the cache hardware holds the cache line exclusively for the duration). The basic one is <strong>test-and-set</strong>, or atomic exchange: store a new value and return the old one. x86-64 has <code>xchg</code>; RISC-V's "A" extension has <code>amoswap.w</code> ("atomic memory operation: swap word") and the pair <code>lr.w</code>/<code>sc.w</code> (load-reserved, store-conditional). <code>lr.w</code> loads a word and reserves its address; <code>sc.w</code> stores to that address only if no other core has written it since the <code>lr.w</code>, and puts 0 in its destination register if the store happened, nonzero if it failed. A loop of load-reserved, compute, store-conditional, retrying on failure, performs any read-modify-write atomically, so the other instructions can be built from the pair. Two more appear everywhere:</p>
<ul>
<li><strong>Compare-and-swap</strong> (CAS): if the location holds an expected value, replace it with a new one; return whether it did (x86 <code>cmpxchg</code>).</li>
<li><strong>Fetch-and-add</strong>: add to the location and return the old value (x86 <code>lock xadd</code>, RISC-V <code>amoadd.w</code>).</li>
</ul>
<p>With test-and-set, a lock is one variable, 0 when free. To acquire, swap in 1 repeatedly until the old value was 0, meaning the lock was free and is now ours. To release, store 0. C11's <code>&lt;stdatomic.h&gt;</code> provides it portably:</p>
<pre data-label="C"><code>#include &lt;stdatomic.h&gt;

atomic_flag busy = ATOMIC_FLAG_INIT;   /* the lock: clear means free */

void lock(void)   { while (atomic_flag_test_and_set(&amp;busy)) { /* spin */ } }
void unlock(void) { atomic_flag_clear(&amp;busy); }</code></pre>
<p>Compiled with <code>gcc -O2</code> on x86-64, the loop in <code>lock</code> is an <code>xchgb</code> instruction followed by a test and a branch back. Used around the counter of Lesson 3 in two threads, it gives 2000000 every time. Because the check and the set are one instruction, the flaw of <code>FlagsOnly</code> (both threads checking before either sets) can't happen. (The simulator's <code>Lock</code> from Lesson 3 imitates this: its check and set happen in one step, with no <code>yield</code> between them.)</p>

<h3>Spinning or blocking</h3>
<p>A lock whose waiters loop is a <strong>spin lock</strong>. It is the right choice when critical sections are very short and each thread has its own core: the wait is shorter than a context switch would be. But on one core, a spinning thread burns its whole time slice waiting for a thread that can't run until it stops; and test-and-set locks aren't fair, since whichever waiter happens to swap first wins. A <strong>ticket lock</strong>, built from fetch-and-add, fixes fairness (a programming problem builds one).</p>
<p>The alternative is a <strong>blocking lock</strong>: a thread that finds the lock taken asks the kernel to put it to sleep (state blocked, Lesson 1) on a queue for that lock, and the releasing thread wakes one sleeper. Sleeping and waking are system calls, so they cost time. Linux's answer is the <strong>futex</strong> ("fast user-space mutex"): acquiring a free lock is a single atomic instruction in user space, and the thread calls the kernel only if it must wait. Most real locks, <code>pthread_mutex_lock</code> and Python's <code>threading.Lock</code> included, spin briefly and then block: a <em>two-phase</em> lock.</p>

<h3>Condition variables</h3>
<p>Locks make threads take turns; often a thread must also wait <em>until something is true</em>, such as "the queue is not empty". Spinning on the condition while holding the lock would stop anyone from changing it; spinning without the lock wastes time. A <strong>condition variable</strong> is a queue of waiting threads attached to a lock, with three operations:</p>
<ul>
<li><code>wait()</code>: called while holding the lock. Atomically release the lock and go to sleep; when woken, reacquire the lock before returning.</li>
<li><code>notify()</code> (called <em>signal</em> in C's <code>pthread_cond_signal</code>): wake one waiting thread, if any.</li>
<li><code>notify_all()</code> (<em>broadcast</em>): wake them all.</li>
</ul>
<p>Releasing the lock and sleeping must be one atomic step; otherwise a notify could slip in between and be lost, leaving the thread asleep with nobody to wake it. The woken thread doesn't run at once: it must reacquire the lock, and by then another thread may have changed things (and in many implementations, a thread can even wake without a notify). These are <em>Mesa semantics</em>, used by nearly every real system. So a waiting thread must recheck its condition after waking: <strong>always wait in a while loop</strong>, never with an <code>if</code>.</p>

<h3>The bounded buffer</h3>
<p>The classic use is the <strong>producer–consumer problem</strong>: producer threads put items into a buffer of fixed capacity, and consumer threads take them out. A shell pipe is one: <code>ls | sort</code> has a kernel buffer between the two processes. Producers must wait while the buffer is full, consumers while it is empty. One lock protects the buffer, and two condition variables let each side wait for the other:</p>
<pre><code>import threading
from collections import deque

class BoundedBuffer:
    def __init__(self, capacity):
        self.capacity = capacity
        self.items = deque()
        self.lock = threading.Lock()
        self.not_full = threading.Condition(self.lock)
        self.not_empty = threading.Condition(self.lock)

    def put(self, item):
        with self.lock:
            while len(self.items) == self.capacity:
                self.not_full.wait()
            self.items.append(item)
            self.not_empty.notify()

    def get(self):
        with self.lock:
            while not self.items:
                self.not_empty.wait()
            item = self.items.popleft()
            self.not_full.notify()
            return item

buf = BoundedBuffer(4)
got = []
def producer(start):
    for k in range(start, start + 500):
        buf.put(k)
def consumer():
    for _ in range(500):
        got.append(buf.get())
threads = [threading.Thread(target=producer, args=(s,)) for s in (0, 500)]
threads += [threading.Thread(target=consumer) for _ in range(2)]
for t in threads:
    t.start()
for t in threads:
    t.join()
print(len(got), sorted(got) == list(range(1000)))   # 1000 True</code></pre>
<p>(<code>threading.Condition(lock)</code> makes a condition variable that uses an existing lock, and <code>with self.lock</code> holds it for the whole method; <code>deque</code>'s <code>popleft</code> removes from the front in constant time.) Two details matter. With <code>if</code> instead of <code>while</code>, two consumers can both be woken for one item: the first takes it, and the second pops from an empty buffer. And with a single condition variable for both sides and <code>notify</code>, a consumer can wake another consumer instead of a producer, and every thread can end up asleep. Two condition variables, or <code>notify_all</code>, avoid that.</p>
<p>The programming problems use a condition variable for the simulator, built on its <code>Lock</code>. <code>wait</code> may have to wait, so it is a generator, used as <code>yield from cond.wait()</code> while holding the lock; <code>notify</code> and <code>notify_all</code> never wait, so they are plain calls, like <code>release</code>:</p>
<pre><code>class Condition:
    """A condition variable for simulated threads, used like threading.Condition."""
    def __init__(self, lock):
        self.lock = lock
        self.waiting = []
    def wait(self):               # use:  yield from cond.wait()   (while holding the lock)
        me = [False]
        self.waiting.append(me)
        self.lock.release()
        while not me[0]:
            yield
        yield from self.lock.acquire()
    def notify(self):
        if self.waiting:
            self.waiting.pop(0)[0] = True
    def notify_all(self):
        for w in self.waiting:
            w[0] = True
        self.waiting.clear()

lock = Lock()
ready = Condition(lock)
box, got = [], []
def waiter():
    yield from lock.acquire()
    while not box:
        yield from ready.wait()
    got.append(box.pop())
    lock.release()
def setter():
    yield from lock.acquire()
    box.append("item")
    ready.notify()
    lock.release()
    yield
run([waiter(), setter()], schedule=[0, 1])
print(got)   # ['item']</code></pre>
<p>Each waiter puts a one-item list <code>me</code> on the queue, and <code>notify</code> sets the first one to <code>True</code>. Joining the queue and releasing the lock happen with no <code>yield</code> between them, so they are one atomic step, as the rule above requires. Here the waiter runs first, finds <code>box</code> empty and waits; the setter can then take the lock, fill the box and notify; the waiter wakes, reacquires the lock and rechecks.</p>

<h3>Monitors</h3>
<p>The pattern of this class, data plus one lock held by every method plus condition variables, is a <strong>monitor</strong>, proposed by Per Brinch Hansen and C. A. R. Hoare in the early 1970s. Some languages build it in: in Java, every object has a lock and one condition variable, a method marked <code>synchronized</code> holds the object's lock, and <code>wait()</code>, <code>notify()</code> and <code>notifyAll()</code> are methods of every object. Organizing concurrent code as monitors keeps each piece of shared data next to the lock that protects it.</p>
`,
      terms: [
        ["Progress", "If the lock is free and threads want it, one of them gets it."],
        ["Bounded waiting", "A waiting thread gets the lock after a bounded number of others, so none starves."],
        ["Sequential consistency", "Memory that behaves as if all loads and stores happened one at a time in a single order, each thread's in program order."],
        ["Peterson's algorithm", "A two-thread lock using only loads and stores, correct on sequentially consistent memory."],
        ["Memory fence", "An instruction that forces earlier memory operations to complete before later ones."],
        ["Test-and-set (atomic exchange)", "An atomic instruction that stores a new value and returns the old one."],
        ["Compare-and-swap", "An atomic instruction that replaces a value only if it equals an expected one."],
        ["Fetch-and-add", "An atomic instruction that adds to a location and returns its old value."],
        ["Spin lock", "A lock whose waiters loop, testing it, until it is free."],
        ["Futex", "Linux's fast user-space mutex: atomic instructions in user space, a system call only to sleep or wake."],
        ["Condition variable", "A queue of threads waiting, with a lock, for a condition to become true; wait, notify and notify_all."],
        ["Mesa semantics", "A woken thread must reacquire the lock and recheck its condition, so waits go in while loops."],
        ["Bounded buffer", "A fixed-capacity buffer shared by producers and consumers, who wait when it is full or empty."],
        ["Monitor", "Shared data together with one lock held by all its methods and condition variables for waiting."]
      ],
      quiz: [
        { q: "Why can't a user program make a lock by disabling interrupts?", choices: ["It's too slow", "Disabling interrupts is privileged, and it wouldn't stop threads on other cores anyway", "Interrupts can't be disabled", "It works fine"], answer: 1, why: "A program allowed to disable interrupts could monopolize the machine; and other cores keep running." },
        { q: "What does test-and-set do?", choices: ["Tests a value without changing it", "Atomically stores a new value and returns the old one", "Compares two registers", "Sets a bit in the page table"], answer: 1, why: "If the old value was 0 (free), the caller now holds the lock." },
        { q: "When is a spin lock a good choice?", choices: ["On a single core with long critical sections", "When critical sections are very short and waiters have their own cores", "Always", "Never"], answer: 1, why: "Spinning briefly is cheaper than two context switches; on one core it wastes the whole slice." },
        { q: "What must condition-variable wait() do atomically?", choices: ["Release the lock and go to sleep", "Acquire two locks", "Notify all threads", "Check the condition"], answer: 0, why: "Otherwise a notify could arrive between releasing and sleeping and be lost." },
        { q: "Why must a consumer wait in a while loop rather than an if?", choices: ["Style only", "After waking, another thread may already have taken the item, so the condition must be rechecked", "while is faster", "if doesn't work with locks"], answer: 1, why: "Under Mesa semantics, being woken only means the condition may be true." },
        { q: "Why doesn't Peterson's algorithm work on modern processors without extra instructions?", choices: ["It needs three threads", "Processors may let a later load overtake an earlier store, so a thread can read the other's stale flag", "It uses too much memory", "It needs test-and-set"], answer: 1, why: "Store buffers reorder memory operations; fences are needed to prevent that." }
      ],
      practice: [
        {
          q: `<p>Show an interleaving of <code>FlagsOnly</code> in which both threads enter the critical section, step by step.</p>`,
          a: `<p>Thread 0 checks <code>flag[1]</code>: false, so it leaves the loop and yields. Thread 1 checks <code>flag[0]</code>: still false, so it leaves its loop too. Thread 0 sets <code>flag[0]</code> = true and enters; thread 1 sets <code>flag[1]</code> = true and enters. Both are inside. The check and the set are separate steps, so both threads can check before either sets.</p>`
        },
        {
          q: `<p>Using test-and-set, write <code>acquire</code> and <code>release</code> for the simulator: <code>tas(cell)</code> sets <code>cell[0]</code> to 1 and returns the old value in one step. Why is this lock unfair?</p>`,
          a: `<pre><code>def tas(cell):
    old = cell[0]
    cell[0] = 1
    return old

class TASLock:
    def __init__(self):
        self.cell = [0]
    def acquire(self):
        while tas(self.cell) == 1:
            yield
    def release(self):
        self.cell[0] = 0

lock = TASLock()
order = []
def worker(i):
    yield from lock.acquire()
    order.append(i)
    yield
    lock.release()
run([worker(i) for i in range(3)], seed=1)
print(sorted(order))   # [0, 1, 2]</code></pre><p>When the lock is released, whichever waiter happens to run next and swap first gets it. Nothing records who has waited longest, so an unlucky thread can lose every time: no bounded waiting. A ticket lock fixes this by giving each waiter a number with fetch-and-add.</p>`
        },
        {
          q: `<p>The bounded buffer uses one condition variable, <code>cond</code>, for both producers and consumers, and calls <code>cond.notify()</code> after each put and get. Capacity is 1; there are two consumers and one producer. Find a sequence of events that leaves all three threads asleep.</p>`,
          hint: `<p>Let both consumers go to sleep on the empty buffer first.</p>`,
          a: `<p>Consumers C1 and C2 find the buffer empty and wait. The producer puts an item and notifies, waking C1; then it tries to put again, finds the buffer full and waits. C1 takes the item and notifies once: the one thread woken is C2 (first in the queue), not the producer. C2 finds the buffer empty and waits again. C1 loops, finds it empty and waits. Now C1, C2 and the producer are all asleep, and nobody will ever notify. With separate <code>not_full</code> and <code>not_empty</code> conditions, a consumer's notify can only wake a producer.</p>`
        },
        {
          q: `<p>Explain why the condition-variable rule "hold the lock while you check the condition and call wait" is necessary. What can go wrong if a consumer checks <code>if not self.items</code> without the lock and then waits?</p>`,
          a: `<p>Without the lock, this can happen: the consumer sees the buffer empty; before it calls <code>wait</code>, a producer adds an item and calls <code>notify</code>, but nobody is waiting yet, so the notify does nothing. The consumer then waits, and sleeps even though an item is there: a <em>lost wakeup</em>. If the producer never puts again, the consumer sleeps forever. Holding the lock from the check through <code>wait</code> (which releases it atomically as it sleeps) means the producer can't add and notify in that gap.</p>`
        }
      ],
      sources: ["ostep", "peterson81", "pythreading"]
    },
    {
      id: "os5",
      title: "Semaphores and deadlock",
      minutes: 90,
      summary: "Dijkstra's semaphores and how they serve as locks, for ordering and for counting; the readers–writers and dining philosophers problems; the four conditions for deadlock and resource-allocation graphs; and preventing, avoiding (the banker's algorithm) and detecting deadlock.",
      notes: `
<p>Lesson 4 built locks and condition variables. A third primitive, older than both, can do the work of either, and the problems it was invented for lead straight to the danger of all locking: deadlock.</p>

<h3>Semaphores</h3>
<p>A <strong>semaphore</strong>, introduced by Edsger Dijkstra around 1965, is a non-negative integer with two atomic operations:</p>
<ul>
<li><strong>wait</strong> (Dijkstra's <em>P</em>; <code>sem_wait</code> in C, <code>acquire</code> in Python): wait until the value is positive, then decrement it.</li>
<li><strong>post</strong> (Dijkstra's <em>V</em>; <code>sem_post</code>, <code>release</code>): increment the value, waking one waiting thread if any.</li>
</ul>
<p>The initial value decides what it does. Here is a semaphore built from Lesson 4's tools, and a use of it for ordering:</p>
<pre><code>import threading

class Semaphore:
    def __init__(self, value):
        self.value = value
        self.cond = threading.Condition()     # makes its own lock
    def wait(self):                           # Dijkstra's P
        with self.cond:
            while self.value == 0:
                self.cond.wait()
            self.value -= 1
    def post(self):                           # Dijkstra's V
        with self.cond:
            self.value += 1
            self.cond.notify()

done = Semaphore(0)
log = []
def child():
    log.append("child runs")
    done.post()
t = threading.Thread(target=child)
t.start()
done.wait()                 # blocks until the child has posted
log.append("parent continues")
print(log)   # ['child runs', 'parent continues']
t.join()</code></pre>
<ul>
<li>Initial value <strong>1</strong>: a lock (a <em>binary semaphore</em>). The first wait takes it to 0; others wait until a post.</li>
<li>Initial value <strong>0</strong>: ordering, as above. The parent's wait can't succeed until the child has posted, whichever runs first.</li>
<li>Initial value <strong><em>n</em></strong>: a counter of available resources, such as free slots in a buffer or connections in a pool.</li>
</ul>
<p>The bounded buffer of Lesson 4 can be written with three semaphores: <code>empty</code> = capacity (free slots), <code>full</code> = 0 (filled slots) and <code>mutex</code> = 1. A producer does <code>empty.wait()</code>, <code>mutex.wait()</code>, adds the item, <code>mutex.post()</code>, <code>full.post()</code>; a consumer is the mirror image. The order matters: if a producer took <code>mutex</code> first and then waited on <code>empty</code> with the buffer full, it would sleep holding the lock, and no consumer could ever get in to make room. That is a deadlock.</p>
<p>Semaphores are powerful but easy to misuse: nothing connects a semaphore to the data it protects or the condition it stands for, and a forgotten <code>post</code> or a swapped pair breaks the program silently. Most modern code prefers locks and condition variables, and uses semaphores for counting.</p>

<h3>Readers and writers</h3>
<p>Many shared structures are read far more often than written. Readers don't interfere with each other, so a plain lock, which lets one thread in at a time, wastes parallelism. A <strong>readers–writer lock</strong> lets any number of readers in together, or one writer alone. A simple version keeps a count of readers, protected by a lock. The first reader to arrive acquires a <code>write_lock</code> semaphore, which keeps writers out; the last reader to leave releases it; a writer simply waits on <code>write_lock</code>. This version has a fairness problem: while readers keep arriving, the count never drops to zero and a writer can wait forever (starvation). Fairer versions stop admitting new readers once a writer is waiting, at the cost of some reader parallelism. Python's standard library has no readers–writer lock; databases (CS 340) and kernels use them heavily.</p>

<h3>The dining philosophers</h3>
<p>Dijkstra's famous puzzle: five philosophers sit at a round table with one fork between each pair. A philosopher alternates between thinking and eating, and needs both neighbouring forks to eat. The obvious program, "pick up the left fork, then the right fork, eat, put both down", works almost always. But if all five pick up their left forks at the same moment, each waits forever for a right fork held by a neighbour. Nobody can proceed: a <strong>deadlock</strong>.</p>
<p>The standard fix breaks the symmetry: number the forks 0 to 4, and have every philosopher pick up the lower-numbered of their two forks first. Philosopher 4, whose forks are 4 and 0, now reaches for fork 0 first, and a cycle of waiting can no longer form. The same idea fixes any program with several locks: always acquire them in one global order.</p>

<h3>The four conditions</h3>
<p>Here is a deadlock with two real threads and two locks, taken in opposite orders. A barrier (<code>threading.Barrier(2)</code>, whose <code>wait</code> returns only when both threads have reached it) makes sure each thread holds its first lock before trying the second, and a timeout makes each give up instead of waiting forever:</p>
<pre><code>a, b = threading.Lock(), threading.Lock()
both_hold_one = threading.Barrier(2)
both_tried = threading.Barrier(2)
result = {}
def worker(name, first, second):
    with first:
        both_hold_one.wait()                    # make sure each thread holds its first lock
        got = second.acquire(timeout=0.2)       # give up after 0.2 s instead of waiting forever
        result[name] = got
        both_tried.wait()                       # keep holding the first lock until both have tried
        if got:
            second.release()
t1 = threading.Thread(target=worker, args=("T1", a, b))
t2 = threading.Thread(target=worker, args=("T2", b, a))
t1.start(); t2.start(); t1.join(); t2.join()
print(sorted(result.items()))   # [('T1', False), ('T2', False)]</code></pre>
<p>Coffman, Elphick and Shoshani showed in 1971 that deadlock needs four conditions to hold at once:</p>
<ol>
<li><strong>Mutual exclusion:</strong> a resource can be held by only one thread at a time.</li>
<li><strong>Hold and wait:</strong> a thread holds resources while waiting for others.</li>
<li><strong>No preemption:</strong> resources can't be taken away from a thread; it must release them.</li>
<li><strong>Circular wait:</strong> there is a cycle of threads, each waiting for a resource held by the next.</li>
</ol>
<p>A <strong>resource-allocation graph</strong> pictures the state: a node for each thread and each resource, an edge from a resource to the thread holding it, and an edge from a thread to a resource it is waiting for. When each resource has a single instance, a cycle in this graph means deadlock. Collapsing the resource nodes gives the <strong>wait-for graph</strong>, with an edge T → U when T waits for something U holds. In the program above, T1 → T2 → T1.</p>
<figure class="fig"><svg viewBox="0 0 420 150" width="420" role="img" aria-label="Resource-allocation graph: lock a is held by T1, T1 waits for lock b, lock b is held by T2, T2 waits for lock a, forming a cycle.">
<g class="box"><circle cx="80" cy="40" r="22"/><circle cx="340" cy="40" r="22"/></g>
<g class="hl"><rect x="58" y="100" width="44" height="34"/><rect x="318" y="100" width="44" height="34"/></g>
<g class="text"><text x="80" y="45" text-anchor="middle">T1</text><text x="340" y="45" text-anchor="middle">T2</text><text x="80" y="122" text-anchor="middle">a</text><text x="340" y="122" text-anchor="middle">b</text>
<text x="210" y="28" class="m" text-anchor="middle">T1 waits for b</text><text x="210" y="148" class="m" text-anchor="middle">T2 waits for a</text>
<text x="40" y="80" class="m" text-anchor="middle">held by</text><text x="380" y="80" class="m" text-anchor="middle">held by</text></g>
<g class="ln"><line x1="80" y1="100" x2="80" y2="62"/><line x1="340" y1="100" x2="340" y2="62"/><line x1="102" y1="40" x2="318" y2="105"/><line x1="318" y1="40" x2="102" y2="105"/></g>
</svg><figcaption>Each lock (square) is held by the thread above it, and each thread (circle) waits for the other lock: a cycle, so a deadlock.</figcaption></figure>

<h3>Prevention</h3>
<p>Breaking any one condition prevents deadlock:</p>
<ul>
<li><strong>Circular wait:</strong> impose a global order on locks and always acquire in that order (the philosophers' fix). This is the most common technique. The Linux kernel documents its lock orders, and a tool, <em>lockdep</em>, checks them while the kernel runs.</li>
<li><strong>Hold and wait:</strong> acquire everything at once, for example by holding a "master" lock while taking the others. Simple, but it reduces concurrency and requires knowing in advance what you'll need.</li>
<li><strong>No preemption:</strong> use a <em>try-lock</em> (<code>acquire(blocking=False)</code>, <code>pthread_mutex_trylock</code>): if the second lock is taken, release the first and start over. This can <em>livelock</em> (both threads repeatedly back off and retry in step); a random delay before retrying helps.</li>
<li><strong>Mutual exclusion:</strong> avoid locks entirely with <em>lock-free</em> data structures built on compare-and-swap. They are hard to get right and used for a few heavily shared structures.</li>
</ul>

<h3>Avoidance: the banker's algorithm</h3>
<p>Instead of restricting how programs lock, the system can refuse to grant a request that could lead to deadlock. Dijkstra's <strong>banker's algorithm</strong> requires each process to declare the maximum it will ever need of each resource type. A state is <strong>safe</strong> if there is some order in which every process can obtain its maximum and finish, given what is available now and what earlier processes in the order release. The banker grants a request only if the state after granting is safe; otherwise the requester waits.</p>
<p>The safety check: let <em>work</em> = available. Repeatedly find an unfinished process whose remaining <em>need</em> (maximum − allocation) is at most <em>work</em> in every resource; it can finish, so add its allocation to <em>work</em> and mark it finished. If every process finishes, the state is safe. An example with three resource types and five processes:</p>
<table>
<tr><th>Process</th><th>Allocation</th><th>Maximum</th><th>Need</th></tr>
<tr><td>P0</td><td>0 1 0</td><td>7 5 3</td><td>7 4 3</td></tr>
<tr><td>P1</td><td>2 0 0</td><td>3 2 2</td><td>1 2 2</td></tr>
<tr><td>P2</td><td>3 0 2</td><td>9 0 2</td><td>6 0 0</td></tr>
<tr><td>P3</td><td>2 1 1</td><td>2 2 2</td><td>0 1 1</td></tr>
<tr><td>P4</td><td>0 0 2</td><td>4 3 3</td><td>4 3 1</td></tr>
</table>
<p>Available is (3, 3, 2). Scanning from P0 each time: P0 needs 7 of the first resource, too many; P1's need (1, 2, 2) fits, so <em>work</em> becomes (3, 3, 2) + (2, 0, 0) = (5, 3, 2). Then P3 fits: (7, 4, 3). Then P0 (7, 4, 3) fits exactly: (7, 5, 3). Then P2: (10, 5, 5). Then P4: (10, 5, 7). The safe sequence is P1, P3, P0, P2, P4. If P1 now asks for (1, 0, 2), the banker pretends to grant it (available (2, 3, 0), P1's allocation (3, 0, 2)) and runs the check again; P1, P3, P0, P2, P4 still works, so the request is granted. A programming problem implements both steps.</p>
<p>The banker's algorithm costs O(<em>n</em><sup>2</sup><em>m</em>) time per request for <em>n</em> processes and <em>m</em> resource types, and needs maximums declared in advance, which general-purpose programs can't supply. It is mostly used in specialized systems; its idea of checking a "safe" state survives, for example in admission control for real-time systems.</p>

<h3>Detection and recovery</h3>
<p>The third approach lets deadlocks happen, detects them and recovers. With single-instance resources, detection means finding a cycle in the wait-for graph, with CS 201 Lesson 7's depth-first search or topological sort in O(<em>V</em> + <em>E</em>) time. Recovery means breaking the cycle: kill a process, or roll back a transaction and retry it. Databases do exactly this: they keep a wait-for graph of transactions waiting for each other's locks, check it periodically, and abort one transaction in each cycle (the "victim"), which the application retries. For many systems the simplest policy is to ignore deadlock (the "ostrich algorithm") and let a person or a watchdog restart what hangs, a reasonable choice only when deadlocks are rare and restarts cheap.</p>
`,
      terms: [
        ["Semaphore", "A non-negative integer with atomic wait (decrement, waiting while zero) and post (increment, waking a waiter)."],
        ["Binary semaphore", "A semaphore with initial value 1, used as a lock."],
        ["Readers–writer lock", "A lock that admits many readers together or one writer alone."],
        ["Dining philosophers", "Dijkstra's problem of five philosophers sharing five forks, which can deadlock if each takes the left fork first."],
        ["Deadlock", "A set of threads each waiting for a resource held by another in the set, so none can proceed."],
        ["Coffman conditions", "Mutual exclusion, hold and wait, no preemption, and circular wait: all four are needed for deadlock."],
        ["Resource-allocation graph", "A graph of threads and resources with holding and waiting edges; with single instances, a cycle means deadlock."],
        ["Wait-for graph", "A graph with an edge T → U when thread T waits for a resource held by U."],
        ["Lock ordering", "Acquiring locks in one global order, which prevents circular wait."],
        ["Livelock", "Threads that keep changing state in response to each other without making progress."],
        ["Safe state", "A state from which some order lets every process obtain its declared maximum and finish."],
        ["Banker's algorithm", "Deadlock avoidance that grants a request only if the resulting state is safe."]
      ],
      quiz: [
        { q: "A semaphore starts at 0. Thread A calls wait before thread B calls post. What happens?", choices: ["A continues at once", "A waits until B posts, then continues", "The program crashes", "B waits"], answer: 1, why: "With value 0, wait blocks until a post makes the value positive." },
        { q: "In a semaphore bounded buffer, why must a producer wait on empty before taking the mutex?", choices: ["It's faster", "Waiting on empty while holding the mutex would block every consumer, causing deadlock when the buffer is full", "The mutex isn't needed", "Order doesn't matter"], answer: 1, why: "A producer asleep with the mutex keeps consumers from making room." },
        { q: "Which technique prevents circular wait?", choices: ["Acquiring locks in a fixed global order", "Using semaphores instead of locks", "Shorter critical sections", "More threads"], answer: 0, why: "If every thread acquires in the same order, no cycle of waiting can form." },
        { q: "What does the banker's algorithm require of processes?", choices: ["Nothing", "That they declare their maximum need of each resource in advance", "That they never wait", "That they use spin locks"], answer: 1, why: "The safety check needs each process's remaining need." },
        { q: "Available (1, 1); P0 holds (1, 0) with max (2, 1); P1 holds (0, 1) with max (1, 3). Is the state safe?", choices: ["Yes: P0 then P1", "Yes: P1 then P0", "No", "Can't tell"], answer: 2, why: "P0's need (1, 1) fits, and after it finishes available is (2, 1). But P1's need is (1, 3) − (0, 1) = (1, 2), which never fits, so no order lets both finish." },
        { q: "How do databases usually handle deadlock between transactions?", choices: ["They prevent it with the banker's algorithm", "They detect cycles in a wait-for graph and abort one transaction", "They ignore it", "They disable interrupts"], answer: 1, why: "An aborted transaction can be rolled back and retried safely." }
      ],
      practice: [
        {
          q: `<p>Use two semaphores to make threads A and B alternate strictly: A1, B1, A2, B2, …, where each thread prints its line in a loop. Give the initial values.</p>`,
          a: `<p><code>a_turn</code> = 1 and <code>b_turn</code> = 0. Thread A loops: <code>a_turn.wait()</code>, print, <code>b_turn.post()</code>. Thread B loops: <code>b_turn.wait()</code>, print, <code>a_turn.post()</code>. A can print first because its semaphore starts at 1; B must wait for A's post; A's next wait blocks until B posts.</p><pre><code>a_turn, b_turn = Semaphore(1), Semaphore(0)
lines = []
def A():
    for k in range(1, 4):
        a_turn.wait(); lines.append(f"A{k}"); b_turn.post()
def B():
    for k in range(1, 4):
        b_turn.wait(); lines.append(f"B{k}"); a_turn.post()
ts = [threading.Thread(target=B), threading.Thread(target=A)]
for t in ts: t.start()
for t in ts: t.join()
print(lines)   # ['A1', 'B1', 'A2', 'B2', 'A3', 'B3']</code></pre>`
        },
        {
          q: `<p>For the dining philosophers with the fix "pick up the lower-numbered fork first", explain why no cycle of waiting can form. (Philosopher <em>i</em> uses forks <em>i</em> and (<em>i</em> + 1) mod 5.)</p>`,
          a: `<p>Every philosopher waits only for a fork numbered higher than one they hold: they hold their lower fork and wait for the higher. A cycle of waiting would need a chain of forks f<sub>1</sub> &lt; f<sub>2</sub> &lt; … &lt; f<sub>k</sub> &lt; f<sub>1</sub>, which is impossible. In particular philosopher 4 takes fork 0 first and so competes with philosopher 0 for it instead of holding fork 4 while waiting for fork 0.</p>`
        },
        {
          q: `<p>In the banker's example of the notes, with available (2, 3, 0) after P1's request was granted, P0 asks for (0, 2, 0). Should the banker grant it?</p>`,
          a: `<p>The request fits P0's need (7, 4, 3) and what is available, so pretend to grant it: available becomes (2, 1, 0) and P0's allocation (0, 3, 0), with need (7, 2, 3). Now check each process's need against (2, 1, 0): P0 needs 7 of the first resource; P1 (allocation (3, 0, 2) after the earlier grant, maximum (3, 2, 2)) needs (0, 2, 0), but only 1 of the second resource is free; P2 needs 6 of the first; P3 needs 1 of the third, and none is free; P4 needs (4, 3, 1). Nobody can finish, so the state would be unsafe and P0 must wait.</p>`
        },
        {
          q: `<p>Threads hold and want locks as follows: T1 holds L1 and wants L2; T2 holds L2 and wants L3; T3 holds L3; T4 holds L4 and wants L1. Draw the wait-for graph. Is there a deadlock? What if T3 then requests L4?</p>`,
          a: `<p>Edges: T1 → T2 (L2), T2 → T3 (L3), T4 → T1 (L1). There is no cycle, so no deadlock: T3 can finish and release L3, then T2, then T1, then T4. If T3 requests L4 (held by T4), add T3 → T4: now T1 → T2 → T3 → T4 → T1 is a cycle, and all four are deadlocked.</p>`
        }
      ],
      sources: ["ostep", "dijkstra65", "pythreading"]
    },
    {
      id: "os6",
      title: "Memory management",
      minutes: 90,
      summary: "Memory from the operating system's side: address spaces, page tables and multi-level page tables walked step by step, demand paging and what the kernel does on a page fault, page replacement (FIFO, LRU, the clock algorithm, OPT and Belady's anomaly), thrashing and working sets, and copy-on-write and the zero page.",
      notes: `
<p>CS 230 Lesson 7 explained how hardware translates a virtual address through a page table, with a TLB to make it fast. This lesson looks at the same machinery from the kernel's side: building the tables, deciding what lives in physical memory, and using page faults as a tool.</p>

<h3>Address spaces</h3>
<p>Each process has an <strong>address space</strong>: the range of virtual addresses it may use, laid out in regions. On Linux x86-64 a program's code sits near the bottom, followed by its global data and the heap, which grows upward as <code>malloc</code> asks for more; shared libraries are mapped in the middle; the stack starts near the top of the user half and grows down. The kernel's own memory occupies the top half of every address space, in pages marked kernel-only, so that a system call doesn't need to switch page tables. (Defences against the Meltdown attack of CS 230 Lesson 6's sidebar now hide most kernel pages from user mode on affected processors, at some cost.) The kernel records each region (its start, length, permissions and what backs it: a file such as the program itself, or "anonymous" memory that starts as zeros) separately from the page table. The page table says what is mapped <em>now</em>; the region list says what <em>may</em> be mapped.</p>

<h3>Multi-level page tables</h3>
<p>With 4 KB pages, a 32-bit address space has 2<sup>20</sup> pages; a flat table of 4-byte entries would take 4 MB per process, almost all of it describing unused addresses. A <strong>multi-level page table</strong> is a tree. In 32-bit x86, a virtual address splits into a 10-bit level-1 index, a 10-bit level-2 index and a 12-bit offset. The register <code>cr3</code> holds the physical frame of the level-1 table (the <em>page directory</em>), whose 1,024 entries each point to a level-2 table, whose 1,024 entries each point to a data page. Each table fills exactly one 4 KB page. An entry holds a frame number in its upper bits and flags in its low 12 bits, including <em>present</em> (bit 0), <em>writable</em> (bit 1) and <em>user</em> (bit 2).</p>
<p>Walk the address 0x00402ABC. In binary its top 10 bits are 0000000001, so the level-1 index is 1; the next 10 bits are 0000000010, so the level-2 index is 2; the offset is 0xABC.</p>
<pre><code>va = 0x00402ABC
print(va &gt;&gt; 22, (va &gt;&gt; 12) &amp; 0x3FF, hex(va &amp; 0xFFF))   # 1 2 0xabc</code></pre>
<p>Suppose the page directory is in frame 5 and its entry 1 is <code>(9 &lt;&lt; 12) | 7</code>: present, writable, user, pointing to a level-2 table in frame 9. If entry 2 of that table is <code>(0x42 &lt;&lt; 12) | 7</code>, the data is in frame 0x42, and the physical address is 0x42 × 4096 + 0xABC = 0x42ABC. Translation took two memory reads before the real access, which is why the TLB matters.</p>
<figure class="fig"><svg viewBox="0 0 460 170" width="460" role="img" aria-label="A virtual address split into index 1, index 2 and offset. Index 1 selects an entry of the page directory in frame 5, which points to a page table in frame 9; index 2 selects its entry, which points to data frame 0x42; the offset selects the byte.">
<g class="box"><rect x="20" y="20" width="80" height="26"/><rect x="100" y="20" width="80" height="26"/><rect x="180" y="20" width="100" height="26"/>
<rect x="40" y="90" width="90" height="60"/><rect x="190" y="90" width="90" height="60"/><rect x="340" y="90" width="90" height="60"/></g>
<g class="hl"><rect x="40" y="110" width="90" height="16"/><rect x="190" y="118" width="90" height="16"/></g>
<g class="text"><text x="60" y="38" text-anchor="middle">1</text><text x="140" y="38" text-anchor="middle">2</text><text x="230" y="38" text-anchor="middle">0xABC</text>
<text x="85" y="84" class="m" text-anchor="middle">directory (frame 5)</text><text x="235" y="84" class="m" text-anchor="middle">table (frame 9)</text><text x="385" y="84" class="m" text-anchor="middle">data (frame 0x42)</text>
<text x="85" y="122" text-anchor="middle" class="m">entry 1 → 9</text><text x="235" y="130" text-anchor="middle" class="m">entry 2 → 0x42</text><text x="385" y="124" text-anchor="middle" class="m">byte 0xABC</text></g>
<g class="ln"><line x1="60" y1="46" x2="85" y2="110"/><line x1="140" y1="46" x2="235" y2="118"/><line x1="130" y1="118" x2="190" y2="100"/><line x1="280" y1="126" x2="340" y2="110"/><line x1="230" y1="46" x2="385" y2="118"/></g>
</svg><figcaption>A two-level walk: each index selects an entry in one table, and each entry names the frame of the next.</figcaption></figure>
<p>The saving comes from leaving level-2 tables out. A small process with code at the bottom of its address space and a stack at the top needs the directory plus two level-2 tables: 12 KB instead of 4 MB. A directory entry that isn't present means a whole 4 MB region (1,024 pages) is unmapped. x86-64 uses four levels of 512-entry tables for 48-bit addresses (9 + 9 + 9 + 9 + 12 bits); the permission bits are checked at every level, and an access is allowed only if every entry on the path allows it.</p>

<h3>Demand paging and page faults</h3>
<p>The kernel doesn't load a program into memory when it starts. It sets up the region list and leaves most page-table entries not present. When the program touches a page for the first time, the hardware raises a <strong>page fault</strong> (Lesson 1's exception), saving the faulting address (in <code>cr2</code> on x86) and running the kernel's handler, which:</p>
<ol>
<li>looks up the address in the region list. If it isn't in any region, or the access breaks the region's permissions, it sends the process a signal that kills it: a segmentation fault.</li>
<li>finds a free physical frame, evicting a page if none is free (below);</li>
<li>fills the frame: reads the page from the program file or from swap space on disk, or fills it with zeros for new anonymous memory;</li>
<li>updates the page-table entry to present, and returns, so that the faulting instruction runs again and now succeeds.</li>
</ol>
<p>This is <strong>demand paging</strong>: pages are loaded only when used. A page fault that needs a disk read is a <em>major</em> fault, costing milliseconds on a hard disk or about 100 µs on an SSD; one that only needs a zeroed frame or a page already in memory is a <em>minor</em> fault, costing around a microsecond. Faults must be rare. If memory takes 100 ns and a major fault 8 ms, the effective access time with fault rate <em>p</em> is (1 − <em>p</em>) × 100 ns + <em>p</em> × 8,000,000 ns. For that to stay within 10% of 100 ns, <em>p</em> must be below 10/7,999,900 ≈ 1.25 × 10<sup>−6</sup>: about one fault in 800,000 accesses.</p>

<h3>Page replacement</h3>
<p>When memory is full, the kernel must choose a <em>victim</em> page to evict; if the page was modified (its <em>dirty</em> bit is set), it must be written to disk first. The policy aims to evict the page that won't be needed for the longest time. Compare policies on the reference string 7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2 (page numbers in the order a program touches them) with 3 frames:</p>
<ul>
<li><strong>FIFO</strong> evicts the page loaded earliest. Simple, but it evicts heavily used pages just because they're old.</li>
<li><strong>OPT</strong> (Belady's optimal algorithm, 1966) evicts the page whose next use is farthest in the future. It needs to know the future, so it can't be implemented, but it gives the minimum number of faults to compare others against.</li>
<li><strong>LRU</strong> (least recently used) evicts the page unused for longest, using the past as a guess about the future: by locality, recently used pages are likely to be used again.</li>
</ul>
<table>
<tr><th>Reference</th><th>7</th><th>0</th><th>1</th><th>2</th><th>0</th><th>3</th><th>0</th><th>4</th><th>2</th><th>3</th><th>0</th><th>3</th><th>2</th></tr>
<tr><td>FIFO: evicts</td><td>F</td><td>F</td><td>F</td><td>F: 7</td><td>hit</td><td>F: 0</td><td>F: 1</td><td>F: 2</td><td>F: 3</td><td>F: 0</td><td>F: 4</td><td>hit</td><td>hit</td></tr>
<tr><td>LRU: evicts</td><td>F</td><td>F</td><td>F</td><td>F: 7</td><td>hit</td><td>F: 1</td><td>hit</td><td>F: 2</td><td>F: 3</td><td>F: 0</td><td>F: 4</td><td>hit</td><td>hit</td></tr>
<tr><td>OPT: evicts</td><td>F</td><td>F</td><td>F</td><td>F: 7</td><td>hit</td><td>F: 1</td><td>hit</td><td>F: 0</td><td>hit</td><td>hit</td><td>F: 4</td><td>hit</td><td>hit</td></tr>
</table>
<p>FIFO has 10 faults, LRU 9 and OPT 7. At the reference to 2, OPT holds 7, 0 and 1, and neither 7 nor 1 is ever used again: both are equally far in the future. Which one goes can't change the number of faults, since neither would ever be hit; the table breaks the tie by evicting the page loaded earliest, 7. At the reference to 4, OPT holds 2, 0 and 3, whose next uses are at positions 9, 11 and 10 (counting from 1), so it evicts 0; LRU evicts 2, used least recently, and is immediately punished.</p>
<p>Exact LRU would need to update a timestamp or list on every memory access, far too costly. Hardware instead sets a <strong>use bit</strong> (or <em>accessed</em> bit) in the page-table entry whenever a page is touched, and the <strong>clock algorithm</strong> approximates LRU with it. Arrange the frames in a circle with a hand pointing at one. To find a victim, look at the frame under the hand: if its use bit is 1, clear it (a "second chance") and move on; if it is 0, the page hasn't been used since the hand last passed, so evict it. Pages in active use keep getting their bits set again and survive. On the string above, clock has 9 faults, the same as LRU. Real kernels use refinements: Linux keeps "active" and "inactive" lists, and prefers clean pages, which can be dropped without a write.</p>

<h3>Belady's anomaly</h3>
<p>Surely more memory never hurts? With FIFO it can. On the string 1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5, FIFO has 9 faults with 3 frames and 10 with 4 frames: <strong>Belady's anomaly</strong>. LRU and OPT never do this, because they are <em>stack algorithms</em>: the set of pages they keep with <em>k</em> frames is always a subset of the set they keep with <em>k</em> + 1, so every hit with fewer frames is also a hit with more. FIFO's sets with 3 and 4 frames drift apart (after the reference to 5, it holds {1, 2, 5} with 3 frames but {2, 3, 4, 5} with 4).</p>

<h3>Thrashing and the working set</h3>
<p>If the processes running together need more pages than there are frames, every replacement evicts a page that some process needs soon, and the system spends its time waiting for the disk: <strong>thrashing</strong> (CS 230 Lesson 7 named it). Processor use collapses just as more is demanded. Peter Denning's <strong>working set</strong> (1968) is the set of pages a process used in its last τ references (or the last τ milliseconds):</p>
<pre><code>def working_set(refs, t, tau):
    """Pages used in the window of tau references ending at position t."""
    return sorted(set(refs[max(0, t - tau + 1):t + 1]))

refs = [1, 2, 1, 3, 4, 4, 4, 4, 5, 5, 4, 5]
print(working_set(refs, 4, 4))    # [1, 2, 3, 4]
print(working_set(refs, 11, 4))   # [4, 5]</code></pre>
<p>A process makes progress only if its working set is in memory. The fix for thrashing is admission control: run only as many processes as have working sets that fit, and suspend (swap out) the rest. Today, memory is usually large enough that a thrashing machine is a sign of a mistake; Linux's last resort is the <em>out-of-memory killer</em>, which picks a process to kill so the rest can run.</p>

<h3>Copy-on-write and the zero page</h3>
<p>Page faults are also a tool. Lesson 1 noted that <code>fork</code> copies the whole address space, only for <code>exec</code> to throw it away. With <strong>copy-on-write</strong> (COW), <code>fork</code> copies only the page tables: parent and child map the same physical frames, and every writable page is marked read-only in both. Reading costs nothing. When either process writes to such a page, the protection fault runs the kernel, which sees that the page is copy-on-write, copies it to a new frame for the writer, marks both copies writable again, and restarts the write. Only pages that are actually written are ever copied, and a <code>fork</code> followed by <code>exec</code> copies almost nothing. The kernel counts how many page tables map each frame, so a frame mapped by only one process can simply be made writable.</p>
<p>The same trick explains CS 210 Lesson 7's observation that a large, never-written array reads as zeros and sits in the cache. New anonymous pages are initially mapped, read-only, to a single shared frame full of zeros, the <strong>zero page</strong>. Reading anywhere in the array reads that one frame, which stays in the cache. The first write to a page causes a fault, and the kernel gives the page a private zero-filled frame. That's why the CS 210 program wrote every element first: to make its 64 MB really exist.</p>
`,
      terms: [
        ["Address space", "The virtual addresses a process may use, organized in regions such as code, heap, libraries and stack."],
        ["Page directory", "The top-level table of a multi-level page table, whose frame is held in a register (cr3 on x86)."],
        ["Demand paging", "Loading a page into memory only when it is first used, on a page fault."],
        ["Major and minor fault", "A page fault that needs a disk read, or one that can be satisfied from memory (such as a zeroed frame)."],
        ["Dirty bit", "A page-table bit set when a page is written, meaning it must be saved before eviction."],
        ["Use (accessed) bit", "A page-table bit set by hardware whenever a page is accessed."],
        ["OPT", "Belady's optimal replacement: evict the page used farthest in the future."],
        ["LRU", "Least recently used replacement: evict the page unused for longest."],
        ["Clock algorithm", "An LRU approximation that sweeps frames in a circle, clearing use bits and evicting a page whose bit is 0."],
        ["Belady's anomaly", "More frames giving more faults, which can happen with FIFO."],
        ["Working set", "The set of pages a process used in a recent window of time."],
        ["Thrashing", "Spending most of the time handling page faults because working sets don't fit in memory."],
        ["Copy-on-write", "Sharing pages read-only after fork and copying a page only when one process writes it."],
        ["Zero page", "A shared frame of zeros that new, unwritten pages map to until their first write."]
      ],
      quiz: [
        { q: "In 32-bit x86 paging, what is the level-1 index of virtual address 0x00C03123?", choices: ["0", "3", "0x30", "0x123"], answer: 1, why: "0x00C03123 >> 22 = 3 (0x00C00000 is 3 × 4 MB); the level-2 index is 3 too, and the offset 0x123." },
        { q: "Why do multi-level page tables save memory?", choices: ["Entries are smaller", "Lower-level tables for unused regions are never allocated", "They compress pages", "They skip the TLB"], answer: 1, why: "A non-present directory entry stands for a whole unmapped region." },
        { q: "A program touches a page of its heap for the first time. What happens?", choices: ["Segmentation fault", "A page fault; the kernel maps a zero-filled frame and restarts the instruction", "The TLB is flushed", "Nothing"], answer: 1, why: "The address is in a valid region, so it's demand paging, not an error." },
        { q: "Which policy can suffer Belady's anomaly?", choices: ["OPT", "LRU", "FIFO", "None"], answer: 2, why: "LRU and OPT are stack algorithms; FIFO isn't." },
        { q: "In the clock algorithm, what happens to a page under the hand whose use bit is 1?", choices: ["It is evicted", "Its bit is cleared and the hand moves on", "It is written to disk", "The hand stops"], answer: 1, why: "It gets a second chance; it's evicted next time only if it hasn't been used since." },
        { q: "After fork with copy-on-write, the child writes one page. How many pages are copied?", choices: ["All of them", "None", "One", "Half"], answer: 2, why: "Only the written page is copied, on its protection fault." }
      ],
      practice: [
        {
          q: `<p>Run FIFO, LRU and OPT by hand on 1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5 with 3 frames. Then FIFO with 4 frames.</p>`,
          a: `<p><b>FIFO, 3 frames:</b> 1, 2, 3 fault; 4 evicts 1; 1 evicts 2; 2 evicts 3; 5 evicts 4; 1 and 2 hit; 3 evicts 1; 4 evicts 2; 5 hits. 9 faults.</p><p><b>LRU, 3 frames:</b> 1, 2, 3, 4 (evicts 1), 1 (evicts 2), 2 (evicts 3), 5 (evicts 4) fault; 1, 2 hit; 3 (evicts 5), 4 (evicts 1), 5 (evicts 2) fault: 10 faults.</p><p><b>OPT, 3 frames:</b> 1, 2, 3 fault. At 4, the next uses of 1, 2 and 3 are at positions 5, 6 and 10, so 4 evicts 3. 1 and 2 hit. At 5, the next uses of 1, 2 and 4 are at 8, 9 and 11, so 5 evicts 4. 1 and 2 hit. At 3, neither 1 nor 2 is used again, so 3 evicts one of them, and 4 evicts the other. 5 hits. 7 faults.</p><p><b>FIFO, 4 frames:</b> 1–4 fault; 1, 2 hit; 5 evicts 1; 1 evicts 2; 2 evicts 3; 3 evicts 4; 4 evicts 5; 5 evicts 1. 10 faults, one more than with 3 frames.</p>`
        },
        {
          q: `<p>A system has 48-bit virtual addresses, 4 KB pages and 8-byte page-table entries. Explain why x86-64 uses four levels of 512-entry tables. How much page-table memory does a process need that uses one 4 KB page at address 0 and one at the top of the user half?</p>`,
          a: `<p>A 4 KB table holds 4096/8 = 512 entries, indexed by 9 bits. 48 − 12 = 36 bits of page number need 36/9 = 4 levels. The two pages share the top-level table but differ in its index (the first is index 0, the second index 255, the last entry of the user half), so each needs its own level-2, level-3 and level-4 table: 1 + 2 × 3 = 7 tables, 28 KB, compared with 2<sup>36</sup> × 8 bytes = 512 GB for a flat table.</p>`
        },
        {
          q: `<p>Memory access takes 100 ns. Servicing a page fault takes 10 ms when the victim page is clean and 20 ms when it is dirty (it must be written first), and 30% of victims are dirty. What fault rate keeps the effective access time below 200 ns?</p>`,
          a: `<p>Average fault time: 0.7 × 10 + 0.3 × 20 = 13 ms = 13,000,000 ns. We need (1 − <em>p</em>) × 100 + <em>p</em> × 13,000,000 &lt; 200, so <em>p</em> × 12,999,900 &lt; 100 and <em>p</em> &lt; 7.7 × 10<sup>−6</sup>: fewer than about one fault per 130,000 accesses.</p>`
        },
        {
          q: `<p>A server process uses 2 GB of memory and calls <code>fork</code>, and the child immediately calls <code>exec</code>. Roughly how much memory is copied with and without copy-on-write? What if the child instead keeps running and writes to 10% of the pages?</p>`,
          a: `<p>Without COW, all 2 GB is copied before <code>exec</code> discards it. With COW, only the page tables are copied (for 2 GB of 4 KB pages, 524,288 entries of 8 bytes, about 4 MB), plus a page or two the child writes before <code>exec</code> (its stack). If the child writes to 10% of the pages, those 200 MB are copied, one page per fault, as the writes happen: the cost is paid only for what is used.</p>`
        }
      ],
      sources: ["ostep", "csapp", "denning68"]
    },
    {
      id: "os7",
      title: "File systems",
      minutes: 90,
      summary: "How named files and directories are built from numbered disk blocks: the file and directory interfaces, the inode, an on-disk layout with bitmaps and an inode table, block pointers and indirect blocks, path lookup step by step, hard and symbolic links, the page cache, and keeping a file system consistent through crashes with fsck and journaling.",
      notes: `
<p>A disk, as Lesson 8 will show, is an array of numbered blocks. A <strong>file system</strong> turns that array into named files in a tree of directories, remembers where each file's data is, and keeps it all consistent even if the power fails mid-write.</p>

<h3>Files and directories</h3>
<p>To the kernel, a <strong>file</strong> is an array of bytes plus <em>metadata</em>: size, owner, permissions, timestamps. Its name isn't part of it. Each file has a number, its <strong>inode number</strong>, and a <strong>directory</strong> is a file whose contents are a list of (name, inode number) entries. Every directory has the entries <code>.</code> (itself) and <code>..</code> (its parent). The system calls are the ones CS 210 Lesson 8 introduced: <code>open(path, flags)</code> returns a file descriptor, <code>read(fd, buf, n)</code> and <code>write(fd, buf, n)</code> transfer bytes at the current <em>offset</em> and advance it, <code>lseek</code> moves the offset, and <code>close</code> releases the descriptor. Behind each descriptor, the kernel keeps an <em>open-file</em> record with the offset and a pointer to the file's inode, so two processes that open the same file have separate offsets.</p>

<h3>The inode</h3>
<p>An <strong>inode</strong> (index node) is a small fixed-size record, typically 128 or 256 bytes, holding everything about a file except its name: type (file, directory, symbolic link), size, owner and permissions, timestamps, a <strong>link count</strong> (how many directory entries name it), and pointers to the blocks holding its data. <code>ls -i</code> shows inode numbers and <code>stat</code> shows an inode's contents.</p>

<h3>A layout on disk</h3>
<p>Here is a very simple file system (OSTEP's "vsfs") on a disk of 64 blocks of 4 KB:</p>
<table>
<tr><th>Block</th><th>Contents</th></tr>
<tr><td>0</td><td>Superblock: the file system's size, where each region starts, how many inodes</td></tr>
<tr><td>1</td><td>Inode bitmap: one bit per inode, 1 if in use</td></tr>
<tr><td>2</td><td>Data bitmap: one bit per data block, 1 if in use</td></tr>
<tr><td>3–7</td><td>Inode table: 5 blocks × 16 inodes of 256 bytes = 80 inodes</td></tr>
<tr><td>8–63</td><td>Data blocks: 56 of them</td></tr>
</table>
<p>To read inode <em>i</em>, the file system computes its location: block 3 + <em>i</em> // 16, at byte offset (<em>i</em> mod 16) × 256. Inode 32 is at the start of block 5. A <strong>bitmap</strong> is the usual way to track free space: to allocate, find a 0 bit, set it, and use that block. It is compact, one bit per block, so a 1 TB disk of 4 KB blocks (244 million blocks) needs about 30.5 MB of bitmap, and scanning it for a run of free blocks lets the file system place a file's blocks next to each other, which matters on hard disks (Lesson 8).</p>

<h3>Finding a file's blocks</h3>
<p>The inode must say which blocks hold the file's data. The classic Unix answer, used by ext2 and ext3, is a fixed array of pointers with a tree for large files. With 4 KB blocks and 4-byte block numbers:</p>
<ul>
<li>12 <strong>direct pointers</strong> name the first 12 blocks: 48 KB.</li>
<li>A <strong>single indirect</strong> pointer names a block that holds 4096/4 = 1,024 more block numbers: another 4 MB.</li>
<li>A <strong>double indirect</strong> pointer names a block of 1,024 pointers to indirect blocks: 1,024 × 1,024 blocks, 4 GB.</li>
<li>A <strong>triple indirect</strong> pointer adds 1,024<sup>3</sup> blocks, 4 TB.</li>
</ul>
<figure class="fig"><svg viewBox="0 0 440 170" width="440" role="img" aria-label="An inode with direct pointers to data blocks and an indirect pointer to a block of pointers, which in turn point to more data blocks.">
<g class="box"><rect x="20" y="20" width="110" height="130"/><rect x="200" y="100" width="70" height="50"/>
<rect x="340" y="10" width="70" height="22"/><rect x="340" y="40" width="70" height="22"/><rect x="340" y="100" width="70" height="22"/><rect x="340" y="130" width="70" height="22"/></g>
<g class="text"><text x="75" y="38" text-anchor="middle">inode</text><text x="75" y="60" class="m" text-anchor="middle">size, links, …</text>
<text x="75" y="84" class="m" text-anchor="middle">direct 0</text><text x="75" y="102" class="m" text-anchor="middle">direct 1 …</text><text x="75" y="130" class="m" text-anchor="middle">indirect</text>
<text x="235" y="122" class="m" text-anchor="middle">block of</text><text x="235" y="138" class="m" text-anchor="middle">pointers</text>
<text x="375" y="25" class="m" text-anchor="middle">data</text><text x="375" y="55" class="m" text-anchor="middle">data</text><text x="375" y="115" class="m" text-anchor="middle">data</text><text x="375" y="145" class="m" text-anchor="middle">data</text></g>
<g class="ln"><line x1="120" y1="80" x2="340" y2="21"/><line x1="120" y1="98" x2="340" y2="51"/><line x1="120" y1="126" x2="200" y2="125"/><line x1="270" y1="115" x2="340" y2="111"/><line x1="270" y1="135" x2="340" y2="141"/></g>
</svg><figcaption>Small files use only direct pointers; larger ones add levels of indirection, like a multi-level page table.</figcaption></figure>
<p>This is the multi-level page table of Lesson 6 again: an unbalanced tree that is cheap for the many small files (measurements of real systems keep finding that most files are a few KB) and still reaches large ones. Reading byte 5,000,000 of a file means computing block 5,000,000 // 4096 = 1,220; that's past the 12 + 1,024 = 1,036 blocks reachable without double indirection, so it takes the double indirect block, then an indirect block, then the data. Modern file systems such as ext4 and XFS use <strong>extents</strong> instead: (start block, length) pairs, so a 1 GB file stored contiguously needs a single extent rather than 262,144 pointers. The old FAT file system (still used on USB sticks) chains blocks in a linked list kept in a table, which makes reaching the middle of a large file slow.</p>

<h3>Path lookup</h3>
<p>Opening <code>/home/ana/notes.txt</code> takes these steps. The root directory's inode number is fixed (2 in ext2–ext4).</p>
<ol>
<li>Read the root inode; read the root directory's data block and find the entry <code>home</code> → its inode number.</li>
<li>Read the <code>home</code> inode, check that it is a directory you may search, read its data and find <code>ana</code>.</li>
<li>Read <code>ana</code>'s inode and data, and find <code>notes.txt</code>.</li>
<li>Read <code>notes.txt</code>'s inode, check permissions, and create the open-file record and a descriptor.</li>
</ol>
<p>That's seven block reads before the first byte of the file, more for long paths or large directories. A relative path starts the same walk at the process's current directory. Two caches make this fast in practice: the <em>dentry cache</em> remembers recent name-to-inode lookups, and the page cache (below) keeps the blocks themselves.</p>

<h3>Hard and symbolic links</h3>
<p>Because names live in directories and files are inodes, one file can have several names. A <strong>hard link</strong> (<code>ln old new</code>, the <code>link</code> system call) adds a directory entry pointing to an existing inode and increments its link count. All names are equal; none is "the original". Removing a name is <code>unlink</code>: it deletes the entry and decrements the count, and only when the count reaches 0 (and no process has the file open) are the inode and its blocks freed. That's why the system call for deleting a file is called <code>unlink</code>. Hard links can't cross file systems (inode numbers are per file system) and normally can't name directories (which could create cycles in the tree).</p>
<p>A <strong>symbolic link</strong> (<code>ln -s target name</code>) is a small file of its own whose content is a path. Path lookup, on meeting one, substitutes that path and continues. A symbolic link can point anywhere, including to other file systems and directories, and can be left <em>dangling</em> when its target is removed. To stop loops, the kernel gives up with an error after following too many links in one lookup (40 on Linux).</p>
<pre><code>import os, tempfile

d = tempfile.mkdtemp()                     # a new, empty directory
a = os.path.join(d, "a.txt")
with open(a, "w") as f:
    f.write("hello\\n")
os.link(a, os.path.join(d, "b.txt"))        # a hard link: a second name, same inode
os.symlink("a.txt", os.path.join(d, "c.txt"))   # a symbolic link: a file holding the path "a.txt"

sa, sb = os.stat(a), os.stat(os.path.join(d, "b.txt"))
print(sa.st_ino == sb.st_ino, sa.st_nlink)   # True 2
print(os.readlink(os.path.join(d, "c.txt")))   # a.txt
os.remove(a)                                # unlink the name a.txt
print(open(os.path.join(d, "b.txt")).read(), end="")   # hello
print(os.stat(os.path.join(d, "b.txt")).st_nlink)   # 1
print(os.path.exists(os.path.join(d, "c.txt")))   # False</code></pre>
<p>(<code>os.stat</code> returns an inode's metadata; <code>os.path.exists</code> follows the link, and finds nothing at <code>a.txt</code>.) After the name <code>a.txt</code> is removed, the data survives under <code>b.txt</code>, but the symbolic link now dangles.</p>

<h3>Caching and buffering</h3>
<p>Disk reads are slow, so the kernel keeps recently used file blocks in otherwise unused RAM, the <strong>page cache</strong>; a second read of the same file usually never touches the disk. Writes are buffered too: <code>write</code> copies the data into the cache, marks it dirty and returns at once, and the kernel writes it to disk later (Linux, by default, within about 30 seconds), grouping many writes together. This is <strong>write-back</strong> caching, and it is a trade: if the machine crashes, recently "written" data is lost. A program that must know its data is safe, such as a database committing a transaction or an editor saving a file, calls <code>fsync(fd)</code>, which returns only when the file's data and metadata have reached the device.</p>

<h3>Crash consistency</h3>
<p>Appending one block to a file needs three separate writes: the new data block, the inode (new size and pointer) and the data bitmap (block now in use). The disk can complete them in any order, and power can fail between any two. If only one write completes:</p>
<ul>
<li><b>Only the data block:</b> the file system is consistent; the update is simply lost.</li>
<li><b>Only the inode:</b> the inode points to a block the bitmap says is free, holding old garbage. Reading the file returns garbage, and the block may later be given to another file too.</li>
<li><b>Only the bitmap:</b> a block is marked used but nothing points to it: a space leak.</li>
</ul>
<p>Early Unix systems repaired this after a crash with <strong>fsck</strong> (file system check): scan every inode, directory and bitmap, and make them agree. It works, but takes time proportional to the disk's size: hours for a large disk, just to fix a few blocks.</p>
<p><strong>Journaling</strong> (write-ahead logging), used by ext3, ext4, NTFS, XFS and others, borrows from databases. A region of the disk, the <em>journal</em>, receives a description of each update before the update is made in place:</p>
<ol>
<li><b>Journal write:</b> write a transaction to the journal: a begin block, the new versions of the inode, bitmap and data blocks, then wait until those are on the disk.</li>
<li><b>Commit:</b> write a commit block. Once it is on disk, the transaction is official.</li>
<li><b>Checkpoint:</b> write the blocks to their real locations.</li>
<li><b>Free:</b> mark the transaction's journal space as reusable.</li>
</ol>
<p>After a crash, recovery reads the journal: transactions with a commit block are <em>replayed</em> (their blocks written again to their real locations, which is harmless if they were already written), and those without one are discarded, as if they never started. Either the whole update happens or none of it does, and recovery takes seconds, since only the journal is read. Writing every data block twice is expensive, so most systems by default journal only <em>metadata</em>: ext4's default "ordered" mode writes the data block to its final location first, then journals the inode and bitmap, so that metadata never points to unwritten data.</p>
<p>Other designs avoid in-place updates altogether. <strong>Copy-on-write file systems</strong> such as ZFS, Btrfs and Apple's APFS never overwrite a live block: they write new versions elsewhere and then switch a single root pointer, which also makes snapshots nearly free. <strong>Log-structured</strong> file systems write everything sequentially, an idea that returned with SSDs (Lesson 8).</p>
`,
      terms: [
        ["File system", "The part of the OS that organizes a device's blocks into named files and directories."],
        ["Inode", "A fixed-size record holding a file's metadata and block pointers, identified by its inode number."],
        ["Directory", "A file whose contents map names to inode numbers."],
        ["Superblock", "A block describing the file system as a whole: its size and where each region begins."],
        ["Bitmap", "One bit per inode or block, recording which are in use."],
        ["Indirect block", "A block of block numbers, used when a file is too large for the inode's direct pointers."],
        ["Extent", "A run of contiguous blocks described by a starting block and a length."],
        ["Hard link", "An additional directory entry for an existing inode; the inode is freed when its link count reaches zero."],
        ["Symbolic link", "A small file containing a path, which path lookup follows."],
        ["Page cache", "File data kept in RAM to avoid disk reads and to buffer writes."],
        ["fsync", "A system call that returns only when a file's data and metadata are safely on the device."],
        ["Crash consistency", "Keeping on-disk structures consistent when a crash interrupts a multi-block update."],
        ["fsck", "A program that scans a whole file system after a crash and repairs inconsistencies."],
        ["Journaling", "Writing a description of an update to a log, then committing, before updating in place, so it can be replayed after a crash."]
      ],
      quiz: [
        { q: "Where is a file's name stored?", choices: ["In its inode", "In the directory entries that point to its inode", "In the superblock", "In its first data block"], answer: 1, why: "The inode has no name; that's what lets a file have several hard links." },
        { q: "With 4 KB blocks, 4-byte pointers, 12 direct pointers and one single indirect pointer, how large can a file be?", choices: ["48 KB", "4 MB", "4 MB + 48 KB", "4 GB"], answer: 2, why: "12 blocks direct plus 1,024 through the indirect block: 1,036 × 4 KB." },
        { q: "A file has two hard links. One is removed with rm. What happens to the data?", choices: ["It is deleted", "It stays, reachable through the other name; the link count drops to 1", "The other link dangles", "It moves to the trash"], answer: 1, why: "Blocks are freed only when the link count reaches zero." },
        { q: "The target of a symbolic link is deleted. What happens when you open the link?", choices: ["You get the old data", "The open fails: the link dangles", "The link is deleted too", "It opens an empty file"], answer: 1, why: "A symbolic link holds only a path, which now names nothing." },
        { q: "A program calls write and the machine loses power a second later. Is the data on disk?", choices: ["Yes, always", "Not necessarily: it may still be only in the page cache; fsync would have ensured it", "Only on SSDs", "Only if the file is small"], answer: 1, why: "Write-back caching delays the disk write." },
        { q: "After a crash, the journal holds a transaction with no commit block. What does recovery do?", choices: ["Replays it", "Discards it, so the update didn't happen", "Runs fsck", "Asks the user"], answer: 1, why: "Only committed transactions are replayed; that makes each update all-or-nothing." }
      ],
      practice: [
        {
          q: `<p>In the vsfs layout of the notes, which block and byte offset hold inode 45? How many files can the file system hold, and how large can the largest file be if each inode has 12 direct pointers and no indirect pointer?</p>`,
          a: `<p>45 // 16 = 2 and 45 mod 16 = 13, so block 3 + 2 = 5 at offset 13 × 256 = 3,328. It has 80 inodes (inode 0 is usually reserved, and the root directory uses one), so at most about 80 files and directories. The largest file is 12 blocks = 48 KB, though with only 56 data blocks, several large files would fill the disk first.</p>`
        },
        {
          q: `<p>A file system has 4 KB blocks, 4-byte block numbers, 12 direct pointers, and single, double and triple indirect pointers. How many disk reads (beyond the inode) does it take to read byte 100,000,000 of a file, and why?</p>`,
          a: `<p>100,000,000 // 4096 = block 24,414. The direct pointers cover blocks 0–11 and the single indirect block 12–1,035; double indirect covers the next 1,024<sup>2</sup> = 1,048,576 blocks, so block 24,414 is there. That means reading the double indirect block, then the right indirect block (index (24,414 − 1,036) // 1,024 = 22), then the data block: 3 reads, unless they're cached.</p>`
        },
        {
          q: `<p>Explain what this sequence leaves on disk and which name still works:</p><pre data-label="Shell"><code>echo one &gt; a
ln a b
ln -s a c
rm a
echo two &gt; a</code></pre>`,
          a: `<p>After <code>ln a b</code>, one inode (say 10) has two names and link count 2. <code>c</code> is a new inode containing the path "a". <code>rm a</code> removes the name <code>a</code>; inode 10 survives with count 1, still named <code>b</code>, and <code>c</code> dangles. <code>echo two &gt; a</code> creates a <em>new</em> file named <code>a</code> (a new inode). Now <code>cat b</code> prints "one" and <code>cat c</code> prints "two": the symbolic link follows the name, not the file.</p>`
        },
        {
          q: `<p>For the append of the notes (data block, inode, bitmap), describe the state after a crash in which exactly two of the three writes completed, for each of the three pairs. Which are harmless?</p>`,
          a: `<p><b>Inode and bitmap</b> (no data): metadata is consistent, but the file's new block holds garbage, which a reader would see. <b>Inode and data</b> (no bitmap): the file is correct, but the bitmap says its block is free, so it could be given to another file and overwritten. <b>Bitmap and data</b> (no inode): the block is marked used but no inode points to it, a leak, and the data is unreachable. Only the third is harmless to existing data, and it still wastes space. Journaling makes the three writes atomic, so none of these states can be seen after recovery.</p>`
        }
      ],
      sources: ["ostep", "manpages"]
    },
    {
      id: "os8",
      title: "I/O, storage and virtualization",
      minutes: 90,
      summary: "How the OS talks to devices: device registers, polling and interrupts, DMA and drivers; hard disks and SSDs and what their latencies mean; RAID levels and parity; and running whole operating systems on virtual machines, from trap-and-emulate to hardware support, and the lighter isolation of containers.",
      notes: `
<p>The last lesson starts at the bottom, with devices, and ends at the top, with entire operating systems running as guests of another one.</p>

<h3>Talking to a device</h3>
<p>A device presents a few <strong>registers</strong> to the processor: typically a <em>status</em> register (busy or ready, errors), a <em>command</em> register and a <em>data</em> register. The processor reaches them either with special instructions (x86's <code>in</code> and <code>out</code>, <em>port I/O</em>) or, more commonly, through <strong>memory-mapped I/O</strong>: the registers appear at physical addresses, and ordinary loads and stores reach the device instead of RAM. The kernel maps those addresses kernel-only, so user programs can't touch devices directly (Lesson 1). The protocol for a simple device:</p>
<pre data-label="Pseudocode"><code>while status == BUSY: wait       # 1. wait until the device is ready
write the data to the data register      # 2. hand over the data
write the command to the command register   # 3. start it
while status == BUSY: wait       # 4. wait until it is done</code></pre>
<p>Steps 1 and 4 are <strong>polling</strong>: repeatedly reading the status. That wastes the processor if the device is slow. With <strong>interrupts</strong>, the kernel starts the operation, blocks the waiting process and runs another; the device raises an interrupt when it finishes, and the handler wakes the process (Lesson 1's blocked → ready). Interrupts aren't always better. For a very fast device, the interrupt's overhead (saving state, a context switch) can exceed the wait, so polling wins. And a network card receiving a flood of packets can interrupt so often that the machine spends all its time in interrupt handlers and no packet ever reaches a program: <em>receive livelock</em>, livelock in Lesson 5's sense (busy, changing state, but making no progress), caused here by a device rather than by threads; Linux's network stack switches to polling under heavy load, and devices <em>coalesce</em> interrupts, raising one for a batch of completions.</p>
<p>In step 2, copying a large buffer into a data register a word at a time keeps the processor busy for nothing. With <strong>direct memory access</strong> (DMA), the kernel tells a DMA engine where the buffer is in memory, how long it is and where to send it; the engine copies the data itself and interrupts when it's done, while the processor runs other code. Disks, SSDs, network cards and GPUs all move data by DMA.</p>
<p>Each device has its own registers and protocol, so the kernel talks to it through a <strong>device driver</strong>, code that knows that device and presents a standard interface (a block device that reads and writes numbered blocks, a network interface that sends packets) to the rest of the kernel. The file system of Lesson 7 doesn't know whether its blocks are on a hard disk, an SSD or a USB stick. Drivers are most of an operating system's code (more than half of the Linux kernel's source is in its <code>drivers</code> directory) and, being written for countless devices and less tested, cause a large share of its crashes.</p>

<h3>Hard disks</h3>
<p>A hard disk drive (HDD) stores data on spinning magnetic platters, read by a head on a moving arm. Data is arranged in concentric tracks of 512-byte or 4 KB sectors. Reading a random sector costs three things:</p>
<ul>
<li><strong>Seek time:</strong> moving the arm to the right track, a few milliseconds on average (about 4 ms on a desktop drive).</li>
<li><strong>Rotational delay:</strong> waiting for the sector to come round. At 7,200 revolutions per minute, one revolution takes 60,000/7,200 = 8.33 ms, and the average wait is half of that, 4.17 ms.</li>
<li><strong>Transfer time:</strong> reading the bits as they pass, at around 200 MB/s on the outer tracks.</li>
</ul>
<p>A random 4 KB read therefore takes 4 + 4.17 + 0.02 ≈ 8.19 ms, so a disk completes only about 1,000/8.19 ≈ 122 random reads a second: 122 × 4 KB ≈ 0.5 MB/s. Read 1 MB sequentially and the seek and rotation are paid once: about 5 ms of transfer at 200 MB/s. That factor of hundreds between random and sequential access drove the design of file systems for decades: keep a file's blocks together, keep inodes near their data, and reorder pending requests to shorten seeks (the kernel's <em>I/O scheduler</em>, for example the <em>elevator</em> algorithm, which serves requests in the order the arm sweeps across the disk).</p>

<h3>SSDs</h3>
<p>A solid-state drive stores bits as charge in <strong>flash memory</strong> cells, with no moving parts. A random 4 KB read takes tens of microseconds (about 100 µs including the operating system's overhead, which is what the programming problem assumes), plus the transfer: at a typical 2,000 MB/s, 4 KB takes 0.004/2000 s = 0.002 ms. In all 0.1 + 0.002 = 0.102 ms, about 9,800 reads a second one at a time, and far more when many requests are in flight at once, since an SSD has many flash chips working in parallel. Flash has awkward rules. Data is read and written in <em>pages</em> (typically 4–16 KB), but a page can't be overwritten: it must first be erased, and erasing works only on a whole <em>erase block</em> of hundreds of pages, and takes milliseconds. Each block survives only a limited number of erases (thousands, for common types).</p>
<p>So an SSD contains a small computer running a <strong>flash translation layer</strong> (FTL), which does to blocks what virtual memory does to pages: it maps the logical block numbers the OS uses to physical flash pages. A write goes to a fresh, already-erased page, and the map is updated; the old page is marked invalid. <em>Garbage collection</em> later copies the valid pages out of a mostly-invalid erase block and erases it. <em>Wear levelling</em> spreads erases evenly over all blocks. The extra copying means the flash does more writes than the OS asked for (<em>write amplification</em>). The OS helps by telling the drive which blocks no longer hold useful data (the <em>TRIM</em> command), so garbage collection needn't copy them. Notice that the FTL is a log-structured file system in miniature.</p>
<table>
<tr><th>Operation</th><th>Approximate time</th></tr>
<tr><td>Read from L1 cache</td><td>1 ns</td></tr>
<tr><td>Read from main memory</td><td>100 ns</td></tr>
<tr><td>System call</td><td>0.1–1 µs</td></tr>
<tr><td>Random 4 KB read from an SSD</td><td>20–100 µs</td></tr>
<tr><td>Network round trip within a data centre</td><td>about 500 µs</td></tr>
<tr><td>Random read from a hard disk</td><td>5–10 ms</td></tr>
</table>
<p>The gap from memory to a hard disk is a factor of about 100,000. Scaled so that a memory access takes one second, a random disk read would take more than a day.</p>

<h3>RAID</h3>
<p>One disk is too small, too slow and too likely to fail. A <strong>RAID</strong> (redundant array of inexpensive disks; Patterson, Gibson and Katz, 1988) combines <em>N</em> disks into one larger, faster or more reliable virtual disk:</p>
<ul>
<li><strong>RAID 0 (striping):</strong> spread consecutive blocks across the disks round robin. Capacity and throughput are <em>N</em> times one disk's, but losing any disk loses data.</li>
<li><strong>RAID 1 (mirroring):</strong> keep two copies of every block. It survives a disk failure; capacity is <em>N</em>/2.</li>
<li><strong>RAID 4 (parity):</strong> stripe data over <em>N</em> − 1 disks and store on the last disk the <strong>parity</strong> of each stripe, the XOR of its data blocks. Capacity is <em>N</em> − 1 disks.</li>
<li><strong>RAID 5 (rotated parity):</strong> like RAID 4, but the parity block moves to a different disk in each stripe, so no single disk handles every parity update.</li>
</ul>
<p>In the RAID 5 layout used in this course, with disks numbered 0 to <em>N</em> − 1, stripe <em>s</em> keeps its parity on disk (<em>N</em> − 1 − <em>s</em>) mod <em>N</em>, and its data blocks fill the other disks in order. With 4 disks:</p>
<table>
<tr><th></th><th>Disk 0</th><th>Disk 1</th><th>Disk 2</th><th>Disk 3</th></tr>
<tr><td>Stripe 0</td><td>D0</td><td>D1</td><td>D2</td><td>P</td></tr>
<tr><td>Stripe 1</td><td>D3</td><td>D4</td><td>P</td><td>D5</td></tr>
<tr><td>Stripe 2</td><td>D6</td><td>P</td><td>D7</td><td>D8</td></tr>
<tr><td>Stripe 3</td><td>P</td><td>D9</td><td>D10</td><td>D11</td></tr>
<tr><td>Stripe 4</td><td>D12</td><td>D13</td><td>D14</td><td>P</td></tr>
</table>
<p>Parity works because XOR (CS 210 Lesson 1) is its own inverse: if <em>P</em> = <em>D</em><sub>0</sub> ⊕ <em>D</em><sub>1</sub> ⊕ <em>D</em><sub>2</sub>, then XORing the survivors of any one loss gives back the missing block. For example, with one byte per block:</p>
<pre><code>d0, d1, d2 = 0b1100_1010, 0b0110_0110, 0b1111_0000
p = d0 ^ d1 ^ d2
print(bin(p))   # 0b1011100
print(d0 ^ d2 ^ p == d1)   # True</code></pre>
<p>Python's <code>0b</code> prefix writes a number in binary, and underscores in a number are only for readability. Writes are the price. To change one block in a RAID 5 array, the controller can't just write it: the parity must change too. Rather than reading the whole stripe, it reads the old data and the old parity and computes new parity = old parity ⊕ old data ⊕ new data, since XORing the old data in removes it and XORing the new data adds it. That's four I/Os (two reads, two writes) for one small write, the <em>small-write problem</em>. While a failed disk is being rebuilt, every read of its blocks needs all the others, and a second failure loses data; with today's large disks, rebuilds take many hours, so arrays often use RAID 6, which keeps two independent parity blocks per stripe and survives two failures.</p>

<h3>Virtual machines</h3>
<p>Lesson 1's process is a virtual processor and memory. A <strong>virtual machine</strong> goes further: a virtual copy of the whole hardware, on which a complete operating system (the <em>guest</em>) runs, unaware that it shares the machine. The software that does this is the <strong>hypervisor</strong> or virtual machine monitor. A <em>type 1</em> hypervisor runs directly on the hardware (VMware ESXi, Xen, Microsoft Hyper-V; Linux's KVM turns the Linux kernel itself into one); a <em>type 2</em> hypervisor runs as a program on an ordinary OS (VirtualBox, VMware Workstation). Cloud computing rests on this: one physical server runs dozens of customers' virtual machines.</p>
<p>The classic technique is <strong>trap-and-emulate</strong>. The guest kernel runs in user mode. Whenever it executes a privileged instruction, such as loading a page table or disabling interrupts, the hardware traps to the hypervisor (Lesson 1's exception), which performs the operation on the <em>virtual</em> machine's state and resumes the guest. Popek and Goldberg showed in 1974 that this works if every <em>sensitive</em> instruction (one that reads or changes the machine's privileged state) traps when run in user mode. The original x86 broke that rule: some sensitive instructions, such as <code>popf</code>, silently behaved differently in user mode instead of trapping. VMware's first product (1999) worked around this by rewriting the guest kernel's code on the fly (<em>binary translation</em>); Xen (2003) modified the guest OS to call the hypervisor directly (<em>paravirtualization</em>). In 2005–2006 Intel (VT-x) and AMD (AMD-V) added a hardware mode for guests, and later <em>nested page tables</em> (Intel's EPT, AMD's NPT), with which the hardware walks two levels of translation, guest virtual to guest physical to host physical, instead of the hypervisor maintaining "shadow" page tables in software.</p>

<h3>Containers</h3>
<p>A virtual machine runs a whole guest kernel, takes gigabytes of memory and seconds to boot. Often what's wanted is only isolation and packaging of an application. A <strong>container</strong> is a group of ordinary processes on the host's kernel that the kernel shows a restricted view of the system. On Linux, <strong>namespaces</strong> give the container its own process IDs (its first process is PID 1), its own file system tree, network interfaces, host name and user IDs, and <strong>control groups</strong> (cgroups) limit how much CPU time, memory and I/O it may use. Docker (2013) made containers popular by adding a format for packaging an application with all its files as an <em>image</em>. A container starts in milliseconds and has almost no overhead, because there is only one kernel. The cost is weaker isolation: every container shares the host kernel, so a kernel bug can let one container reach another, whereas escaping a virtual machine means getting past the hypervisor's much smaller interface. Cloud providers therefore often run each customer's containers inside lightweight virtual machines (Amazon's Firecracker is one), combining the two.</p>
<p>The same few ideas run through the whole course: a privileged layer that keeps control through hardware traps, a level of indirection (page tables, inodes, flash maps, nested page tables) that lets it move things without the layer above noticing, and careful ordering of operations so that concurrency and crashes can't corrupt the state.</p>
`,
      terms: [
        ["Device register", "A status, command or data location through which the processor controls a device."],
        ["Memory-mapped I/O", "Device registers appearing at physical addresses, reached with ordinary loads and stores."],
        ["Polling", "Repeatedly reading a device's status register to see whether it is ready."],
        ["DMA", "Direct memory access: a device or engine copies data to or from memory without the processor."],
        ["Device driver", "Kernel code that controls one kind of device and presents a standard interface to the rest of the kernel."],
        ["Seek time", "The time for a disk arm to move to the right track."],
        ["Rotational delay", "The time waiting for the wanted sector to rotate under the head; on average half a revolution."],
        ["Flash translation layer", "SSD firmware that maps logical blocks to flash pages, handling erasure, garbage collection and wear levelling."],
        ["Write amplification", "An SSD writing more to flash than the host asked, because of garbage collection."],
        ["RAID", "Combining several disks into one virtual disk for capacity, speed or redundancy."],
        ["Parity", "The XOR of a stripe's data blocks, from which any single lost block can be rebuilt."],
        ["Hypervisor", "Software that runs virtual machines, each with its own guest operating system."],
        ["Trap-and-emulate", "Running a guest kernel in user mode and emulating each privileged instruction when it traps."],
        ["Container", "Processes isolated by kernel namespaces and limited by cgroups, sharing the host's kernel."]
      ],
      quiz: [
        { q: "When is polling better than interrupts?", choices: ["Never", "When the device responds so quickly that an interrupt's overhead exceeds the wait", "For slow devices", "When there is only one process"], answer: 1, why: "Polling wastes time only while the device is busy; for very fast devices that's less than the interrupt costs." },
        { q: "What does DMA save?", choices: ["Disk space", "Processor time spent copying data between memory and the device", "Interrupts", "Memory"], answer: 1, why: "The DMA engine moves the data; the processor is free and is interrupted at the end." },
        { q: "A disk spins at 10,000 rpm. What is its average rotational delay?", choices: ["6 ms", "3 ms", "10 ms", "0.6 ms"], answer: 1, why: "One revolution is 60,000/10,000 = 6 ms; on average we wait half." },
        { q: "Why can't an SSD overwrite a flash page in place?", choices: ["It can", "Flash must be erased before rewriting, and only whole erase blocks can be erased", "Pages are read-only", "The OS forbids it"], answer: 1, why: "So the FTL writes elsewhere and remaps." },
        { q: "A RAID 5 array of 5 disks of 4 TB each holds how much data?", choices: ["20 TB", "16 TB", "10 TB", "4 TB"], answer: 1, why: "One disk's worth of space holds parity: (5 − 1) × 4 TB." },
        { q: "What do containers share that virtual machines don't?", choices: ["Nothing", "The host's kernel", "Hardware", "Memory"], answer: 1, why: "Containers are processes on one kernel; each VM runs its own guest kernel." }
      ],
      practice: [
        {
          q: `<p>A database does random 8 KB reads on a hard disk with 4 ms average seek, 7,200 rpm and 200 MB/s transfer, and on an SSD with 100 µs latency and 2,000 MB/s. How many reads per second does each manage, one at a time? How long does each take to read 1 GB sequentially?</p>`,
          a: `<p>HDD: 4 + 4.17 + 8/200 = 8.21 ms per read: about 122 reads/s. SSD: 0.1 + 8/2,000 = 0.104 ms: about 9,600 reads/s, about 79 times more. Sequentially, 1 GB = 1,000 MB takes 1,000/200 = 5 s on the disk and 1,000/2,000 = 0.5 s on the SSD: only 10 times faster. SSDs help most for random access.</p>`
        },
        {
          q: `<p>Four disks hold a RAID 4 stripe with data bytes 0x3C, 0xA5, 0x0F and a parity disk. Compute the parity. The disk holding 0xA5 fails: rebuild it. Then the first byte changes to 0x3D: compute the new parity from the old parity, old data and new data alone.</p>`,
          a: `<pre><code>p = 0x3C ^ 0xA5 ^ 0x0F
print(hex(p))   # 0x96
print(hex(0x3C ^ 0x0F ^ p))   # 0xa5
print(hex(p ^ 0x3C ^ 0x3D))   # 0x97</code></pre><p>0x3C ⊕ 0xA5 = 0x99 and 0x99 ⊕ 0x0F = 0x96. Rebuilding XORs the survivors with the parity. The new data differs from the old only in the lowest bit, so the parity's lowest bit flips: 0x97.</p>`
        },
        {
          q: `<p>An array of 4 disks, each doing 120 random I/Os per second, serves random small writes. Compare RAID 0, RAID 1 (two mirrored pairs, striped) and RAID 5 in writes per second.</p>`,
          a: `<p>RAID 0: each write is one I/O on one disk, so 4 × 120 = 480 writes/s. RAID 1: each write goes to both disks of a pair, so 480/2 = 240 writes/s. RAID 5: each small write costs 4 I/Os (read old data and parity, write both), spread over the disks, so 480/4 = 120 writes/s. That's the small-write problem: RAID 5's capacity is the best of the redundant levels, but its random writes are the slowest.</p>`
        },
        {
          q: `<p>A guest kernel running under trap-and-emulate executes an instruction to disable interrupts. Trace what happens. Why would the scheme break if that instruction silently did nothing in user mode instead of trapping?</p>`,
          a: `<p>The guest kernel is really in user mode, so the privileged instruction traps to the hypervisor. The hypervisor sees which guest trapped and which instruction it was, records "interrupts disabled" in that virtual machine's virtual processor state (it doesn't disable the real ones), and resumes the guest at the next instruction. It will then hold back virtual interrupts for that guest until the guest enables them again. If the instruction did nothing without trapping, the hypervisor would never learn of it: the guest would believe interrupts were off, while the hypervisor kept delivering them, and the guest's critical sections would break. That was x86's problem with instructions like <code>popf</code> before hardware virtualization support.</p>`
        }
      ],
      sources: ["ostep", "raid88", "popek74"]
    }
  ]
});

CSA.addAsides("cs310", {
  os1: [
    { kind: "history", title: "Unix and the fork", html: `<p>In 1969 Bell Labs withdrew from Multics, an ambitious time-sharing system it was building with MIT and General Electric. Two of its researchers, Ken Thompson and Dennis Ritchie, wanted to keep the comfortable interactive computing they had used, and Thompson wrote a small system for a spare PDP-7 minicomputer, in assembly. They called it Unix, a pun on Multics. In 1973 they rewrote it in C, the language Ritchie had designed for the purpose (CS 210 Lesson 3), which made Unix one of the first operating systems that could be moved to new hardware by recompiling. Their 1974 paper, "The UNIX Time-Sharing System", described ideas that are still everywhere: a tree of directories, files as plain sequences of bytes, devices that look like files, a shell that is an ordinary program, and processes created by <code>fork</code> and <code>exec</code>. Linux (1991), macOS and Android all descend from or imitate it.</p>`, sources: ["unix74"] }
  ],
  os4: [
    { kind: "practice", title: "Priority inversion on Mars", html: `<p>A few days after the Mars Pathfinder lander touched down in July 1997, its computer began resetting itself. Engineers at JPL reproduced the problem on a copy of the system on Earth. A low-priority task that collected weather data held a lock on a shared data bus; a high-priority bus-management task needed the lock and waited; and a medium-priority communications task, which needed no lock, kept preempting the low-priority one, so the lock was never released. The high-priority task missed its deadline, and a watchdog timer, concluding the system had hung, reset the computer. This is <strong>priority inversion</strong>: a high-priority thread waiting indefinitely on a low-priority one. The real-time operating system, VxWorks, offered a fix called <em>priority inheritance</em>, in which a thread holding a lock temporarily runs at the priority of the highest-priority thread waiting for it, but it had been switched off for that lock. The team turned it on by uploading a small change to the spacecraft, and the resets stopped. Locks interact with scheduling (Lesson 2) in ways that testing on the ground had not exposed.</p>`, sources: ["pathfinder"] }
  ],
  os5: [
    { kind: "history", title: "Dijkstra's semaphores", html: `<p>Edsger Dijkstra introduced semaphores in "Cooperating Sequential Processes", a long manuscript he wrote around 1965 at the Eindhoven University of Technology and circulated in his numbered series of notes, EWD 123. It also posed the problem of mutual exclusion carefully, presented an early correct solution for two processes (Dekker's algorithm, which Dijkstra credited to the mathematician Th. J. Dekker), and contained the banker's algorithm. The letters P and V come from Dutch words, though accounts differ on which: Dijkstra himself gave more than one explanation over the years, one being <em>prolaag</em>, a word he coined for "try to decrease", and <em>verhogen</em>, "increase". Semaphores structured THE, the multiprogramming system his group built and described in 1968, organized as layers each relying only on the ones below: an early example of designing an operating system so that its correctness could be argued. The dining philosophers began as one of his exam problems, about five computers competing for shared tape drives; the philosophers came from C. A. R. Hoare's retelling.</p>`, sources: ["dijkstra65"] }
  ],
  os7: [
    { kind: "practice", title: "When fsync lied", html: `<p>Databases are careful about crashes: PostgreSQL, for example, writes its changes through the page cache and calls <code>fsync</code> before it tells a client that a transaction is committed. In 2018 its developers found that the guarantee they relied on wasn't quite there. On Linux, when writing dirty pages back to the device failed (for instance because a disk returned an error), <code>fsync</code> reported the error once, but the kernel could mark the failed pages clean or drop them; a retried <code>fsync</code> then succeeded, although the data had never reached the disk. PostgreSQL's habit of retrying after a failed <code>fsync</code> could therefore silently lose committed data. The fix, after long discussion between database and kernel developers, was for PostgreSQL to treat a failed <code>fsync</code> as fatal: stop, and recover from its own write-ahead log on restart. The episode, nicknamed "fsyncgate", is a reminder that an interface's error behaviour is part of its contract, and that "it returned success" depends on what success was promised.</p>`, sources: ["fsyncgate"] }
  ]
});
