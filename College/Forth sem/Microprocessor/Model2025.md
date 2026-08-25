# CACS 155 – Microprocessor & Computer Architecture
### Tribhuvan University | BCA Semester II | 2025 | Full Marks: 60 | Time: 3 hrs

> **Instructions:** Attempt any **SIX** from Group B (5 marks each) and any **TWO** from Group C (10 marks each). All questions solved below for complete revision.

---

## Group B — Attempt any SIX (6×5 = 30)

### Q1. Explain types of instructions based on length in the 8085 microprocessor. [5]

> *"Explain types of instruction based on the length in 8085 microprocessor."*

Based on the number of bytes an instruction occupies in memory, 8085 instructions are classified into **three types**:

| Type | Bytes | Description | Example |
|---|---|---|---|
| **One-byte instruction** | 1 | Opcode and operand (register) are combined in a single byte. Fastest to fetch/execute. | `MOV A, B`, `ADD B`, `XRA A`, `HLT` |
| **Two-byte instruction** | 2 | First byte is the opcode, second byte is an 8-bit data/operand. | `MVI A, 32H`, `ADI 05H`, `OUT 01H` |
| **Three-byte instruction** | 3 | First byte is the opcode, next two bytes form a 16-bit address/data (stored in low-byte, high-byte order). | `LXI H, 2050H`, `JMP 2000H`, `STA 3000H` |

The classification directly affects **fetch cycle length** — a 3-byte instruction requires 3 memory read (opcode fetch) cycles before execution, making it slower than a 1-byte instruction.

---

### Q2. What are the different status flags used in the 8086 microprocessor? Explain. [5]

> *"What are the different status flags that are used in 8086 microprocessor? Explain."*

The 8086 Flag register has **6 status (conditional) flags**, each a single bit set/reset after an ALU operation:

| Flag | Symbol | Set When |
|---|---|---|
| **Carry Flag** | CF | An arithmetic operation generates a carry out of / borrow into the MSB |
| **Parity Flag** | PF | The result has an even number of 1-bits (in the lower byte) |
| **Auxiliary Carry** | AF | A carry/borrow occurs between bit 3 and bit 4 (used in BCD arithmetic) |
| **Zero Flag** | ZF | The result of an operation is zero |
| **Sign Flag** | SF | The MSB of the result is 1 (result is negative) |
| **Overflow Flag** | OF | Signed arithmetic result exceeds the representable range |

These flags are tested by conditional jump instructions (e.g., `JC`, `JZ`, `JS`, `JO`) to control program flow.

---

### Q3. Assembly program — find the greater 8-bit number and XOR with 43H [5]

> *"Write a program in assembly language to find the greater number from the 8-bit numbers stored in memory locations 4001H and 4002H, and store the result in the memory location 4015H after the XOR operation with 43H."*

```asm
        LDA  4001H      ; Load number from 4001H into A
        MOV  B, A       ; Save it in register B
        LDA  4002H      ; Load number from 4002H into A
        CMP  B          ; Compare A (4002H) with B (4001H)
        JNC  GREATER    ; If CY = 0, A >= B → A already holds greater number
        MOV  A, B       ; Else B is greater → move B into A
GREATER:
        XRI  43H        ; XOR the greater number with 43H
        STA  4015H      ; Store final result at 4015H
        HLT             ; Stop
```

**Logic:** `CMP` sets carry only if A < B. If carry is not set, A is already the greater (or equal) value; otherwise B is moved into A. The greater value is then XORed with `43H` and stored.

---

### Q4. Stored program organization; direct and indirect addressing [5]

> *"What is stored program organization? Explain how direct and indirect addressing are handled in basic computer organization."*

**Stored program organization** is the concept (from the von Neumann model) where both **instructions and data are stored in the same memory unit**, in binary form, and are fetched and executed sequentially by the CPU using a Program Counter. This allows programs to be loaded, modified, and executed like data.

**Addressing in Basic Computer (Mano's model):** Each instruction has a 15-bit address field and a 1-bit addressing mode field `I`.

| Mode | I bit | Meaning | Operation |
|---|---|---|---|
| **Direct addressing** | I = 0 | The address field directly gives the effective address (EA) of the operand | `EA = address field`, e.g. `AC ← M[address]` |
| **Indirect addressing** | I = 1 | The address field gives the address of a memory location that itself contains the effective address | `EA = M[address field]`, e.g. `AC ← M[M[address]]` |

Indirect addressing requires one extra memory reference to fetch the actual address before the operand can be accessed, but allows access to a much larger effective address space.

---

### Q5. Program interrupt and its types [1+4]

> *"What is program interrupt? Explain different types of program interrupts."*

A **program interrupt** is a signal that causes the CPU to temporarily suspend execution of the currently running program, save its state (PC and registers), and transfer control to a special routine called the **Interrupt Service Routine (ISR)**. After the ISR completes, control returns to the interrupted program.

**Types of interrupts:**

1. **External interrupts** – Originate from I/O devices or external hardware (e.g., a peripheral signaling it has finished a transfer). Independent of the program being executed.
2. **Internal interrupts (Traps)** – Caused by conditions arising *within* the CPU during instruction execution, e.g., division by zero, register overflow, or illegal opcode.
3. **Software interrupts** – Initiated deliberately by executing a special instruction (e.g., `INT`) in the program; commonly used for system calls.

In Basic Computer organization, an interrupt flip-flop (**IEN/R**) is checked at the end of every instruction cycle; if set, the CPU enters an **interrupt cycle** instead of the next instruction cycle.

---

### Q6. Micro-instruction and mapping of instructions to microinstructions [1+4]

> *"What is a micro-instruction? How computer instructions are mapped into microinstructions in the basic computer organization? Explain."*

A **micro-instruction** is a binary word containing a set of control bits, each bit representing one micro-operation (or control signal) to be executed during a single clock cycle. A sequence of micro-instructions stored in **control memory (ROM)** forms a **microprogram**, which implements a machine instruction.

**Mapping process (in Basic Computer):**

1. When an instruction is fetched, its **opcode** (bits 11–14) is placed in the Instruction Register (IR).
2. A **mapping function** converts the opcode into the **starting address in control memory** where the routine for that instruction begins.
3. A common mapping rule: `Control memory address = 1 (Opcode bit2) (Opcode bit1) (Opcode bit0) 00`
   - i.e., set the MSB to 1, copy the 3-bit opcode, and append `00`, giving each instruction routine 4 consecutive control memory locations.
4. The Control Address Register (CAR) is loaded with this mapped address, and micro-instructions are read out sequentially (or via branching) to execute the instruction.

This mapping allows the hardware to jump directly to the correct microprogram without a large decoding circuit for every opcode.

---

### Q7. Flynn's classification for parallel processing [5]

> *"Explain Flynn's classification for parallel processing."*

Flynn's classification categorizes computer architectures based on the multiplicity of **instruction streams** and **data streams**:

| Category | Full Form | Description | Example |
|---|---|---|---|
| **SISD** | Single Instruction, Single Data | One control unit executes one instruction stream on one data stream at a time — conventional serial computer | Traditional uniprocessor systems |
| **SIMD** | Single Instruction, Multiple Data | One instruction is broadcast to and executed by multiple processing units simultaneously, each on different data | Array/vector processors, GPUs |
| **MISD** | Multiple Instruction, Single Data | Multiple instructions operate on the same data stream simultaneously (rare, mainly theoretical/fault-tolerant systems) | Pipeline architectures (arguable), fault-tolerant systems |
| **MIMD** | Multiple Instruction, Multiple Data | Multiple processors execute different instructions on different data independently | Multiprocessor / multicomputer systems, modern multi-core CPUs |

This classification is widely used to describe the degree of parallelism achievable in a computer architecture.

---

## Group C — Attempt any TWO (2×10 = 20)

### Q1. (a) Product of two 8-bit numbers [5]

> *"Write a program in assembly language to find the product of two 8-bit numbers stored in the memory locations 5001H and 5002H and store the product in the memory location 5005H."*

Since 8085 has no direct multiply instruction, multiplication is done by **repeated addition**:

```asm
        LXI  H, 5001H   ; HL points to first number
        MOV  B, M       ; B = multiplicand (5001H)
        INX  H          ; HL points to 5002H
        MOV  C, M       ; C = multiplier (5002H)
        MVI  A, 00H     ; A = product accumulator, cleared

LOOP:   ADD  B          ; Add multiplicand to accumulator
        DCR  C          ; Decrement multiplier count
        JNZ  LOOP       ; Repeat until C = 0

        STA  5005H      ; Store 8-bit product at 5005H
        HLT             ; Stop
```

**Logic:** The multiplicand (B) is added to the accumulator, multiplier (C) times, using a decrement-and-loop structure — equivalent to `B × C`. (Result assumed to fit in a single byte, since only one memory location is given for storage.)

---

### Q1. (b) Stack organization and zero-address instructions [1+4]

> *"What is stack organization? Use zero-address instructions using stack operations to find the value of X = (A+B-C)*D."*

**Stack organization** is a LIFO (Last-In-First-Out) memory structure accessed only from the top, using `PUSH` (insert) and `POP` (remove) operations. It may be implemented as a register stack or a portion of memory addressed by a Stack Pointer (SP). Stacks are used for arithmetic expression evaluation, subroutine linkage, and return address storage.

**Zero-address instructions** operate implicitly on the stack — no operand addresses are specified; operations always act on the top of the stack. Arithmetic operations pop the required operands, compute the result, and push it back.

**Step 1 — Convert infix to postfix:**
`X = (A + B − C) * D` → Postfix: **`A B + C − D *`**

**Step 2 — Zero-address instruction sequence:**

```
PUSH A
PUSH B
ADD
PUSH C
SUB
PUSH D
MUL
```

**Step 3 — Stack trace:**

| Instruction | Stack (top → bottom) |
|---|---|
| `PUSH A` | A |
| `PUSH B` | B, A |
| `ADD` | (A+B) |
| `PUSH C` | C, (A+B) |
| `SUB` | (A+B−C) |
| `PUSH D` | D, (A+B−C) |
| `MUL` | (A+B−C)*D  ← **result = X** |

The final value left on top of the stack is `X`.

---

### Q2. Microprogram sequencer — block diagram and explanation [2+8]

> *"What is microprogram sequencer? Draw and explain the block diagram of microprogram sequencer."*

**Definition:** A microprogram sequencer is the hardware unit that determines the **address of the next microinstruction** to be executed in the control memory, based on the current microinstruction's next-address field, status/condition flags, and mapping logic.

**Block diagram components:**

```
        Status
        Inputs
          │
          ▼
  ┌────────────────┐        ┌────────────────┐
  │  Branch Logic   │◄───────│  Test / Cond.  │
  └───────┬─────────┘        │    Select       │
          │                  └────────────────┘
          ▼
  ┌────────────────┐    Mapping bits
  │     MUX1        │◄──── from IR opcode
  │ (selects source)│
  └───────┬─────────┘
          │
          ▼
  ┌────────────────┐   ┌────────────┐
  │      MUX2       │◄──│  Subroutine │
  │ (selects address)│  │  Register   │
  └───────┬─────────┘   │   (SBR)     │
          │              └────────────┘
          ▼
  ┌────────────────┐
  │  Control Address │
  │  Register (CAR)  │
  └───────┬─────────┘
          │
          ▼
  ┌────────────────┐
  │ Control Memory   │──► Microinstruction output
  │     (ROM)        │
  └───────┬─────────┘
          │
          ▼
   ┌───────────────┐
   │  Incrementer   │──► CAR + 1 (next sequential address)
   └───────────────┘
```

**Explanation of components:**

- **Control Address Register (CAR):** Holds the address of the microinstruction currently being read from control memory.
- **MUX1 (source selector):** Chooses the source of the next address — from the incrementer (sequential), from a branch address (subroutine call), or from the mapping logic (start of a new instruction routine).
- **MUX2 (address selector):** Chooses between the branch address field and the subroutine register output, based on whether a subroutine return is required.
- **Subroutine Register (SBR):** Saves the return address when a microprogram subroutine call occurs, allowing the sequencer to resume the calling routine afterward.
- **Incrementer:** Adds 1 to the CAR to generate the address of the next sequential microinstruction (normal execution flow).
- **Branch logic / status inputs:** Test condition flags (e.g., carry, zero) to decide whether a conditional branch in the microprogram should be taken.
- **Mapping logic:** Converts the machine instruction's opcode into the starting control memory address of its microroutine (as in Q6 of Group B).

The sequencer thus controls **four types of address transfers**: incrementing (sequential execution), unconditional/conditional branching, subroutine call, and subroutine return — enabling the control unit to execute microprograms in the correct order.

---

### Q3. Arithmetic pipelining — floating point subtraction [2+8]

> *"What is arithmetic pipelining? Explain in detail about how arithmetic pipelining can be used to perform the floating point subtraction."*

**Arithmetic pipelining** is a technique where an arithmetic unit is divided into multiple independent segments (stages), each performing a sub-operation on the data. Different stages work simultaneously on different sets of operands flowing through the pipeline, so a new pair of operands can enter the pipeline before the previous one has finished — greatly increasing throughput for repetitive arithmetic operations such as floating-point computation.

**Floating-point subtraction using a 4-stage pipeline:**

A floating-point number is represented as `Mantissa × 2^Exponent`. To subtract two floating-point numbers `A = a × 2^p` and `B = b × 2^q`, the pipeline is divided into the following segments:

| Segment | Operation |
|---|---|
| **R1 — Compare exponents** | Subtract the exponents: `p − q`. This determines which mantissa needs to be shifted and by how much. |
| **R2 — Align mantissas** | The mantissa of the number with the smaller exponent is right-shifted by the exponent difference, so both numbers have the same exponent. |
| **R3 — Add/Subtract mantissas** | The (now aligned) mantissas are subtracted using a parallel adder/subtractor. |
| **R4 — Normalize result** | The result mantissa is shifted (left or right) and the exponent adjusted so the mantissa is in normalized form (leading nonzero digit), producing the final floating-point result. |

**Pipeline flow diagram (conceptual):**

```
 A, B ──► [Compare Exponents] ──► [Align Mantissas] ──► [Add/Sub Mantissas] ──► [Normalize] ──► Result
              R1                       R2                     R3                    R4
```

Each stage is separated by buffer registers that hold intermediate results. Because the four stages operate independently, once segment R1 finishes processing the first pair of operands and passes them to R2, it can immediately begin processing the **next** pair of floating-point numbers — so after the pipeline fills up, one new result emerges every clock cycle instead of every 4 cycles, giving a significant speedup for repeated floating-point operations (e.g., in vector/array computations).

---

## Quick Revision Summary

| Q. No. | Topic | Marks |
|---|---|---|
| B1 | Instruction types by length (8085) | 5 |
| B2 | 8086 status flags | 5 |
| B3 | ASM: greater number + XOR | 5 |
| B4 | Stored program org. / direct & indirect addressing | 5 |
| B5 | Program interrupts & types | 5 |
| B6 | Micro-instruction & mapping | 5 |
| B7 | Flynn's classification | 5 |
| C1(a) | ASM: product of two numbers | 5 |
| C1(b) | Stack org. + zero-address instructions | 5 |
| C2 | Microprogram sequencer (block diagram) | 10 |
| C3 | Arithmetic pipelining — FP subtraction | 10 |