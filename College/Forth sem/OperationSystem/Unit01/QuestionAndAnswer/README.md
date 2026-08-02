# Unit 1: Introduction to Operating System — Possible Exam Questions

Based on the Unit 1 course schedule (History of OS, Objectives, Types of OS, Linux Basics).

---

## Section A: ⭐ Very Important Questions
*(High probability of appearing in exams — asked almost every semester)*

### Q1. What is an Operating System? Define it.
An **Operating System (OS)** is system software that acts as an intermediary between computer hardware and the user/application programs. It manages hardware resources (CPU, memory, I/O devices, storage) and provides a convenient, secure, and efficient environment in which users can execute their programs.

---

### Q2. Explain the objectives of an Operating System.
An OS serves two primary objectives, generally viewed from two perspectives:

**1. OS as a Resource Manager**
- Manages and allocates hardware resources (CPU, memory, I/O devices, files) among competing processes.
- Ensures fair, efficient, and conflict-free sharing of resources.
- Tracks resource usage and reclaims resources once a process finishes.

**2. OS as an Extended Machine (Virtual Machine)**
- Hides the complexity of the underlying hardware from users.
- Provides a simple, high-level interface (system calls, APIs) so users/programmers don't need to deal with hardware-level details (like disk sector addressing or interrupt handling).
- Makes the machine easier and more convenient to use.

**Other objectives:** Convenience, efficiency, ability to evolve (add new features without disrupting existing services), and providing protection/security among users.

---

### Q3. Explain the generations of Operating Systems.

| Generation | Period | Key Hardware | Key OS Features |
|---|---|---|---|
| **1st Generation** | 1940s–50s | Vacuum tubes | No OS; programs entered manually via plugboards/switches; no programming language |
| **2nd Generation** | 1950s–60s | Transistors | Batch processing systems; jobs submitted on punch cards, processed in batches; first primitive OS/monitor programs (e.g., FMS) |
| **3rd Generation** | 1960s–70s | Integrated Circuits (ICs) | Multiprogramming, time-sharing systems developed (e.g., CTSS, MULTICS, early UNIX); spooling introduced |
| **4th Generation** | 1970s–present | VLSI / Microprocessors | Personal computers, GUI-based OS (Windows, Mac OS), networked & distributed OS, modern multitasking systems |

---

### Q4. Explain the different types of Operating Systems.

1. **Batch Operating System**
   - Similar jobs are grouped together and executed as a batch without user interaction during execution.
   - No direct interaction between user and job; reduces idle CPU time between jobs.
   - *Example:* Payroll systems, early mainframe systems.

2. **Time-Sharing Operating System**
   - CPU time is divided into small time slices (quantum) shared among multiple users/processes, giving the illusion that each user has their own dedicated system.
   - Provides interactive, quick response.
   - *Example:* UNIX, multi-user systems.

3. **Real-Time Operating System (RTOS)**
   - Guarantees processing of data/events within a strict, defined time limit.
   - **Hard Real-Time:** Missing a deadline causes system failure (e.g., missile guidance, pacemakers).
   - **Soft Real-Time:** Missing a deadline degrades performance but is not catastrophic (e.g., video streaming, online reservation systems).

4. **Distributed Operating System**
   - Manages a group of independent, networked computers and makes them appear as a single coherent system to the user.
   - Enables resource sharing, load balancing, and fault tolerance across multiple machines.
   - *Example:* Distributed file systems, cluster computing.

5. **Embedded Operating System**
   - Designed to run on embedded devices (dedicated-purpose hardware) with limited resources (memory, processing power).
   - Usually small, efficient, and often real-time.
   - *Example:* OS in washing machines, routers, smart TVs, IoT devices.

---

### Q5. Differentiate between Batch OS and Time-Sharing OS.

| Basis | Batch OS | Time-Sharing OS |
|---|---|---|
| Interaction | No user interaction during execution | Interactive; user can interact with the running process |
| CPU Utilization | Can leave CPU idle between batch/job setup | CPU time is shared using time-slices — utilized efficiently |
| Response Time | Slow (jobs processed in batches) | Fast (near real-time interaction) |
| Example | Payroll processing | UNIX/Linux multi-user systems |

---

### Q6. Differentiate between Hard Real-Time and Soft Real-Time Systems.

| Basis | Hard Real-Time | Soft Real-Time |
|---|---|---|
| Deadline | Must be met strictly; missing it = system failure | Deadline is desirable but can occasionally be missed |
| Consequence of missing deadline | Catastrophic (loss of life/damage) | Degraded quality of service, not catastrophic |
| Example | Airbag deployment system, pacemaker | Video conferencing, online booking system |

---

### Q7. List and explain basic Linux terminal commands.

| Command | Purpose |
|---|---|
| `ls` | Lists files and directories in the current directory |
| `pwd` | Prints the present working directory (full path) |
| `cd` | Changes the current directory (`cd <dirname>`, `cd ..` to go up) |
| `mkdir` | Creates a new directory (`mkdir <dirname>`) |
| `rm` | Removes/deletes a file (`rm <filename>`); use `rm -r <dirname>` to delete a directory |

---
---

## Section B: 📘 Important & Informative Questions
*(Supplementary — good conceptual depth, occasionally asked or useful for viva/practical)*

### Q8. Why do we need an Operating System? (Rationale/Purpose)
Without an OS, every application would need to directly manage hardware (CPU scheduling, memory addressing, device drivers), which is complex, error-prone, and would prevent multiple programs from running safely together. The OS abstracts this complexity, enforces protection between processes/users, and enables efficient multiprogramming.

---

### Q9. Explain the evolution from 1st to 4th generation OS with hardware context.
- **1st Gen (Vacuum Tubes):** Enormous, unreliable machines; programming done in machine language directly; no OS existed — the "operator" was the OS.
- **2nd Gen (Transistors):** Smaller, more reliable machines enabled batch processing; separation of job submission and execution using punch cards; introduction of assembly/early high-level languages (FORTRAN).
- **3rd Gen (ICs):** Enabled multiprogramming — multiple jobs held in memory simultaneously, CPU switched among them; time-sharing systems (CTSS, MULTICS) emerged, laying groundwork for UNIX.
- **4th Gen (VLSI/Microprocessors):** Birth of personal computers; GUI-driven OS (Windows, macOS); modern OS support networking, distributed computing, virtualization, and mobile/embedded platforms.

---

### Q10. Differentiate between Distributed OS and Embedded OS.

| Basis | Distributed OS | Embedded OS |
|---|---|---|
| Purpose | Manages multiple networked computers as one system | Runs on a single dedicated-purpose device |
| Resource | Utilizes resources across multiple machines | Very limited, fixed hardware resources |
| Example | Cluster/grid computing systems | Smart TVs, routers, microwave ovens |
| Goal | Resource sharing, scalability, fault tolerance | Efficiency, reliability, small footprint |

---

### Q11. What are the advantages and disadvantages of Batch Processing Systems?
**Advantages:**
- Reduces idle CPU time between jobs.
- Suitable for large, repetitive jobs (e.g., payroll, billing).

**Disadvantages:**
- No interaction with the job during execution (poor for debugging).
- Turnaround time can be long since jobs must wait for the whole batch.

---

### Q12. Explain OS as a "Resource Manager" and "Extended Machine" with examples.
- **Resource Manager example:** When two applications need to print simultaneously, the OS's spooler manages the printer queue so both jobs are printed correctly without conflict — this is resource management in action.
- **Extended Machine example:** A programmer writes `fopen("file.txt")` in C without worrying about disk sector addresses, track/cylinder positioning, or the file system's internal structure — the OS provides this abstraction, "extending" the raw hardware into something simple to use.

---

### Q13. Write short notes on: Multiprogramming and Multitasking (concept introduced through OS types).
- **Multiprogramming:** Multiple programs reside in memory at once; when one process waits for I/O, the CPU switches to another, improving CPU utilization (non-interactive, background-oriented).
- **Multitasking:** An extension of multiprogramming with fast context-switching to give the illusion that multiple tasks run simultaneously, allowing interactive use by one or more users.

---

### Q14. Explain a few more useful Linux commands beyond the basics (practical/viva-oriented).

| Command | Purpose |
|---|---|
| `cp <src> <dest>` | Copies a file from source to destination |
| `mv <src> <dest>` | Moves or renames a file |
| `cat <filename>` | Displays the content of a file |
| `man <command>` | Shows the manual/help page for a command |
| `touch <filename>` | Creates an empty file |
| `whoami` | Displays the current logged-in user |

---
---

## Section C: ➕ Extra Questions
*(Additional questions that may appear as sub-parts or variations)*

### Q15. What are the different views/perspectives from which an OS can be studied?
- **Top-down (Service) view:** OS seen as a provider of services to users — process management, memory management, file management, I/O management, security.
- **Bottom-up (Resource Manager) view:** OS seen as a manager of hardware resources, deciding which process gets the CPU, memory, or device and for how long.

### Q16. What is meant by "System Calls"? How do they relate to the extended machine concept?
A **system call** is the programming interface through which a user program requests a service from the OS kernel (e.g., reading a file, creating a process). It is the practical mechanism by which the OS provides its "extended machine" abstraction — the programmer calls a simple, high-level function instead of directly manipulating hardware.

### Q17. Compare Multiprogramming Operating System with Time-Sharing Operating System.

| Basis | Multiprogramming OS | Time-Sharing OS |
|---|---|---|
| Goal | Maximize CPU utilization | Minimize response time for users |
| User interaction | Little to none | High (interactive) |
| CPU switching | When a process needs I/O | Fixed time-slice (quantum) based |
| Example | Early batch systems with multiple jobs in memory | UNIX/Linux multi-user login systems |

### Q18. What are the key features/characteristics common to all types of Operating Systems?
- Process management
- Memory management
- File system management
- I/O/device management
- Security and protection
- User interface (CLI/GUI)

### Q19. Give one real-world example of each type of OS discussed in class.

| Type of OS | Real-world Example |
|---|---|
| Batch | Old bank cheque-clearing systems |
| Time-Sharing | Linux/UNIX multi-user servers |
| Real-Time | Air traffic control systems, pacemakers |
| Distributed | Google's search infrastructure, Hadoop clusters |
| Embedded | Smart TVs, ATMs, washing machines |

---
---

## Section D: ✏️ Short Questions
*(One-line / brief-answer type — often asked as "define" or "what is" for 2 marks)*

1. **What is an Operating System?**
   System software that manages hardware resources and acts as an interface between users and the computer.

2. **What is Batch OS?**
   An OS where similar jobs are grouped and executed together without user interaction during execution.

3. **What is Time-Sharing OS?**
   An OS that allows multiple users to share CPU time in small slices, giving an illusion of simultaneous access.

4. **What is a Real-Time OS?**
   An OS that processes inputs and provides outputs within a strict, guaranteed time limit.

5. **What is Distributed OS?**
   An OS that manages a collection of independent networked computers as a single system.

6. **What is Embedded OS?**
   A compact OS designed to run on dedicated-purpose devices with limited resources.

7. **What does `pwd` do in Linux?**
   Prints the current/present working directory.

8. **What does `mkdir` do?**
   Creates a new directory.

9. **What is a system call?**
   An interface that lets a user program request a service from the OS kernel.

10. **Name the four generations of computers/OS.**
    Vacuum tubes → Transistors → Integrated Circuits → VLSI/Microprocessors.

11. **What is spooling?**
    A technique where data is temporarily held in a buffer/queue (e.g., for a printer) to be processed later, allowing overlap between I/O and CPU work.

12. **What is the difference between hard and soft real-time systems (in one line)?**
    Hard real-time systems fail if a deadline is missed; soft real-time systems only degrade in performance.

---
---

## Section E: 🔘 MCQs

**1. Which of the following best defines an Operating System?**
a) A hardware component
b) A system software that manages hardware and provides services to users
c) An application software for word processing
d) A type of compiler

**Answer: b**

---

**2. In which generation of computers did batch processing systems first appear?**
a) 1st Generation
b) 2nd Generation
c) 3rd Generation
d) 4th Generation

**Answer: b**

---

**3. Multiprogramming and time-sharing systems were primarily developed in which generation?**
a) 1st Generation (Vacuum Tubes)
b) 2nd Generation (Transistors)
c) 3rd Generation (Integrated Circuits)
d) 4th Generation (VLSI)

**Answer: c**

---

**4. Which OS concept hides hardware complexity and provides a simple interface to users?**
a) Resource Manager
b) Extended Machine
c) Batch Processing
d) Real-Time Scheduling

**Answer: b**

---

**5. Which type of OS guarantees that a missed deadline leads to system failure?**
a) Soft Real-Time OS
b) Time-Sharing OS
c) Hard Real-Time OS
d) Batch OS

**Answer: c**

---

**6. Which of the following is an example of a Distributed Operating System use case?**
a) A microwave oven controller
b) A cluster computing / grid system
c) A single-user desktop OS
d) A punch-card batch job

**Answer: b**

---

**7. Which Linux command is used to list files and directories?**
a) `cd`
b) `pwd`
c) `ls`
d) `rm`

**Answer: c**

---

**8. Which command is used to remove/delete a file in Linux?**
a) `mkdir`
b) `rm`
c) `cd`
d) `pwd`

**Answer: b**

---

**9. An OS that is designed to run on devices like smart TVs and routers is called:**
a) Distributed OS
b) Embedded OS
c) Time-Sharing OS
d) Batch OS

**Answer: b**

---

**10. Which of the following is NOT one of the four necessary generations discussed for OS evolution?**
a) Vacuum Tubes
b) Transistors
c) Cloud Computing
d) VLSI/Microprocessors

**Answer: c**

---

**11. The technique of temporarily holding data (e.g., for printing) in a queue/buffer is called:**
a) Paging
b) Spooling
c) Segmentation
d) Caching

**Answer: b**

---

**12. Which of the following commands creates a new directory in Linux?**
a) `touch`
b) `mkdir`
c) `cat`
d) `man`

**Answer: b**

---