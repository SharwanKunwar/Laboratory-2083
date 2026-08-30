# Classical & Iterative Waterfall Model — Brief Notes

---

## 1. Classical Waterfall Model

**Origin:** Proposed in the **1970s** by **Winston Royce**.

**Approach:** **One-way, no going back** — each phase must be completed before the next begins; there is no provision to revisit a previous phase.

### Phases
1. **Feasibility Study**
2. **Requirement Analysis & Specification** → produces the **SRS (Software Requirement Specification) document**
3. **Design**
4. **Coding & Unit Testing**
5. **System Testing & Integration**
6. **Maintenance**

### Advantages
- Acts as the **base model** for all other SDLC models.
- **Simple and easy** to understand and use.
- Straightforward, linear structure.

### Disadvantages
- **No feedback path** between phases.
- **No flexibility** to accommodate changing requirements.
- **High risk** — errors are discovered late, often only during testing.
- **Maintenance-heavy** — a large share (~60%) of overall effort is spent in the maintenance phase, fixing issues missed earlier.

---

## 2. Iterative Waterfall Model

**Concept:** The **Iterative Waterfall Model** is a **modified/upgraded version of the Classical Waterfall Model**. Its major improvement is the introduction of **feedback paths** ("rectification") between adjacent phases, allowing errors found in a later phase to be corrected by revisiting the earlier phase.

### Phases (same as Classical, but with feedback loops)
1. **Feasibility Study**
2. **Requirement Analysis & Specification**
3. **Design**
4. **Coding & Unit Testing**
5. **System Testing & Integration**
6. **Maintenance**

Each phase can send feedback **backward to the immediately preceding phase** if an issue is found — this is the key structural difference from the Classical model.

### Advantages
- **Feedback mechanism** allows correction of errors from previous phases.
- **No phase overlapping** — phases remain distinct and organized.
- **Simple and easy** to manage, like the classical model.
- **No intermediate delivery** needed — cleaner phase-by-phase progress.

### Disadvantages
- Still relatively **rigid** — accommodates only limited/adjacent-phase changes, not major requirement changes once the project has progressed far.

---

## Quick Comparison Table

| Aspect | Classical Waterfall | Iterative Waterfall |
|---|---|---|
| Feedback | ❌ None | ✅ Feedback to previous phase |
| Flexibility | Very low | Slightly better (still limited) |
| Error Correction | Late, costly | Earlier, via feedback loop |
| Origin | Winston Royce, 1970s | Modified version of Classical model |
| Risk | High | Comparatively lower |

---
*Brief revision notes — Classical vs Iterative Waterfall Model, Software Engineering (CACS 253).*