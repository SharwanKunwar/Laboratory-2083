# Microprocessor — Exam Q&A (5 Marks Each)

Source: `SharwanKunwar/Second-Semester/Microprocessor`

---

## Section A: Important Questions

### Q1. What do you mean by addressing mode? Discuss Immediate, Direct, and Indirect Addressing mode with example.

Addressing mode refers to the way an instruction in assembly language specifies the location of the operand (data). In simpler terms, it tells the CPU where to find the data needed to perform operations like addition or subtraction. Addressing modes are crucial to computer architecture because they provide flexibility and efficiency in data handling.

- **Immediate Addressing Mode**: The operand is directly specified within the instruction itself.
  Example: `MOV A, #5` → loads the value 5 directly into register A.

- **Direct Addressing Mode**: The instruction provides the memory location where the operand is stored.
  Example: `MOV A, 3000H` → loads the contents of memory location 3000H into A.

- **Indirect Addressing Mode**: The instruction refers to a register or memory address that itself holds the address of the operand.
  Example: `MOV A, @R0` → R0 holds the address of the actual data, which is then loaded into A.

---

### Q2. Discuss all the registers used in 8085 microprocessor.

The 8085 microprocessor contains several registers, each serving a specific role in processing and memory access:

| Register | Size | Function |
|---|---|---|
| Accumulator (A) | 8-bit | Stores data and results of arithmetic/logic operations |
| General Purpose (B, C, D, E, H, L) | 8-bit each | Data storage; paired as BC, DE, HL for 16-bit operations |
| Program Counter (PC) | 16-bit | Holds address of the next instruction to execute |
| Stack Pointer (SP) | 16-bit | Points to the current top of the stack in memory |
| Flag Register | 8-bit | Shows status of ALU operations via 5 condition flags (S, Z, AC, P, CY) |
| Temporary Register | Internal | Used by ALU during operations; not user-accessible |
| Instruction Register | Internal | Holds the current instruction's opcode for decoding |
| Memory Buffer Register (MBR) | Internal | Temporarily stores data read from/written to memory |
| Address Buffer Register | Internal | Temporarily stores the address sent to/from memory |

These registers together allow the 8085 to fetch, decode, execute, and store data efficiently.

---

### Q3. Discuss the architecture of a basic computer along with its components.

The basic computer architecture is a simplified model used in digital logic and computer organization to demonstrate how a computer functions at a fundamental level. It consists of three main units:

**1. Central Processing Unit (CPU)**
The core component responsible for executing instructions and processing data. It consists of the Arithmetic Logic Unit (ALU), Control Unit (CU), and Registers, and performs calculations, logic decisions, and instruction control.
*Example*: While playing a game, the CPU calculates player movement, updates graphics, and controls game logic in real time.

**2. Memory Unit**
Stores all the data and instructions the CPU needs during execution, divided into primary memory (RAM and ROM). It holds the currently executing programs and temporary data.
*Example*: While editing a photo, the image and editing tools are loaded into RAM for fast access before saving to the hard drive.

**3. Input/Output (I/O) Unit**
Manages data exchange between the computer and external devices. Input devices send data to the system while output devices display results, with I/O interfaces ensuring smooth communication with the CPU.
*Example*: Typing on a keyboard (input) displays text on the monitor (output), handled by the I/O system.

---

### Q4. Differentiate between Hardware Control Unit and Microprogrammed Control Unit.

A **Hardware (hardwired) Control Unit** is implemented using combinational logic circuits like gates and flip-flops to directly generate control signals for executing instructions. It operates fast but is difficult to modify once built.
*Example*: Used in RISC processors such as ARM architecture, where speed is critical and instruction sets are simple.

A **Microprogrammed Control Unit** uses a sequence of microinstructions stored in control memory to generate control signals. It is slower but easier to modify and more flexible.
*Example*: Used in CISC processors such as Intel 8086, where complex instructions are broken into smaller micro-operations.

| Basis | Hardwired CU | Microprogrammed CU |
|---|---|---|
| Implementation | Combinational logic circuits | Microinstructions stored in control memory |
| Speed | Fast | Slower |
| Flexibility | Difficult to modify | Easy to modify |
| Used in | RISC (e.g., ARM) | CISC (e.g., Intel 8086) |

---

## Section B: Model Question Set 01

### Q1. What is instruction mapping? Explain how to convert an instruction code to a microinstruction address.

Instruction mapping is the process of converting an instruction's opcode into the starting address of its microprogram in control memory.

**Steps to convert an instruction code to a microinstruction address:**

1. **Fetch the instruction** – The CPU fetches the machine instruction from memory and stores it in the Instruction Register (IR).
2. **Extract the opcode** – Only the opcode bits are needed for mapping; operands are ignored.
3. **Use mapping logic** – A mapping ROM or hardwired decoder takes the opcode and generates the starting address of the microprogram in control memory.
4. **Access control memory** – The control memory uses this starting address to fetch the first microinstruction.
5. **Execute microinstructions** – The microprogram sequencer generates subsequent microinstruction addresses sequentially (or via branching) until execution completes.

---

### Q2. Define stack and explain the stack organization.

A **stack** is a special memory structure that stores data in Last-In-First-Out (LIFO) order, meaning the last item pushed (stored) is the first item popped (retrieved). It is widely used to store return addresses, temporary data, and CPU registers during subroutine calls and interrupts.

**Stack Organization:**

- **Stack Pointer (SP)**: A special-purpose register that always points to the top of the stack. It updates automatically during push (decrements in 8085) and pop (increments in 8085) operations.
- **Memory Area for Stack**: The stack resides in a reserved portion of memory; in 8085 it grows downward (from higher to lower addresses).
- **Push Operation**: Stores data onto the stack — SP is decremented, and data is placed at the new top.
- **Pop Operation**: Retrieves data from the stack — data at the top is read, and SP is incremented.

*Example*: If SP = 3000H and the accumulator value is pushed, SP → 2FFFH and the value is stored at 2FFFH. On a pop, the value at 2FFFH is retrieved and SP returns to 3000H.

---

### Q3. Explain the arithmetic pipeline with example.

An arithmetic pipeline is a technique used in CPUs to improve the execution speed of arithmetic operations by dividing them into smaller stages. Each stage performs part of the operation, and different instructions can be processed simultaneously at different stages — similar to an assembly line in a factory.

**Example: 4-Stage Addition Pipeline**

- Stage 1: Fetch operands from registers
- Stage 2: Align operands (as in multi-digit addition)
- Stage 3: Perform addition of digits
- Stage 4: Store the result back to register

| Clock Cycle | Stage 1 | Stage 2 | Stage 3 | Stage 4 |
|---|---|---|---|---|
| 1 | Instr 1 | | | |
| 2 | Instr 2 | Instr 1 | | |
| 3 | Instr 3 | Instr 2 | Instr 1 | |
| 4 | Instr 4 | Instr 3 | Instr 2 | Instr 1 |
| 5 | … | … | … | … |

By overlapping stages across instructions, the pipeline completes one instruction per cycle (after the initial fill), greatly improving throughput compared to executing each instruction fully before starting the next.

---

### Q4. Explain the following instructions: a) LDA 7050H, b) CPI 35H, c) PUSH B

**a) LDA 7050H** — Load Accumulator Direct
- Addressing Mode: Direct
- Operation: A ← Memory[7050H]
- Explanation: Loads the contents of memory location 7050H into the accumulator.
- Example: If Memory[7050H] = 3CH, after execution A = 3CH.

**b) CPI 35H** — Compare Immediate with Accumulator
- Addressing Mode: Immediate
- Operation: Subtracts 35H from A internally (without storing the result) and updates flags.
- Effect on Flags: Zero (Z) set if A = 35H; Carry (CY) set if A < 35H; Sign (S) and Parity (P) updated per result.
- Example: If A = 30H, then CY = 1, Z = 0.

**c) PUSH B** — Push Register Pair B & C onto Stack
- Addressing Mode: Implicit (stack operation)
- Operation: Stack[SP−1] ← B, Stack[SP−2] ← C, SP ← SP−2
- Explanation: Saves the contents of register pair B & C onto the stack, useful during subroutine calls.
- Example: If B = 12H and C = 34H, these are stored at the top of the stack and SP decreases by 2.

| Instruction | Meaning | Addressing Mode | Operation/Effect |
|---|---|---|---|
| LDA 7050H | Load accumulator from memory | Direct | A ← Memory[7050H] |
| CPI 35H | Compare immediate with A | Immediate | A − 35H, flags updated, A unchanged |
| PUSH B | Push register pair B & C | Implicit | B & C stored on stack, SP decremented by 2 |

---

### Q5. What are the typical characteristics of CISC instruction set architecture? Explain.

CISC (Complex Instruction Set Computer) is a type of CPU architecture that provides a large set of complex instructions, each capable of executing multiple low-level operations (memory access, arithmetic, or control) in a single instruction.

**Typical Characteristics of CISC:**

1. **Large number of instructions** – Hundreds of instructions are available to handle a wide variety of tasks directly.
2. **Complex instructions** – A single instruction can perform multiple operations, such as a memory load combined with an arithmetic operation.
3. **Variable instruction length** – Instructions vary in size depending on the operation and addressing mode used.
4. **Multiple addressing modes** – Supports several ways (immediate, direct, indirect, indexed, etc.) of specifying operands.
5. **Memory-to-memory operations** – Operations can directly act on data in memory rather than requiring it to be loaded into registers first.
6. **Fewer registers** – Relies more on memory access than on a large register set.
7. **Microprogrammed control** – Control unit is typically implemented using microprograms to handle the complexity of instructions.
8. **Emphasis on reducing instruction count** – Programs use fewer instructions overall since each instruction does more work, even though each takes longer to execute.

*Example*: `ADD AX, [1000H]` fetches a value from memory and adds it to register AX, all in one instruction (as used in Intel x86 processors).

---

### Q6. For the expression Y = (A+B)*(C+D), write the code for one-address, two-address, and three-address instruction formats.

**Three-Address Format** (two source operands + one destination, `OP DEST, SRC1, SRC2`):
```
ADD R1, A, B    ; R1 = A + B
ADD R2, C, D    ; R2 = C + D
MUL Y, R1, R2   ; Y = R1 * R2
```

**Two-Address Format** (one operand also acts as destination, `OP DEST, SRC`):
```
MOV R1, A       ; R1 = A
ADD R1, B       ; R1 = R1 + B
MOV R2, C       ; R2 = C
ADD R2, D       ; R2 = R2 + D
MUL R1, R2      ; R1 = R1 * R2
MOV Y, R1       ; Y = R1
```

**One-Address Format** (single explicit operand, Accumulator AC is implicit, `OP operand`):
```
LDA A           ; AC = A
ADD B           ; AC = AC + B  → AC = A + B
STA TEMP1       ; TEMP1 = AC
LDA C           ; AC = C
ADD D           ; AC = AC + D  → AC = C + D
MUL TEMP1       ; AC = AC * TEMP1
STA Y           ; Y = AC
```

As the address field reduces (three → two → one), more instructions are needed since each instruction carries less explicit information, relying more on implicit registers like the accumulator.

---

## Section C: Model Question Set 02

### Q1. What is parallel processing? Write benefits and explain Flynn's classification.

Parallel processing is the technique of performing multiple tasks simultaneously by dividing a problem into smaller parts and executing them at the same time using multiple processors or cores.

**Benefits of Parallel Processing:**
- **Faster execution** – Tasks divided among multiple processors reduce overall processing time.
- **Handles large data** – Efficiently processes massive datasets that would be slow in serial processing.
- **Better resource utilization** – Uses multiple CPUs/cores simultaneously, preventing idle hardware.
- **Improved system performance** – Enhances speed and responsiveness for complex applications.
- **Scalability** – Systems can be expanded by adding more processors to meet higher demands.

**Flynn's Taxonomy (M.J. Flynn, 1966)** classifies computer architectures based on the number of instruction streams and data streams processed simultaneously:

| Type | Meaning | Description |
|---|---|---|
| SISD | Single Instruction, Single Data | Traditional sequential system; one instruction operates on one data item at a time |
| SIMD | Single Instruction, Multiple Data | The same instruction operates on multiple data items in parallel (e.g., vector processors) |
| MISD | Multiple Instruction, Single Data | Multiple instructions operate on the same data stream; rare in practice |
| MIMD | Multiple Instruction, Multiple Data | Multiple processors execute different instructions on different data; used in modern multi-core/multiprocessor systems |

---

### Q2. What is the use of flags? Explain different flags of 8085 with an example.

In the 8085 microprocessor, a **flag** is a type of flip-flop that indicates the status of the result after an arithmetic or logical operation. Flags are stored in the flag register (status register) and are automatically set (1) or reset (0) by the processor based on the operation's result. They help in decision-making such as branching, conditional jumps, and loops.

**The 5 Flags of 8085:**

- **Sign Flag (S)**: Indicates the sign of the result (2's complement form). S = 1 → negative; S = 0 → positive.
- **Zero Flag (Z)**: Shows whether the result is zero. Z = 1 → result is zero; Z = 0 → non-zero.
- **Auxiliary Carry Flag (AC)**: Used in BCD arithmetic; set when there is a carry from the lower nibble (D3) to the upper nibble (D4).
- **Parity Flag (P)**: Checks even/odd parity of the result. P = 1 → even parity; P = 0 → odd parity.
- **Carry Flag (CY)**: Indicates carry (addition) or borrow (subtraction). CY = 1 → carry/borrow generated; CY = 0 → none.

*Example*:
```
MVI A, 8EH   ; Load A with 8E (10001110)
ADI 92H      ; Add 92H to A
```
This addition produces a carry out of the most significant bit, setting CY = 1, along with corresponding updates to S, Z, AC, and P based on the result.

---

### Q3. What is a microprogram sequencer? Differentiate hardwired vs microprogrammed control unit.

A **microprogram sequencer** is a control unit component in a CPU that generates the address of the next microinstruction to be executed from control memory (ROM or control store). It functions like a "program counter" for microinstructions, ensuring they execute in the correct sequence and handling branching (conditional or unconditional jumps) within microprograms.

**Hardwired vs Microprogrammed Control Unit:**

| Basis | Hardwired Control Unit | Microprogrammed Control Unit |
|---|---|---|
| Generation of control signals | Fixed combinational logic circuits (gates, flip-flops, decoders) | Sequence of microinstructions stored in control memory |
| Speed | Fast | Slower |
| Flexibility | Rigid; hard to modify | Flexible; easy to modify |
| Complexity supported | Simple instruction sets | Complex instruction sets |
| Typical use | RISC processors | CISC processors |

In short: hardwired control is **fast but rigid**, while microprogrammed control is **slower but flexible**.

---

## Section D: Unit 01

### Q1. What is a microprocessor? What is a microcontroller?

A **microprocessor** is the controlling unit of a microcomputer, packaged inside a small chip, that functions as the central processing unit of a computer. It contains only the processing unit (arithmetic and logic unit, control unit, and registers) but lacks built-in memory, I/O ports, or peripherals — it requires external components to function.

A **microcontroller** is a compact integrated circuit that contains a processor, memory, and input/output ports all on a single chip, designed to perform a specific control task in devices like washing machines, microwave ovens, and robots.

| Basis | Microprocessor | Microcontroller |
|---|---|---|
| Components | CPU only (ALU, CU, registers) | CPU + memory + I/O ports on one chip |
| External components | Required (memory, I/O) | Not required; self-contained |
| Usage | General-purpose computing (PCs) | Dedicated/embedded control tasks |
| Cost & power | Higher cost, more power | Lower cost, low power |
| Example | Intel 8085, 8086 | 8051, PIC, ARM Cortex-M |

---

**Total questions answered: 14**