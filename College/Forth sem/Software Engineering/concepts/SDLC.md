# Software Development Life Cycle (SDLC) — Q&A Notes

Based on the SDLC overview concept (Gate Smashers style explanation), covering the end-to-end process of how software is conceptualized, developed, deployed, and maintained.

---

## Table of Contents
- [Basic Concept Questions](#basic-concept-questions)
- [Phase-wise Questions](#phase-wise-questions)
- [Comparison & Analytical Questions](#comparison--analytical-questions)
- [Short Quick-Revision Questions](#short-quick-revision-questions)

---

## Basic Concept Questions

### Q1. What is Software Development Life Cycle (SDLC)?
**Answer:** SDLC is a structured, step-by-step process followed by software teams to design, develop, test, deploy, and maintain high-quality software. It defines the tasks performed at each stage of software development, ensuring the final product meets customer requirements within the estimated time and cost.

---

### Q2. Why is SDLC important in software engineering?
**Answer:**
- Provides a **systematic framework** so nothing is missed during development.
- Helps in **planning, estimating cost and time** accurately.
- Reduces **risk of project failure** by identifying issues early (e.g., in requirements or design).
- Ensures **quality control** through defined testing stages.
- Makes large projects **manageable** by breaking them into clear phases.
- Improves **communication** among stakeholders, developers, and clients.

---

### Q3. What are the main phases of SDLC?
**Answer:** While different models may name them slightly differently, the core phases are:
1. **Communication (Requirement Gathering)**
2. **Planning**
3. **Modeling (Analysis & Design)**
4. **Construction (Coding & Testing)**
5. **Deployment**
6. **Maintenance**

---

## Phase-wise Questions

### Q4. What happens in the Communication phase of SDLC?
**Answer:** The **Communication** phase is the very first step, where the development team interacts with the client/stakeholders to **gather requirements** — understanding what the client wants, the purpose of the software, target users, and expected features. Effective communication at this stage is critical, since misunderstood requirements can cause major issues later in the project.

*Real-life analogy:* Similar to a client explaining to an architect what kind of house they want before any construction begins.

---

### Q5. What is the goal of the Planning phase?
**Answer:** After requirements are gathered, the **Planning** phase involves:
- Estimating **cost, resources, and timeline**.
- Identifying **risks** and how to mitigate them.
- Deciding on the **development approach/methodology** (e.g., Agile, Waterfall).
- Assigning **roles and responsibilities** to team members.

---

### Q6. What occurs during the Modeling phase?
**Answer:** The **Modeling** phase (Analysis & Design) translates the gathered requirements into a **technical blueprint** of the system:
- **Analysis** – understanding *what* the system should do (functional/non-functional requirements).
- **Design** – deciding *how* it will be built (architecture, database design, UI/UX design, data flow diagrams).

This phase produces design documents that guide the development team during coding.

---

### Q7. What happens in the Construction phase?
**Answer:** **Construction** is where actual **coding and testing** take place:
- Developers write code based on the design specifications.
- Testers perform testing (unit, integration, system testing) to identify and fix defects.
- This is typically the **longest and most resource-intensive phase**.

---

### Q8. What is the Deployment phase in SDLC?
**Answer:** **Deployment** is the stage where the fully developed and tested software is **released to the end-user** — either through installation, publishing to app stores, or making it live on a server. It may include:
- Final user-acceptance testing (UAT).
- Data migration (if replacing an old system).
- Release management (rolling out in stages or all at once).

*Real-life analogy:* Like handing over the keys of a finished house to its new owner.

---

### Q9. What is the Maintenance phase, and why is it considered ongoing?
**Answer:** **Maintenance** is the **final and continuous phase**, involving ongoing technical support for the product after release:
- Fixing bugs discovered after deployment.
- Releasing updates/patches for security or performance.
- Adding new features based on user feedback.
- Ensuring compatibility with new operating systems/devices over time.

It is "ongoing" because software requires support and updates throughout its **entire usable life**, often making maintenance the **most expensive and long-lasting phase** of SDLC.

---

## Comparison & Analytical Questions

### Q10. How does effective Communication impact later phases of SDLC?
**Answer:** Poor communication during requirement gathering can lead to:
- Incorrect or incomplete requirements being carried into Planning and Modeling.
- Costly rework during Construction if features don't match client expectations.
- Client dissatisfaction after Deployment.

Since each phase builds upon the previous one, **errors in Communication have a cascading effect** — the earlier a misunderstanding is caught, the cheaper it is to fix (a principle known as the "cost of change" curve in SE).

---

### Q11. Why is Maintenance often considered the most costly phase of SDLC?
**Answer:**
- Software must adapt to **changing user needs, platforms, and security threats** long after release.
- Bugs not caught during testing often surface only after **real-world use** at scale.
- Maintenance spans the **entire lifetime** of the software (potentially years), unlike other phases, which are time-bound.
- Studies show maintenance can account for **60–70% of total software lifecycle cost**.

---

### Q12. How do Deployment and Maintenance differ, even though both occur after development?
**Answer:**

| Aspect | Deployment | Maintenance |
|---|---|---|
| Timing | One-time (or staged) release event | Continuous, ongoing after release |
| Purpose | Deliver the software to end-users | Support, fix, and improve the software |
| Duration | Short (days/weeks) | Long (months/years — entire product life) |
| Activities | Installation, UAT, release management | Bug fixes, updates, patches, feature additions |

---

## Short Quick-Revision Questions

1. **What does SDLC stand for?**
   → Software Development Life Cycle.

2. **Which phase involves requirement gathering?**
   → Communication.

3. **What is released during the Deployment phase?**
   → The finished software product, delivered to the end-user.

4. **What type of support is given in the Maintenance phase?**
   → Ongoing technical support (bug fixes, updates, patches).

5. **Which SDLC phase typically takes the most time overall?**
   → Maintenance (due to its ongoing nature throughout the software's life).

6. **Name the six commonly recognized SDLC phases.**
   → Communication, Planning, Modeling, Construction, Deployment, Maintenance.

7. **Why is requirement gathering considered critical to project success?**
   → Because errors made here propagate and become more expensive to fix in later phases.

---

## Quick Revision Summary Table

| Phase | Core Activity | Real-life Analogy |
|---|---|---|
| Communication | Gather requirements from client | Client explaining house requirements to architect |
| Planning | Estimate cost, time, resources, risks | Architect drawing up a budget and timeline |
| Modeling | Analyze & design system architecture | Architect creating blueprints |
| Construction | Coding and testing | Actual construction of the house |
| Deployment | Release software to end-user | Handing over house keys |
| Maintenance | Ongoing support, fixes, updates | Repairs and renovations after moving in |

---
*Prepared as SDLC concept revision notes for Software Engineering (CACS 253), Tribhuvan University (BCA, Semester IV).*