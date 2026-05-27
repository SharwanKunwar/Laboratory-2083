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
| 11 | Association, Aggregation, Composition | 🔜 Up Next |

---

## 📌 Topic 10: this, super, static, final

### 💡 Core Concept

| Keyword | Purpose |
|---------|---------|
| `this` | Refers to **current object** |
| `super` | Refers to **parent class** |
| `static` | Belongs to **class** — not any object |
| `final` | **Locks** variable, method, or class |

---

## 🧪 Practice Questions

---

### ❓ Q1 — `this` Keyword Deep Dive

**Question asked:**
> 1. What is the output?
> 2. What does `return this` do in `getSelf()`?
> 3. Why does `p == ref` print `true`?

```java
class Person {
    String name;
    int age;

    Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    Person getSelf() {
        return this;
    }

    void showInfo() {
        System.out.println(name + " | " + age);
    }
}

public class Main {
    public static void main(String[] args) {
        Person p = new Person("Alice", 25);
        p.showInfo();

        Person ref = p.getSelf();
        ref.showInfo();

        System.out.println(p == ref);
    }
}
```

**My Answer:**
```
Alice | 25
Alice | 25
true
```
> `getSelf()` method returns the reference address and assigns it to `ref`.
> `p == ref` prints true because they have the same reference.

**Verdict: ✅ 100% Perfect!**

**Memory Picture:**
```
p   ──┐
      ├──→ Object [ Alice, 25 ]
ref ──┘
```

**Three uses of `this`:**

| Use | Example | Purpose |
|-----|---------|---------|
| `this.name = name` | Constructor | Removes ambiguity between field and param |
| `this()` | Constructor | Calls another constructor in same class |
| `return this` | Method | Returns current object's reference |

---

### ❓ Q2 — `super` Keyword Deep Dive

**Question asked:**
> 1. What is the output?
> 2. What are the three uses of super shown here?
> 3. Can we use super outside a child class?

```java
class Animal {
    String name;

    Animal(String name) {
        this.name = name;
        System.out.println("Animal created: " + name);
    }

    void showInfo() {
        System.out.println("Animal: " + name);
    }
}

class Dog extends Animal {
    String breed;

    Dog(String name, String breed) {
        super(name);
        this.breed = breed;
        System.out.println("Dog created: " + name);
    }

    void showInfo() {
        super.showInfo();
        System.out.println("Breed: " + breed);
    }

    void showSuper() {
        System.out.println("From super: " + super.name);
    }
}

public class Main {
    public static void main(String[] args) {
        Dog d = new Dog("Bruno", "Labrador");
        d.showInfo();
        d.showSuper();
    }
}
```

**My Answer:**
```
Animal created: Bruno
Dog created: Bruno
Animal: Bruno
Breed: Labrador       ← (printed on separate lines, not combined)
From super: Bruno
```
> We access parent class name using super, access parent field directly,
> and call the parent method using super.showInfo().
> Yes we can use super outside child class but child must extend parent.

**Verdict: ⚠️ Output missed separate lines — Q3 wrong**

**Correct Output:**
```
Animal created: Bruno
Dog created: Bruno
Animal: Bruno
Breed: Labrador
From super: Bruno
```

**Three uses of super:**

| Use | Example | Purpose |
|-----|---------|---------|
| `super(name)` | Constructor | Calls parent constructor |
| `super.showInfo()` | Method | Calls parent's version of method |
| `super.name` | Field | Accesses parent's field directly |

**What I Learned:**
> `super` can ONLY be used **inside a child class** that extends a parent!
> Using `super` in any unrelated class → Compile Error! 🚫

| Rule | Detail |
|------|--------|
| Only inside child class | ✅ super works only where extends exists |
| Outside child class | ❌ Compile Error! |
| `super()` position | Must always be FIRST line in constructor! |

---

### ❓ Q3 — `static` Keyword Deep Dive

**Question asked:**
> 1. What is the output?
> 2. `Counter.showTotal()` called without object — why is this allowed?
> 3. Can we access `totalCount` inside `showId()`?
> 4. Can we access `id` inside `showTotal()`?

```java
class Counter {
    static int totalCount = 0;
    int id;

    Counter() {
        totalCount++;
        this.id = totalCount;
    }

    static void showTotal() {
        System.out.println("Total: " + totalCount);
    }

    void showId() {
        System.out.println("ID: " + id);
    }
}

public class Main {
    public static void main(String[] args) {
        Counter.showTotal();

        Counter c1 = new Counter();
        Counter c2 = new Counter();
        Counter c3 = new Counter();

        c1.showId();
        c2.showId();
        c3.showId();

        Counter.showTotal();
    }
}
```

**My Answer:**
```
Total: 0
ID: 1
ID: 2
ID: 3
Total: 3
```
> It is allowed because static method is not related to object — we can access without making an object.
> Yes we can access totalCount inside showId().
> No we cannot access id inside showTotal() because it is related to object.

**Verdict: ✅ 100% Perfect!**

**Static Golden Rules:**

| Access | Static Method | Instance Method |
|--------|--------------|----------------|
| Static variable | ✅ Yes | ✅ Yes |
| Static method | ✅ Yes | ✅ Yes |
| Instance variable | ❌ No | ✅ Yes |
| Instance method | ❌ No | ✅ Yes |

> Static = class level — no object needed!
> Instance = object level — needs an object!

---

### ❓ Q4 — `final` Keyword Deep Dive

**Question asked:**
> 1. What happens when this code compiles?
> 2. `static final PI` vs `final id` — what is the difference?
> 3. When can a final instance variable be assigned?

```java
class MathConstants {
    static final double PI = 3.14159;
    final int id;

    MathConstants(int id) {
        this.id = id;
    }

    void showInfo() {
        System.out.println("PI: " + PI + " | ID: " + id);
        PI = 3.14;   // ← problem!
        id = 999;    // ← problem!
    }
}
```

**My Answer:**
> When we try to set `id` we get a Compile Error because id is final — we cannot change the value.
> `static final` is accessible without an object but `final int id` requires making an object.
> Compile Error.

**Verdict: ✅ Concept Correct — explanation polished**

**static final vs final:**

| | `static final PI` | `final id` |
|--|------------------|-----------|
| Belongs to | Class | Object |
| Access | `MathConstants.PI` | Need object → `m.id` |
| Initialized | At declaration | In constructor |
| Shared | ✅ One copy for all | ❌ Each object has own |

**When can final instance variable be assigned?**
```java
class Example {
    final int id;           // declared but not assigned

    Example(int id) {
        this.id = id;       // ✅ assigned in constructor — allowed!
    }

    void change() {
        this.id = 999;      // 💥 Compile Error — already assigned!
    }
}
```

> A `final` instance variable can ONLY be assigned at declaration OR inside the constructor!
> After that — **locked forever!** 🔒

---

### ❓ Q5 — Static Block

**Question asked:**
> 1. What is the output?
> 2. What is a static block and when does it run?
> 3. How many times does the static block run?

```java
class Database {
    static String url;
    static String username;
    static int port;

    static {
        System.out.println("Static block running...");
        url = "localhost";
        username = "admin";
        port = 3306;
    }

    Database() {
        System.out.println("Database constructor running...");
    }

    static void showConfig() {
        System.out.println(url + " | " + username + " | " + port);
    }
}

public class Main {
    public static void main(String[] args) {
        System.out.println("Main started");
        Database.showConfig();
        Database d1 = new Database();
        Database d2 = new Database();
    }
}
```

**My Answer:**
```
Static block running...    ← (placed after Main started — wrong order)
Main started
localhost | admin | 3306
Database constructor running...
Database constructor running...
```
> Static block is not related to object — it belongs to the class and runs first when main starts.
> It runs only once.

**Verdict: ⚠️ Lines correct — order wrong (static block runs BEFORE main!)**

**Correct Output:**
```
Static block running...    ← runs BEFORE main!
Main started
localhost | admin | 3306
Database constructor running...
Database constructor running...
```

**Static Block Rules:**

| Rule | Detail |
|------|--------|
| When | Runs when class is first loaded by JVM |
| Before | Runs before `main()` and any constructor |
| How many times | Only ONCE — no matter how many objects! |
| Purpose | Initialize static variables that need logic |

---

### ❓ Q6 — Final Challenge 🏆

**Question asked:**
> 1. What is the output?
> 2. What runs first — static block or showCompany()?
> 3. Can showCompany() access empId?
> 4. Why is COMPANY both static and final?
> 5. What happens at `e1.empId = 999`?

```java
class Employee {
    static final String COMPANY = "TechCorp";
    static int totalEmployees = 0;
    final int empId;
    String name;

    static {
        System.out.println("Employee class loaded!");
        totalEmployees = 0;
    }

    Employee(int empId, String name) {
        this.empId = empId;
        this.name = name;
        totalEmployees++;
    }

    static void showCompany() {
        System.out.println("Company: " + COMPANY);
        System.out.println("Total: " + totalEmployees);
    }

    void showInfo() {
        System.out.println("ID: " + empId + " | Name: " + name
                + " | Company: " + COMPANY);
    }
}

public class Main {
    public static void main(String[] args) {
        Employee.showCompany();
        Employee e1 = new Employee(1, "Alice");
        Employee e2 = new Employee(2, "Bob");
        e1.showInfo();
        e2.showInfo();
        Employee.showCompany();
        e1.empId = 999;
    }
}
```

**My Answer:**
```
Employee class loaded!
Company: TechCorp
Total: 0
ID: 1 | Name: Alice | Company: TechCorp   ← (wrote echCorp by mistake)
ID: 2 | Name: Bob   | Company: TechCorp
Company: TechCorp
Total: 2
💥 Compile Error — empId is final!
```
> Static block runs first — before main when JVM loads the class.
> showCompany() cannot access empId — it is a static method (corrected after hint).
> COMPANY is static so we can access without making an object, and final so value is locked.
> e1.empId = 999 causes Compile Error because empId is final.

**Verdict: ⚠️ Almost perfect — Q3 needed correction + COMPANY typo**

**Correct Output:**
```
Employee class loaded!
Company: TechCorp
Total: 0
ID: 1 | Name: Alice | Company: TechCorp
ID: 2 | Name: Bob   | Company: TechCorp
Company: TechCorp
Total: 2
💥 Compile Error — cannot assign a value to final variable empId!
```

---

## 🏆 Topic 10 Final Scorecard — this, super, static, final

| # | Question | Concept Tested | Result |
|---|----------|---------------|--------|
| Q1 | Person — getSelf() | this keyword — return this | ✅ Perfect |
| Q2 | Animal + Dog | super — constructor, method, field | ⚠️ Output order wrong, Q3 wrong |
| Q3 | Counter | static variable + method + access rules | ✅ Perfect |
| Q4 | MathConstants | final variable — declaration vs reassign | ✅ Concept right |
| Q5 | Database | Static block — timing and frequency | ⚠️ Lines right, order wrong |
| Q6 | Employee | Full combined challenge | ⚠️ Q3 wrong, COMPANY typo |

---

## 💡 Key Takeaways — this, super, static, final

| Keyword | Rule |
|---------|------|
| `this.field` | Removes ambiguity — refers to current object's field |
| `this()` | Calls another constructor in same class — must be first line! |
| `return this` | Returns current object's reference |
| `super(args)` | Calls parent constructor — must be first line in child constructor! |
| `super.method()` | Calls parent's version of a method |
| `super.field` | Accesses parent's field directly |
| `super` scope | ONLY inside child class — Compile Error elsewhere! |
| `static` variable | One copy shared by all objects — class level! |
| `static` method | Called via class name — no object needed! |
| Static in static | ✅ Static method can access static members |
| Instance in static | ❌ Static method CANNOT access instance members! |
| `final` variable | Value locked forever — Compile Error if reassigned! |
| `final` instance var | Can only be assigned at declaration OR in constructor! |
| `static final` | Constant — belongs to class, value locked! |
| Static block | Runs ONCE when class is loaded by JVM — BEFORE main()! |
| `final` method | Cannot be overridden — Compile Error if tried! |
| `final` class | Cannot be extended — Compile Error if tried! |

---

> 📝 *This README is part of a live Q&A OOP learning session.*
> *Topic 10: this, super, static, final — Fully Mastered ✅*
> *Every important concept covered and practiced before moving on.*