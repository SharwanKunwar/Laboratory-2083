# Operating System (OS) — Study Notes

## 1. What is an Operating System?

An **Operating System (OS)** is system software that manages computer hardware and provides an interface between the user/applications and hardware.

Examples:

- Microsoft Windows
- Linux
- Android
- macOS

### Simple Definition

> **OS = Manager of the computer**

The OS decides:

- Who gets CPU time?
- Who gets RAM?
- Where should files be stored?
- Which application can access what?
- How can multiple applications run simultaneously?

---

## 2. Why Do We Need an OS?

Imagine there is **no operating system**.

If you want to save a file, an application would have to communicate directly with the hardware.

It would need to understand:

- Disk sectors
- Memory addresses
- CPU instructions
- Device controllers
- Keyboard hardware
- Display hardware
- Storage protocols

This would be extremely complicated.

### Example

When you write:

```java
System.out.println("Hello");
```

you do not need to know:

- Which memory location contains the display buffer
- How the CPU communicates with the monitor
- Which hardware instructions should be sent

The OS and lower-level system software handle these details.

Therefore:

> **The OS hides hardware complexity from users and applications.**

---

## 3. OS as an Interface

The OS acts as a bridge between the user, applications, and hardware.

```text
USER
  |
  | clicks / types / runs program
  v
APPLICATION
  |
  | requests resources
  v
OPERATING SYSTEM
  |
  +-- CPU
  +-- RAM
  +-- Storage
  +-- Keyboard
  +-- Mouse
  +-- Network
```

For example, when a Java program needs a file:

```java
FileInputStream file = new FileInputStream("data.txt");
```

The application does not directly control the SSD. Instead, the request eventually goes through OS mechanisms.

This concept is called **abstraction**.

### Abstraction

The OS gives applications a simpler interface.

Instead of:

> "Control this physical disk sector."

You can simply say:

> "Open `data.txt`."

---

# 4. Process Management

A **process** is a program that is currently executing.

For example:

```text
Chrome.exe  -> Process
VSCode.exe  -> Process
Spotify.exe -> Process
```

The OS manages these processes.

One important job is **CPU scheduling**.

Imagine:

```text
CPU
 |
 +-- Chrome  -> 10 ms
 |
 +-- VS Code -> 10 ms
 |
 +-- Spotify -> 10 ms
 |
 +-- Chrome  -> 10 ms
 |
 +-- VS Code -> 10 ms
```

This happens extremely quickly.

To the user, it appears that everything is running simultaneously.

### Important Idea

> **CPU scheduling determines which process gets CPU time and when.**

Common CPU scheduling algorithms include:

- FCFS (First Come, First Served)
- SJF (Shortest Job First)
- Round Robin
- Priority Scheduling

---

# 5. Memory Management

Suppose your computer has:

```text
RAM = 8 GB
```

You open:

```text
Chrome
VS Code
Spotify
IntelliJ
```

All applications need memory.

The OS manages this memory.

```text
RAM
+----------------------+
| Operating System     |
+----------------------+
| Chrome               |
+----------------------+
| VS Code              |
+----------------------+
| Spotify              |
+----------------------+
| IntelliJ             |
+----------------------+
```

The OS:

- Allocates memory
- Deallocates memory
- Tracks memory usage
- Protects processes from inappropriate memory access
- Manages virtual memory

### Opening an Application

```text
Open App
   |
   v
OS receives request
   |
   v
Allocate RAM
   |
   v
Load program
   |
   v
Program executes
```

### Closing an Application

```text
Close App
   |
   v
OS
   |
   v
Release memory
```

Therefore:

> **Memory management = managing RAM efficiently and safely.**

---

# 6. Storage Management

RAM is temporary, while SSD/HDD storage is used for persistent data.

The OS manages storage using a **file system**.

Example:

```text
SSD
|
+-- Documents
|   +-- notes.txt
|   +-- assignment.pdf
|
+-- Pictures
|   +-- photo.jpg
|
+-- Projects
    +-- backend
    +-- frontend
```

The OS manages:

- Files
- Directories/folders
- File names
- File permissions
- Reading files
- Writing files
- Deleting files
- Storage allocation

For example:

```java
Files.writeString(path, "Hello");
```

The application requests that data be written, and the OS handles the actual interaction with the storage device.

---

# 7. Resource Management

This is the big picture.

A computer has limited resources:

```text
Resources
|
+-- CPU
+-- RAM
+-- Storage
+-- Network
+-- Input devices
+-- Output devices
```

The OS acts as the **resource manager**.

Think of the OS like a traffic police officer:

```text
          OS
          |
   +------+------+
   |      |      |
   v      v      v
  CPU    RAM    Disk
```

The OS decides:

> Which program can use which resource?

Therefore:

> **The OS is a resource manager.**

---

# 8. Security and Privacy

Imagine you have two applications:

```text
Process A
Process B
```

Process A should generally not be able to randomly access Process B's private memory.

Otherwise, one application could potentially:

- Read another application's data
- Modify its memory
- Steal information
- Crash another process

The OS provides mechanisms for:

- Authentication
- Authorization
- Permissions
- Process isolation
- Memory protection
- File access control

### Authentication vs Authorization

**Authentication:**

> "Who are you?"

**Authorization:**

> "What are you allowed to access?"

---

# 9. Throughput

### Definition

> **Throughput is the number of tasks completed successfully per unit of time.**

Suppose a system completes:

```text
100 jobs
in 10 seconds
```

Then:

```text
Throughput = 100 / 10
           = 10 jobs/second
```

Higher throughput generally means the system is processing more work in a given period.

### Real-Life Example

Imagine two restaurants:

```text
Restaurant A -> 10 customers/hour
Restaurant B -> 30 customers/hour
```

Restaurant B has higher throughput.

Similarly, a computer system that successfully completes more tasks per unit of time has higher throughput.

---

# 10. Five Major Functions of an OS

The major functions covered in this topic are:

1. **Process Management**
2. **Memory Management**
3. **Storage Management**
4. **Resource Management**
5. **Security and Privacy**

A simple structure:

```text
              OPERATING SYSTEM
                     |
       +-------------+-------------+
       |             |             |
       v             v             v
   Process        Memory        Storage
 Management     Management     Management
       |             |             |
       +-------------+-------------+
                     |
                     v
              Resource Management
                     |
                     v
              Security & Privacy
```

### Memory Trick

Remember:

> **P-M-S-R-S**

- **P** → Process Management
- **M** → Memory Management
- **S** → Storage Management
- **R** → Resource Management
- **S** → Security

---

# 11. Real-Life Example: Running a Spring Boot Application

Suppose you open IntelliJ IDEA and run your Spring Boot application.

### Step 1 — Process Management

The OS creates/manages processes for IntelliJ and your Java application.

```text
IntelliJ
   |
   v
Java process
```

### Step 2 — Memory Management

The OS allocates RAM.

```text
RAM
+-- OS
+-- IntelliJ
+-- Java / Spring Boot
```

### Step 3 — CPU Management

The CPU scheduler gives CPU time to:

```text
IntelliJ
Java
Chrome
Background processes
...
```

### Step 4 — Storage Management

Your application reads files such as:

```text
application.properties
pom.xml
.java files
```

from storage.

The OS handles the filesystem operations.

### Step 5 — Security

The OS isolates processes and controls access to files and resources.

So one simple action:

> **"Run my Spring Boot application"**

causes the OS to perform a huge amount of management behind the scenes.

---

# 12. The Most Important Concept

If you remember only one thing, remember this:

> **An Operating System is a resource manager and an interface between applications/users and computer hardware.**

Remember the main resources:

```text
              OS
               |
     +---------+---------+
     |         |         |
     v         v         v
    CPU       RAM       Disk
     |         |         |
 Process     Memory    Files
Management  Management Management
               |
               v
          Security
```

---

# 13. Exam-Friendly Definitions

## Operating System

**An operating system is system software that manages computer hardware resources and provides services and an interface for application programs and users.**

## Process Management

**Process management is the function of an OS that manages processes and allocates CPU time using scheduling techniques.**

## Memory Management

**Memory management is the function of an OS that allocates and deallocates RAM among processes efficiently and safely.**

## Storage Management

**Storage management is the function of an OS that manages files, directories, and data stored on secondary storage devices.**

## Resource Management

**Resource management is the process of allocating and controlling hardware resources such as CPU, memory, storage, and I/O devices.**

## Throughput

**Throughput is the number of tasks completed successfully by a system per unit of time.**

## Security

**OS security protects system resources and user data by controlling access and isolating processes.**

---

# 14. Quick Test

Try answering these without looking back:

1. What is an Operating System?
2. Why do we need an OS?
3. What does the OS do when Chrome, VS Code, and Spotify are running simultaneously?
4. What is CPU scheduling?
5. What is memory management?
6. What is storage management?
7. What is throughput?
8. If a system completes 500 tasks in 100 seconds, what is its throughput?
9. Why is security needed between processes?
10. Name the five major OS functions.

## Answer for Question 8

```text
Throughput = Number of completed tasks / Time

Throughput = 500 / 100
           = 5 tasks/second
```

---

# Final Summary

```text
                    OPERATING SYSTEM
                           |
          +----------------+----------------+
          |                |                |
          v                v                v
     PROCESS            MEMORY           STORAGE
    MANAGEMENT         MANAGEMENT        MANAGEMENT
          |                |                |
          +----------------+----------------+
                           |
                           v
                  RESOURCE MANAGEMENT
                           |
                           v
                   SECURITY & PRIVACY
```

### One-Line Summary

> **An OS manages hardware resources, provides an interface between applications and hardware, enables multitasking, manages memory and storage, and protects system resources and user data.**
