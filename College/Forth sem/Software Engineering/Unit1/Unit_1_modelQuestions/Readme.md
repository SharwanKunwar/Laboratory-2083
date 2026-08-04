# Unit 1 – Introduction to Software Engineering (Part 1)
### Model Question Set — CACS 253 Software Engineering

Covers: Definition of Software, Types of Software, Characteristics of Software, Attributes of Good Software, Definition of Software Engineering, SE Costs, Key Challenges, Software vs Hardware, and Why SE differs from Programming.

Questions are grouped by importance for revision priority: **Very Important → Important → Short → Extra → Conceptual**

---

## Table of Contents
- [🔴 Very Important](#-very-important-likely-10-mark--long-questions)
- [🟠 Important](#-important-likely-5-mark-questions)
- [🟡 Short Questions](#-short-questions-1–2-marks--quick-revision)
- [🟢 Extra Questions](#-extra-questions-supplementary-coverage)
- [🔵 Conceptual Questions](#-conceptual-questions-understanding-based)

---

## 🔴 Very Important (Likely 10-mark / Long Questions)

### Q1. What is software? Explain its types with examples.
**Software** is a collection of programs, data, and associated documentation that performs specific tasks on a computer system. Unlike hardware, software is intangible — it's logical rather than physical.

**Types of Software:**

| Type | Description | Examples |
|---|---|---|
| **System Software** | Manages and controls hardware so application software can run | Operating Systems (Windows, Linux), Device Drivers |
| **Application Software** | Performs specific user-oriented tasks | MS Word, Photoshop, browsers |
| **Embedded Software** | Runs on dedicated hardware to control devices | Software in washing machines, ATMs, car ECUs |
| **Web Software** | Runs on web servers, accessed via browsers | E-commerce sites, web apps like Gmail |
| **AI Software** | Uses machine learning/AI techniques to perform intelligent tasks | Chatbots, recommendation engines, self-driving software |
| **Open-Source Software** | Source code is publicly available for use/modification | Linux, Firefox, LibreOffice |

Each type is designed for a different operating context, but all share the common trait of being logically engineered rather than manufactured.

---

### Q2. Define software engineering. Discuss the key challenges facing software engineering today.
**Software Engineering (SE)** is a systematic, disciplined, and quantifiable approach to the design, development, operation, and maintenance of software, applying engineering principles to produce reliable and efficient software within budget and schedule constraints.

**Key Challenges:**
1. **Changing Requirements** – client needs evolve mid-project, making scope hard to freeze.
2. **Cost & Time Estimation** – accurately predicting effort, schedule, and budget is difficult.
3. **Complexity Management** – large, intricate systems are hard to design, test, and maintain.
4. **Legacy System Integration** – new software must interoperate with old systems.
5. **Security Threats** – growing cyberattacks demand secure-by-design development.
6. **Rapid Technology Change** – constant need to adapt to new tools/platforms.
7. **Quality vs Deadline Trade-off** – balancing thorough testing against delivery pressure.

These challenges are why SE emphasizes structured processes, rather than ad hoc coding.

---

### Q3. Discuss the characteristics of software and how they differentiate it from hardware.
**Characteristics of Software:**
- **Intangible** – logical, not physical; cannot be seen or touched directly.
- **Developed/Engineered, not Manufactured** – built through design and coding, not assembly-line production.
- **Does not Wear Out** – doesn't degrade physically with use (though it can suffer from "software rot" due to outdated environments/requirements).
- **Custom-built or Assembled from Components** – can be built from scratch or reusable components/libraries.
- **Complex and Evolving** – tends to grow more complex over its lifecycle as features are added.

**Software vs Hardware:**

| Aspect | Software | Hardware |
|---|---|---|
| Nature | Intangible (logical) | Tangible (physical) |
| Production | Developed/engineered | Manufactured |
| Wear | Doesn't wear out physically; degrades logically (bugs, obsolescence) | Wears out physically over time |
| Maintenance | Involves fixing/upgrading logic | Involves repairing/replacing parts |
| Reproduction | Easy and cheap to copy | Costly to reproduce |

---

### Q4. What are the attributes of good software? Explain each with examples.
Good software must satisfy both its **functional requirements** (what it should do) and **non-functional attributes** (how well it does it):

| Attribute | Description | Example |
|---|---|---|
| **Maintainability** | Software should be easy to modify, fix, and extend over time | Well-documented, modular code that's easy to update |
| **Dependability** | Software should be reliable, safe, and secure — trustworthy under normal and abnormal conditions | Banking software that doesn't crash or lose transaction data |
| **Efficiency** | Software should use system resources (memory, CPU, time) optimally | An app that loads quickly and doesn't drain battery |
| **Usability** | Software should have an appropriate, learnable, and user-friendly interface | An app with intuitive navigation requiring minimal training |

Good software balances all four attributes — over-emphasizing one (e.g., efficiency) at the cost of another (e.g., usability) often leads to poor overall quality.

---

## 🟠 Important (Likely 5-mark Questions)

### Q5. Why is software engineering different from just programming?
- **Programming** focuses on writing code to solve a specific, often small-scale problem.
- **Software Engineering** encompasses the entire lifecycle — requirement analysis, design, implementation, testing, deployment, and maintenance — for large, complex, team-based systems.
- SE involves **process, planning, documentation, quality assurance, and teamwork**, while programming is just one activity within that larger process.
- SE also accounts for **cost, schedule, scalability, and long-term maintainability**, which individual programming tasks typically do not.

---

### Q6. What are the costs associated with software engineering?
Software engineering costs are generally split across the lifecycle:
1. **Development Costs** – requirement analysis, design, coding, and testing.
2. **Maintenance Costs** – often the largest share; involves bug fixes, updates, and enhancements after deployment.
3. **Documentation Costs** – producing manuals, specifications, and technical documentation.
4. **Training Costs** – training users and developers on the system.
5. **Infrastructure Costs** – hardware, servers, tools, and licenses needed for development and deployment.

Note: Studies consistently show **maintenance costs exceed initial development costs** over a software's lifetime.

---

### Q7. Distinguish between System Software and Application Software.

| Basis | System Software | Application Software |
|---|---|---|
| Purpose | Manages hardware/system resources | Performs specific user tasks |
| Example | OS, device drivers | MS Word, games |
| Dependency | Runs independently of applications | Depends on system software to run |
| User Interaction | Mostly indirect | Direct, user-facing |

---

## 🟡 Short Questions (1–2 marks — quick revision)

1. **Define software.**
   → A collection of programs, procedures, and documentation that performs a specific function on a computer.

2. **What is embedded software?**
   → Software built into hardware devices to control specific functions (e.g., microwave, ATM).

3. **Name any four types of software.**
   → System, Application, Embedded, Web software.

4. **What does "maintainability" mean in software?**
   → The ease with which software can be modified to fix defects, improve performance, or adapt to a new environment.

5. **What is meant by "software does not wear out"?**
   → Unlike hardware, software doesn't degrade due to physical use; failures come from bugs, design flaws, or changing requirements ("software rot").

6. **Define dependability in software.**
   → The degree to which software can be trusted to perform reliably, safely, and securely.

7. **What is open-source software?**
   → Software whose source code is publicly available for anyone to view, use, and modify.

8. **What is Software Engineering in one line?**
   → A disciplined, systematic approach to designing, developing, and maintaining software.

9. **Give one example each of AI software and Web software.**
   → AI: ChatGPT/recommendation engine. Web: Gmail/e-commerce site.

---

## 🟢 Extra Questions (Supplementary Coverage)

### Q8. Explain "software rot" and how it relates to software characteristics.
**Software rot** (also called "bit rot") refers to the gradual decline in software's usability and performance over time — not due to physical wear, but because the surrounding environment changes (new OS versions, unsupported libraries, evolving user needs) while the software remains static. This highlights why **maintainability** is a critical attribute of good software.

---

### Q9. What role do real-world case studies play in understanding software engineering?
Case studies (e.g., failed software projects like the Denver Airport baggage system, or the Therac-25 radiation therapy incidents) illustrate:
- The real consequences of poor requirement gathering, testing, or design.
- Why SE processes (not just coding skill) determine project success.
- How cost/time overruns and safety-critical failures can stem from ignoring SE discipline.

They reinforce that SE is as much about **process and risk management** as it is about writing code.

---

### Q10. List some tutorial discussion points comparing software and hardware.
- Software has **no physical form**; hardware is tangible and can be seen/touched.
- Software is **duplicated at near-zero cost**; hardware duplication requires manufacturing.
- Software failure is often due to **design/logic errors**; hardware failure is often due to **physical degradation**.
- Software can be **updated remotely**; hardware often requires physical replacement/repair.

---

## 🔵 Conceptual Questions (Understanding-Based)

### Q11. "Software is engineered, not manufactured." Explain what this statement means.
This means software isn't produced on an assembly line like physical products. Instead, each software system is **designed and built through a creative, logical process** — requirement analysis, design, coding, and testing — similar to how a building is engineered rather than mass-produced. Even when components are reused, the overall system still requires custom integration and engineering judgment.

---

### Q12. Why can't software engineering be treated the same as traditional engineering disciplines (e.g., civil or mechanical)?
- Software is **intangible**, so progress and quality are harder to measure visually.
- Requirements in software are often **more volatile** than in physical engineering projects.
- Software has **no physical wear**, so failure modes differ (bugs vs material fatigue).
- Software can be **modified indefinitely** post-deployment, unlike a finished bridge or building.
- Despite these differences, SE borrows engineering discipline — process rigor, systematic design, and quality assurance — to manage complexity.

---

### Q13. How do the four attributes of good software (Maintainability, Dependability, Efficiency, Usability) sometimes conflict with each other?
- Improving **efficiency** (e.g., minimal code, tight optimization) can reduce **maintainability** (harder to read/modify).
- Increasing **usability** (more features, guided UI) can reduce **efficiency** (more resource use).
- Strengthening **dependability** (extensive validation checks) can slow performance, affecting **efficiency**.

Good software engineering involves **balancing trade-offs** among these attributes based on the specific system's priorities (e.g., a banking system prioritizes dependability over UI flair).

---

### Q14. Why is "cost" considered a critical factor in software engineering rather than just a business concern?
Cost directly influences **technical decisions** in SE:
- Budget constraints affect how much testing, documentation, and quality assurance is feasible.
- Underestimating costs (especially maintenance) leads to **technical debt** and long-term quality issues.
- SE methodologies exist partly to make **cost estimation and control** more predictable and manageable — linking engineering discipline directly to economic outcomes.

---

## Quick Revision Summary Table

| Topic | Core Idea |
|---|---|
| Software | Intangible, engineered, does not wear out |
| Types of Software | System, Application, Embedded, Web, AI, Open-source |
| Characteristics | Intangible, engineered, complex, evolving, doesn't wear out |
| Good Software Attributes | Maintainability, Dependability, Efficiency, Usability |
| Software Engineering | Disciplined lifecycle approach to building software |
| SE Costs | Development + Maintenance (largest) + Docs + Training + Infra |
| Key Challenges | Changing requirements, estimation, complexity, security |
| Software vs Hardware | Intangible vs tangible; doesn't wear out vs wears out |
| SE vs Programming | Full lifecycle & process vs. just writing code |

---
*Prepared as a Unit 1 (Part 1) model question set for CACS 253 — Software Engineering, Tribhuvan University (BCA, Semester IV).*