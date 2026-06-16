# Day 2 — Characteristics of Software & Attributes of Good Software
**Course:** CACS253 – Software Engineering | **Unit 1: Introduction**

---

## 1. Characteristics of Software

Software differs fundamentally from other engineered products (especially hardware). Understanding these differences explains *why* software engineering exists as its own discipline.

| # | Characteristic | Explanation |
|---|---|---|
| 1 | **Developed, not manufactured** | Each software product is essentially custom-engineered. There's no assembly line — quality comes from design and process discipline, not production-line consistency. |
| 2 | **Doesn't wear out (but it does age)** | Unlike hardware, software has no physical wear from use. However, it deteriorates logically over time — every patch or enhancement risks introducing new defects. This is called **software erosion / software aging**. |
| 3 | **Complex** | Even small programs can contain enormous logical complexity — many states, branches, and edge cases — far beyond what file size suggests. |
| 4 | **Intangible / Invisible** | Software has no physical form. You can't "see" the logic the way you can inspect a circuit board, which makes progress and defects harder to track. |
| 5 | **Mostly custom-built** | Most software is still built for a specific purpose, though reuse via components and libraries (CBSE) is increasingly common. |
| 6 | **Flexible / Changeable** | Software can be modified more easily than hardware — this is both a strength (adaptability) and a risk (uncontrolled change leads to degradation). |

### Hardware vs Software — Failure Curves
- **Hardware:** failure rate is high early (manufacturing defects), drops to a steady low rate, then rises again due to physical wear (the classic "bathtub curve").
- **Software:** failure rate is high early (undiscovered bugs), drops as bugs are fixed, but **rises again after each change/maintenance**, since changes introduce new bugs. Software doesn't "wear out" — it degrades through change.

---

## 2. Attributes of Good Software

Good software must satisfy two broad categories of requirements:

1. **Functionality** — does it do what the user actually needs? (matches the specification)
2. **Quality Attributes** — *how well* does it do it?

The four classic quality attributes (often remembered as **M-D-E-U**) are:

### 🔧 Maintainability
Software must be able to evolve to meet changing requirements — this includes:
- **Corrective** changes (fixing bugs)
- **Adaptive** changes (working in new environments)
- **Perfective** changes (adding/improving features)

> A maintainable system has clean structure, good documentation, and low coupling so changes don't ripple unpredictably.

### 🛡️ Dependability and Security
Software shouldn't cause economic or physical damage in the event of a failure. This covers:
- **Reliability** — performs consistently under stated conditions
- **Availability** — accessible/operational when needed
- **Safety** — won't cause harm even during failure
- **Security** — resistant to unauthorized access or malicious attack

### ⚡ Efficiency
Software shouldn't waste system resources, including:
- Memory usage
- Processor/CPU cycles
- Storage space
- Energy/power consumption (especially relevant for mobile/embedded systems)

### 🎨 Usability
Software must have a UI appropriate for its intended users, plus:
- Adequate, clear documentation
- Ease of learning for new users
- Appropriate interaction style for the target audience

---

## 📊 Quick Reference Table

| Attribute | Core Question It Answers |
|---|---|
| Maintainability | Can it be changed easily and safely? |
| Dependability & Security | Can it be trusted not to fail or be exploited? |
| Efficiency | Does it use resources wisely? |
| Usability | Can people actually use it effectively? |

---

## 📝 Possible Exam Questions
- List and explain the characteristics that distinguish software from hardware.
- Why doesn't software "wear out" the way hardware does? Explain software aging.
- Define and explain the four key attributes of good software (MDEU) with examples.
- Differentiate between functional requirements and quality attributes of software.

---

## 🧠 Memory Tip
**MDEU** → *"My Dog Eats Umbrellas"* — Maintainability, Dependability (& Security), Efficiency, Usability.

---

*Reference: Sommerville, I. — Software Engineering (10th Ed.), Pearson — Chapter 1*