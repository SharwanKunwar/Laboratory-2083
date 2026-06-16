# Operating Systems: Generations & Objectives

## 1. Generation of Operating Systems

### Third Generation (mid-1960s – mid-1970s)

- **Technology**: Integrated Circuits (ICs) replaced individual transistors, making computers smaller, faster, cheaper, and more reliable.
- **Multiprogramming**: Multiple programs are kept in main memory at once. The CPU switches between them whenever one is waiting (e.g., for I/O), so it is rarely idle. This improved CPU utilization significantly over earlier batch systems.
- **Multiprocessing**: Systems began using more than one CPU working together to execute instructions, increasing throughput.
- **Time-Sharing Systems**: Many users could interact with the same computer "simultaneously" by each receiving a very short slice of CPU time in rotation. This made computing feel interactive rather than purely batch-oriented. Examples: CTSS (Compatible Time-Sharing System), MULTICS.
- **Spooling** (Simultaneous Peripheral Operations On-Line): Data for slow I/O devices (like printers) was buffered on disk, decoupling I/O speed from CPU speed and allowing overlap between computation and I/O.
- **Key example**: IBM's **OS/360** — one of the first operating systems designed to run across an entire family of computers and to support both batch and time-sharing workloads.
- **Notable event**: **UNIX** was created in 1969 at Bell Labs, laying the foundation for many modern operating systems.

### Fourth Generation (mid-1970s – Present)

- **Technology**: VLSI (Very Large Scale Integration) packed enormous numbers of transistors onto a single chip, giving rise to the **microprocessor** and, with it, the **personal computer (PC)**.
- **Personal Computer OS**: Operating systems were now designed for individual users rather than large shared mainframes. Examples: MS-DOS, early Windows.
- **GUI (Graphical User Interface)**: Visual, mouse-driven interfaces replaced command-line-only interaction, making computers accessible to non-technical users.
- **Network Operating Systems**: Allowed computers to communicate, share files, and share resources (like printers) over a network while each machine retained its own identity.
- **Distributed Operating Systems**: Resources are spread across multiple physical machines but presented to the user as a single coherent system.
- **Examples**: Windows, Linux, macOS, Android, iOS.

| Generation | Core Technology | Key OS Features | Examples |
|---|---|---|---|
| 3rd | Integrated Circuits (ICs) | Multiprogramming, Multiprocessing, Time-sharing, Spooling | OS/360, early UNIX |
| 4th | VLSI / Microprocessors | GUI, PC-based OS, Network & Distributed OS | MS-DOS, Windows, Linux, macOS |

---

## 2. Objectives of an Operating System

An OS can be understood from two complementary perspectives: what it does for the *hardware* and what it does for the *user*.

### Resource Manager (Bottom-Up View)

A computer has limited hardware resources — CPU, main memory, I/O devices, storage — that must be shared among multiple programs, processes, and users. The OS's role as a resource manager is to:

- Allocate CPU time fairly and efficiently among processes (**scheduling**)
- Manage memory allocation and protection between programs
- Control access to I/O devices and prevent conflicts
- Coordinate and protect shared resources like files and storage
- Maximize overall system **throughput**, **utilization**, and **fairness**

In this view, the OS acts like a traffic controller, deciding who gets which resource and for how long.

### Extended Machine / Virtual Machine (Top-Down View)

Raw computer hardware is complex and inconvenient to program directly — it requires dealing with device registers, interrupts, and machine-level instructions. The OS's role as an extended (or virtual) machine is to:

- Hide the complexity of the underlying hardware
- Provide a simpler, more abstract interface (system calls, file systems, APIs)
- Present users and programmers with a "friendlier" machine than the physical one actually is

In this view, the OS is a layer of software that turns difficult-to-use hardware into a convenient, pleasant-to-use machine.

> **In short**: the *Resource Manager* view focuses on efficient hardware allocation, while the *Extended Machine* view focuses on user convenience and abstraction. A well-designed OS balances both.