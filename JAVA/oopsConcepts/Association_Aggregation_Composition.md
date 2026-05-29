# ☕ OOP Learning Journey — Java

> A question-by-question OOP practice log.
> Each topic is practiced until every important concept is covered.
> Answers are kept as-is (with grammar corrections) to show real learning progress. ✍️

---

## 📚 Topics Roadmap

| # | Topic | Status |
|---|-------|--------|
| 1 | Class & Object | ✅ Mastered |
| 2 | Method | ✅ Mastered |
| 3 | Constructor | ✅ Mastered |
| 4 | Encapsulation | ✅ Mastered |
| 5 | Inheritance | ✅ Mastered |
| 6 | Polymorphism | ✅ Mastered |
| 7 | Abstraction | ✅ Mastered |
| 8 | Interface | ✅ Mastered |
| 9 | Abstract Class | ✅ Mastered (covered in Topic 7) |
| 10 | this, super, static, final | ✅ Mastered |
| 11 | Association, Aggregation, Composition | ✅ Half Mastered some topic are remains still|

---

## 🎉 OOP Journey Complete!

---

## 📌 Topic 11: Association, Aggregation & Composition

### 💡 Core Concept

> These three describe **relationships between classes** — how objects relate to each other.

| Relationship | Meaning | Keyword | Real World Example |
|-------------|---------|---------|-------------------|
| **Association** | A uses B — loosely connected | "uses" | Teacher teaches Student |
| **Aggregation** | A has B — B can exist without A | "has-a" | Department has Teachers |
| **Composition** | A owns B — B CANNOT exist without A | "owns" | House has Rooms |

**Simple way to remember:**
```
Association  → "uses"   → weakest — just temporary use
Aggregation  → "has-a"  → B field stored but created outside
Composition  → "owns"   → B created INSIDE A — dies with A!
```

---

## 🧪 Practice Questions

---

### ❓ Q1 — Association

**Question asked:**
> 1. What is the output?
> 2. What type of relationship is this and why?
> 3. If t is deleted — do s1 and s2 still exist?

```java
class Student {
    String name;

    Student(String name) { this.name = name; }
}

class Teacher {
    String name;

    Teacher(String name) { this.name = name; }

    void teach(Student s) {
        System.out.println(this.name + " is teaching " + s.name);
    }
}

public class Main {
    public static void main(String[] args) {
        Teacher t = new Teacher("Mr. Smith");
        Student s1 = new Student("Alice");
        Student s2 = new Student("Bob");
        t.teach(s1);
        t.teach(s2);
    }
}
```

**My Answer:**
```
Mr. Smith is teaching Alice
Mr. Smith is teaching Bob
```
> Association — Teacher uses Student and it is loosely connected.
> Initially said s1 and s2 would be destroyed — then corrected to they still exist.

**Verdict: ⚠️ Output & relationship correct — Q3 needed correction**

**Correct Answer for Q3:**
> `s1` and `s2` were created **independently** in Main — Teacher just uses them temporarily!
> Deleting `t` does NOT affect `s1` or `s2` — they survive! ✅

**Memory Picture:**
```
Teacher ----uses---→ Student
   ↑                    ↑
independent          independent
```

**What I Learned:**

| Relationship | If A deleted | B survives? |
|-------------|-------------|------------|
| **Association** | B exists independently | ✅ Yes |
| **Aggregation** | B exists independently | ✅ Yes |
| **Composition** | B is destroyed with A | ❌ No |

---

### ❓ Q2 — Aggregation

**Question asked:**
> 1. What is the output?
> 2. What type of relationship is this and why?
> 3. `d = null` — does `t` get destroyed? Why?

```java
class Teacher {
    String name;
    String subject;

    Teacher(String name, String subject) {
        this.name = name;
        this.subject = subject;
    }

    void showInfo() {
        System.out.println(name + " teaches " + subject);
    }
}

class Department {
    String deptName;
    Teacher teacher;

    Department(String deptName, Teacher teacher) {
        this.deptName = deptName;
        this.teacher = teacher;
    }

    void showInfo() {
        System.out.println("Dept: " + deptName);
        teacher.showInfo();
    }
}

public class Main {
    public static void main(String[] args) {
        Teacher t = new Teacher("Mr. Smith", "Java");
        Department d = new Department("CS", t);
        d.showInfo();
        System.out.println("---");
        d = null;
        t.showInfo();
    }
}
```

**My Answer:**
```
Dept: CS
Mr. Smith teaches Java
---
Mr. Smith teaches Java   ← (initially missed this line)
```
> Aggregation — because when we do d = null, t still exists independently.
> t and d are not dependent on each other.

**Verdict: ✅ Concept Perfect — missed last line initially**

**Memory Picture:**
```
t ───→ Object [ Mr. Smith, Java ]  ← still alive after d = null!

d ───→ null  ← Department gone — but Teacher survives!
```

**Aggregation Rule:**
> **"Has-A"** relationship — but the contained object **lives independently!**
> Object created OUTSIDE and passed in — survives if owner is destroyed! ✅

---

### ❓ Q3 — Composition

**Question asked:**
> 1. What is the output?
> 2. What type of relationship is this and why?
> 3. Key difference from Aggregation — what happens to Room if House is destroyed?

```java
class Room {
    String type;

    Room(String type) {
        this.type = type;
        System.out.println(type + " room created");
    }
}

class House {
    String address;
    Room bedroom;
    Room kitchen;

    House(String address) {
        this.address = address;
        this.bedroom = new Room("Bedroom");
        this.kitchen = new Room("Kitchen");
        System.out.println("House created at " + address);
    }

    void showInfo() {
        System.out.println("House: " + address);
        System.out.println("Has: " + bedroom.type + " and " + kitchen.type);
    }
}

public class Main {
    public static void main(String[] args) {
        House h = new House("Kathmandu");
        h.showInfo();
    }
}
```

**My Answer:**
```
Bedroom room created
Kitchen room created
House created at Kathmandu
House: Kathmandu
Has: Bedroom and Kitchen
```
> Aggregation — if we remove Room, House still exists independently. ← (wrong!)

**Verdict: ⚠️ Output Perfect — Relationship Wrong**

**Correct Answer: Composition!**

> `Room` objects are created **inside** House constructor!
> They have no existence outside House!
> If House is destroyed → Room is destroyed too! 💥

**Key Difference:**

| | Aggregation | Composition |
|--|-------------|-------------|
| Object created | Outside — independently | Inside — by owner! |
| Example | `Teacher t = new Teacher()` passed to Department | `new Room()` created inside House |
| If owner destroyed | Child survives ✅ | Child dies too ❌ |

---

### ❓ Q4 — Spot the Relationship

**Question asked:**
> For each snippet — identify Association, Aggregation, or Composition!

```java
// Snippet A — Car + Engine
class Engine {
    String type;
    Engine(String type) { this.type = type; }
}

class Car {
    Engine engine;
    Car() {
        engine = new Engine("V8");  // created INSIDE!
    }
}

// Snippet B — Team + Player
class Player {
    String name;
    Player(String name) { this.name = name; }
}

class Team {
    Player player;
    Team(Player player) {   // passed from OUTSIDE!
        this.player = player;
    }
}

// Snippet C — Student + Pen
class Pen {
    String color;
    Pen(String color) { this.color = color; }
}

class Student {
    void write(Pen p) {   // just uses it in method!
        System.out.println("Writing with " + p.color);
    }
}
```

**My Answer:**
> Snippet A: Composition — if we remove Car, Engine will be erased because Engine is in Car class.
> Snippet B: Association — Player and Team exist independently. ← (wrong!)
> Snippet C: Aggregation — we are passing the Pen reference. ← (wrong!)

**Verdict: ⚠️ A correct — B and C swapped**

**Correct Answers:**

| Snippet | Relationship | Why |
|---------|-------------|-----|
| A — Car + Engine | **Composition** | Engine created INSIDE Car — dies with Car! |
| B — Team + Player | **Aggregation** | Player created outside — passed in — survives independently! |
| C — Student + Pen | **Association** | Pen just used in method — no permanent field — loosely connected! |

**What I Learned:**
> The key difference between Aggregation and Association:
> - Aggregation → B is stored as a **permanent field** in A
> - Association → B is just **temporarily used** in a method — no field!

---

### ❓ Q5 — Final Combined Challenge 🏆

**Question asked:**
> 1. What is the output?
> 2. What is the relationship between Person and Address?
> 3. What is the relationship between Company and Person?
> 4. Draw all relationships!

```java
class Address {
    String city;
    String country;

    Address(String city, String country) {
        this.city = city;
        this.country = country;
    }
}

class Person {
    String name;
    Address address;

    Person(String name, String city, String country) {
        this.name = name;
        this.address = new Address(city, country);  // created INSIDE!
    }

    void showInfo() {
        System.out.println(name + " lives in " + address.city
                + ", " + address.country);
    }
}

class Company {
    String companyName;
    Person ceo;

    Company(String companyName, Person ceo) {
        this.companyName = companyName;
        this.ceo = ceo;   // passed from OUTSIDE!
    }

    void showInfo() {
        System.out.println("Company: " + companyName);
        System.out.println("CEO: " + ceo.name);
    }
}

public class Main {
    public static void main(String[] args) {
        Person p = new Person("Alice", "Kathmandu", "Nepal");
        Company c = new Company("TechCorp", p);
        p.showInfo();
        c.showInfo();
    }
}
```

**My Answer:**
```
Alice lives in Kathmandu, Nepal
Company: TechCorp
CEO: Alice
```
> Person → Address: Composition — Address dies if Person dies.
> Company → Person: Aggregation — created outside and passed in — both independent.

**Verdict: ✅ 100% Perfect! 🏆**

**Full Relationship Picture:**
```
Company --Aggregation--> Person --Composition--> Address
   ↑                       ↑                        ↑
created                 created                 created
separately              separately              INSIDE Person
                                                Dies with Person!
```

---

## 🏆 Topic 11 Final Scorecard — Association, Aggregation, Composition

| # | Question | Concept Tested | Result |
|---|----------|---------------|--------|
| Q1 | Teacher + Student | Association — uses | ⚠️ Q3 wrong initially |
| Q2 | Department + Teacher | Aggregation — has-a independent | ✅ Concept perfect |
| Q3 | House + Room | Composition — owns, dies together | ⚠️ Said Aggregation instead |
| Q4 | Spot the relationship | All three combined | ⚠️ B and C swapped |
| Q5 | Company + Person + Address | Full combined challenge | ✅ Perfect! |

---

## 💡 Key Takeaways — Association, Aggregation, Composition

| Concept | Rule |
|---------|------|
| **Association** | A uses B temporarily in a method — no permanent field — weakest! |
| **Aggregation** | A has B as a field — B created OUTSIDE and passed in — B survives independently! |
| **Composition** | A owns B — B created INSIDE A — B dies when A is destroyed! |

**The Decision Tree:**
```
Is B stored as a FIELD in A?
    ├── No  → ASSOCIATION (just used temporarily in method)
    └── Yes → Is B created INSIDE A?
                  ├── Yes → COMPOSITION (B dies with A)
                  └── No  → AGGREGATION (B survives independently)
```

**Strength of Relationship:**
```
Association (weakest) ──→ Aggregation ──→ Composition (strongest)
"uses"                     "has-a"          "owns"
```

---

## 🎉 Complete OOP Journey Summary

| # | Topic | Key Concept |
|---|-------|-------------|
| 1 | Class & Object | Blueprint vs Instance, Heap vs Stack, References |
| 2 | Method | Return types, Parameters, Internal calls, Unreachable code |
| 3 | Constructor | Default, Parameterized, Overloading, Chaining, Copy |
| 4 | Encapsulation | private fields, getters/setters, validation, reference leak |
| 5 | Inheritance | extends, super, multilevel, hierarchical, protected, final |
| 6 | Polymorphism | Overloading, Overriding, Runtime dispatch, Casting, instanceof |
| 7 | Abstraction | abstract class, abstract method, cannot instantiate |
| 8 | Interface | implements, multiple interfaces, default methods, conflict |
| 9 | Abstract Class | Covered in Topic 7 |
| 10 | this, super, static, final | Keywords deep dive, static block |
| 11 | Association, Aggregation, Composition | Object relationships |

---

> 📝 *This README completes the live Q&A OOP learning session.*
> *Topic 11: Association, Aggregation, Composition — Half Mastered ✅*
> *Full OOP Journey — Complete! 🎉*