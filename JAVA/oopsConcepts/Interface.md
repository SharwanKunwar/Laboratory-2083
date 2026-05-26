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
| 9 | Abstract Class | 🔜 Up Next |
| 10 | Overloading & Overriding | ⏳ Pending |
| 11 | this, super, static, final | ⏳ Pending |
| 12 | Association, Aggregation, Composition | ⏳ Pending |

---

## 📌 Topic 8: Interface

### 💡 Core Concept

> An **Interface** is a 100% abstract contract — it defines WHAT a class must do, but never HOW.
> A class **implements** an interface and must provide the body for ALL methods!

| | Abstract Class | Interface |
|--|---------------|-----------|
| Keyword | `extends` | `implements` |
| Methods | Abstract + Normal | All abstract by default |
| Variables | Any type | `public static final` only |
| Constructor | ✅ Yes | ❌ No |
| Multiple | ❌ One only | ✅ Can implement many! |

| Concept | Rule |
|---------|------|
| `implements` | Class signs the contract — must implement ALL methods |
| Interface variables | `public static final` by default — cannot change! |
| Interface as reference | ✅ Allowed — same rule as abstract class |
| Interface as object | ❌ Never — `new Interface()` is Compile Error! |
| Multiple interfaces | ✅ A class can implement many interfaces |
| Interface extends interface | ✅ Allowed — implementing class must cover all! |
| `default` method | Has a body — class can use as-is or override |
| Default method conflict | Two interfaces same default → class MUST override! |

---

## 🧪 Practice Questions

---

### ❓ Q1 — Basic Interface + implements

**Question asked:**
> What will this print and why?
> What happens if Circle doesn't implement one of the methods?

```java
interface Drawable {
    void draw();
    void resize(int factor);
}

class Circle implements Drawable {
    @Override
    public void draw() { System.out.println("Drawing Circle"); }

    @Override
    public void resize(int factor) {
        System.out.println("Resizing Circle by " + factor);
    }
}

public class Main {
    public static void main(String[] args) {
        Circle c = new Circle();
        c.draw();
        c.resize(3);
    }
}
```

**My Answer:**
```
Drawing Circle
Resizing Circle by 3
```
> If Circle doesn't implement one of the methods — Compile Error because a class
> which implements an interface must implement all methods.

**Verdict: ✅ 100% Perfect!**

**What I Learned:**
```
Drawable interface says:
"Any class that implements me MUST provide:
 → draw()
 → resize()"

Circle signs the contract → implements both → valid ✅
Circle misses one → breaks contract → Compile Error! 💥
```

---

### ❓ Q2 — Multiple Interface Implementation

**Question asked:**
> 1. What is the output?
> 2. Java doesn't allow multiple inheritance with classes — how does Duck have two behaviors?
> 3. `Flyable f = new Duck()` — can we call `f.swim()`?

```java
interface Flyable { void fly(); }
interface Swimmable { void swim(); }

class Duck implements Flyable, Swimmable {
    @Override
    public void fly() { System.out.println("Duck is flying"); }

    @Override
    public void swim() { System.out.println("Duck is swimming"); }
}

public class Main {
    public static void main(String[] args) {
        Duck d = new Duck();
        d.fly();
        d.swim();

        Flyable f = new Duck();
        f.fly();

        Swimmable s = new Duck();
        s.swim();
    }
}
```

**My Answer:**
```
Duck is flying
Duck is swimming
Duck is flying
Duck is swimming
```
> Interface solves the multiple inheritance problem in Java.
> A class can implement as many interfaces as needed.
> Yes we can call f.swim() because Flyable is reference and actual object is Duck.

**Verdict: ⚠️ Output Perfect — Q3 needed correction**

**What I Learned:**
> Reference type decides WHAT you can call — not the object!

```java
Flyable f = new Duck();
f.fly();   // ✅ Flyable has fly() → allowed!
f.swim();  // 💥 Compile Error — Flyable has NO swim()!
```

| Reference | Can Call | Cannot Call |
|-----------|---------|-------------|
| `Flyable f` | `f.fly()` ✅ | `f.swim()` ❌ |
| `Swimmable s` | `s.swim()` ✅ | `s.fly()` ❌ |
| `Duck d` | `d.fly()` ✅ | `d.swim()` ✅ |

---

### ❓ Q3 — Interface Variables (public static final)

**Question asked:**
> 1. What is the output?
> 2. What type are interface variables by default?
> 3. What happens at `Constants.MAX_SPEED = 200`?

```java
interface Constants {
    int MAX_SPEED = 120;
    String DEFAULT_COLOR = "White";
}

class Car implements Constants {
    String color;
    int speed;

    Car(String color, int speed) {
        this.color = color;
        this.speed = speed;
    }

    void showInfo() {
        System.out.println("Color: " + color + " | Speed: " + speed);
        System.out.println("Max Speed: " + MAX_SPEED);
        System.out.println("Default Color: " + DEFAULT_COLOR);
    }
}

public class Main {
    public static void main(String[] args) {
        Car c = new Car("Red", 100);
        c.showInfo();
        Constants.MAX_SPEED = 200;
    }
}
```

**My Answer:**
```
Color: Red | Speed: 100
Max Speed: 120
Default Color: White
💥 Compile Error — cannot assign to final variable!
```
> Interface variables are public static final.
> We can access them because they are public static,
> but we cannot change the value because they are final.

**Verdict: ✅ 100% Perfect!**

**Interface Variables Rule:**

| Modifier | Meaning |
|----------|---------|
| `public` | Accessible from anywhere |
| `static` | Belongs to interface — not to object |
| `final` | Value fixed forever — cannot change! |

---

### ❓ Q4 — Interface + Polymorphism + Array

**Question asked:**
> 1. What is the output?
> 2. Can we store Dog and Cat in Animal[] even though Animal is an interface?
> 3. Which version of makeSound() runs for each element?

```java
interface Animal {
    void makeSound();
    void eat();
}

class Dog implements Animal {
    @Override
    public void makeSound() { System.out.println("Dog barks"); }

    @Override
    public void eat() { System.out.println("Dog eats bones"); }
}

class Cat implements Animal {
    @Override
    public void makeSound() { System.out.println("Cat meows"); }

    @Override
    public void eat() { System.out.println("Cat eats fish"); }
}

public class Main {
    public static void main(String[] args) {
        Animal[] animals = new Animal[3];
        animals[0] = new Dog();
        animals[1] = new Cat();
        animals[2] = new Dog();

        for (Animal a : animals) {
            a.makeSound();
            a.eat();
        }
    }
}
```

**My Answer:**
```
Dog barks
Dog eats bones
Cat meows
Cat eats fish
Dog barks
Dog eats bones
```
> Animal is an interface — we can store reference in Animal array.
> Which version runs depends on which object is calling — runtime polymorphism.

**Verdict: ✅ 100% Perfect!**

**Interface reference rule:**

| | Abstract Class | Interface |
|--|---------------|-----------|
| As reference | ✅ Allowed | ✅ Allowed |
| As object | ❌ Not allowed | ❌ Not allowed |

---

### ❓ Q5 — Interface Extending Interface

**Question asked:**
> 1. What is the output?
> 2. Can interfaces extend other interfaces?
> 3. Why does Superman need to implement BOTH fly() and flyFast()?

```java
interface Flyable { void fly(); }

interface SuperFlyable extends Flyable {
    void flyFast();
}

class Superman implements SuperFlyable {
    @Override
    public void fly() { System.out.println("Superman is flying"); }

    @Override
    public void flyFast() { System.out.println("Superman is flying FAST!"); }
}

public class Main {
    public static void main(String[] args) {
        Superman s = new Superman();
        s.fly();
        s.flyFast();

        Flyable f = new Superman();
        f.fly();
    }
}
```

**My Answer:**
```
Superman is flying
Superman is flying FAST!
Superman is flying
```
> Yes interfaces can extend other interfaces.
> When the last interface is implemented by a class, that class has to implement
> all methods from both Flyable and SuperFlyable.
> SuperFlyable cannot implement it — it is also an interface — so the class must do everything.

**Verdict: ✅ 100% Perfect!**

**Interface Chain:**
```
Flyable
└── fly()

SuperFlyable extends Flyable
└── flyFast() + inherits fly() from Flyable

Superman implements SuperFlyable
├── fly()      → must implement! (from Flyable via SuperFlyable)
└── flyFast()  → must implement! (from SuperFlyable)
```

---

### ❓ Q6 — Default Method in Interface

**Question asked:**
> 1. What is the output?
> 2. What is a default method in an interface?
> 3. EnglishGreeter never implemented defaultGreet() — how can it call it?

```java
interface Greetable {
    void greet();

    default void defaultGreet() {
        System.out.println("Hello from interface!");
    }
}

class EnglishGreeter implements Greetable {
    @Override
    public void greet() { System.out.println("Hello!"); }
}

class NepaliGreeter implements Greetable {
    @Override
    public void greet() { System.out.println("Namaste!"); }

    @Override
    public void defaultGreet() {
        System.out.println("Namaskar from Nepali!");
    }
}

public class Main {
    public static void main(String[] args) {
        EnglishGreeter e = new EnglishGreeter();
        NepaliGreeter n = new NepaliGreeter();
        e.greet();
        e.defaultGreet();
        n.greet();
        n.defaultGreet();
    }
}
```

**My Answer:**
```
Hello!
Hello from interface!
Namaste!
Namaskar from Nepali!
```
> A default method is `default void defaultGreet()`.
> EnglishGreeter implements Greetable interface so it has access to the default method
> and we have a reference — so we can access it.

**Verdict: ✅ 100% Perfect!**

**Default Method Rules:**

| Class | Override defaultGreet()? | Which version runs? |
|-------|------------------------|---------------------|
| `EnglishGreeter` | ❌ No | Interface's version → "Hello from interface!" |
| `NepaliGreeter` | ✅ Yes | Own version → "Namaskar from Nepali!" |

> `default` methods were added in Java 8 — allows adding new methods to interfaces
> without breaking all existing implementing classes!

---

### ❓ Q7 — Final Interface Challenge 🏆

**Question asked:**
> 1. What is the output?
> 2. `calculateTax()` calls `calculatePay()` inside the interface — which version runs?
> 3. How many interfaces does Manager implement?
> 4. `TAX_RATE` is accessed as `Payable.TAX_RATE` — why?

```java
interface Payable {
    double TAX_RATE = 0.1;
    double calculatePay();

    default double calculateTax() { return calculatePay() * TAX_RATE; }

    default void showPaySlip() {
        System.out.println("Gross: Rs." + calculatePay()
                + " | Tax: Rs." + calculateTax()
                + " | Net: Rs." + (calculatePay() - calculateTax()));
    }
}

interface Bonusable {
    double calculateBonus();
}

class Manager implements Payable, Bonusable {
    double baseSalary;

    Manager(double baseSalary) { this.baseSalary = baseSalary; }

    @Override
    public double calculatePay() { return baseSalary; }

    @Override
    public double calculateBonus() { return baseSalary * 0.2; }
}

public class Main {
    public static void main(String[] args) {
        Manager m = new Manager(100000);
        m.showPaySlip();
        System.out.println("Bonus: Rs." + m.calculateBonus());
        System.out.println("Tax Rate: " + Payable.TAX_RATE);
    }
}
```

**My Answer:**
```
Gross: Rs.100000.0 | Tax: Rs.10000.0 | Net: Rs.90000.0
Bonus: Rs.20000.0
Tax Rate: 0.1
```
> It depends on which object is calling — Manager implements Payable and Bonusable
> so we can access versions by object.
> Manager implements 2 interfaces.
> TAX_RATE is public static final by default — we can access but cannot change.

**Verdict: ✅ 100% Perfect!**

---

## 🔁 Extra Practice + Weak Concepts

---

### ❓ Q8 — Interface + Abstract Class Combined

**Question asked:**
> 1. What is the output?
> 2. PDF extends Document AND implements Printable — is this allowed?
> 3. `Printable p = new PDF(...)` — can we call `p.open()`?
> 4. `Document d = new PDF(...)` — can we call `d.print()`?

```java
interface Printable { void print(); }

abstract class Document {
    String title;

    Document(String title) { this.title = title; }

    abstract void open();

    void showTitle() { System.out.println("Title: " + title); }
}

class PDF extends Document implements Printable {
    PDF(String title) { super(title); }

    @Override
    public void print() { System.out.println("Printing PDF: " + title); }

    @Override
    public void open() { System.out.println("Opening PDF: " + title); }
}

public class Main {
    public static void main(String[] args) {
        PDF pdf = new PDF("Java Guide");
        pdf.showTitle();
        pdf.open();
        pdf.print();

        Printable p = new PDF("OOP Notes");
        p.print();

        Document d = new PDF("Design Patterns");
        d.open();
        d.showTitle();
        d.print();
    }
}
```

**My Answer:**
> Yes it is allowed.
> Yes we can call p.open() because PDF extends Document and it is implemented in PDF.
> Yes we can call d.print() because PDF implemented it.

**Verdict: ⚠️ Q2 right — Q3 & Q4 wrong (reference type rule)**

**Correct Output:**
```
Title: Java Guide
Opening PDF: Java Guide
Printing PDF: Java Guide
Printing PDF: OOP Notes
Opening PDF: Design Patterns
Title: Design Patterns
💥 Compile Error at d.print()!
```

**Reference Type Table:**

| Reference | Can Call | Cannot Call |
|-----------|---------|-------------|
| `PDF pdf` | `print()` ✅ `open()` ✅ `showTitle()` ✅ | nothing blocked |
| `Printable p` | `print()` ✅ | `open()` ❌ `showTitle()` ❌ |
| `Document d` | `open()` ✅ `showTitle()` ✅ | `print()` ❌ |

---

### ❓ Q9 — Default Method Conflict

**Question asked:**
> 1. What is the output?
> 2. Both A and B have the same default show() — why must C override it?
> 3. D implements A but doesn't override show() — is that valid?

```java
interface A {
    default void show() { System.out.println("A show"); }
}

interface B {
    default void show() { System.out.println("B show"); }
}

class C implements A, B {
    @Override
    public void show() { System.out.println("C show"); }
}

class D implements A { }

public class Main {
    public static void main(String[] args) {
        C c = new C();
        c.show();

        D d = new D();
        d.show();
    }
}
```

**My Answer:**
```
C show
A show
```
> C must override because if we don't, Java will be confused about which one to call.
> D is valid because interface A has a default method which doesn't need to be overridden.

**Verdict: ✅ 100% Perfect!**

**Default Method Conflict Rule:**

| Situation | Result |
|-----------|--------|
| One interface has default method | ✅ Class inherits it — no override needed |
| Two interfaces have SAME default method | ❌ Compile Error — class MUST override! |
| Class overrides conflicting default | ✅ Conflict resolved! |

---

### ❓ Q10 — instanceof + Interface Casting

**Question asked:**
> 1. What is the output?
> 2. f is declared as Flyable — why does `f instanceof Swimmable` return true?
> 3. `(Swimmable) f` — is this valid?
> 4. `(Duck) f` — what is this and why does it work?

```java
interface Flyable { void fly(); }
interface Swimmable { void swim(); }

class Duck implements Flyable, Swimmable {
    @Override
    public void fly() { System.out.println("Duck flying"); }

    @Override
    public void swim() { System.out.println("Duck swimming"); }

    public void quack() { System.out.println("Duck quacking"); }
}

public class Main {
    public static void main(String[] args) {
        Flyable f = new Duck();
        f.fly();

        if (f instanceof Swimmable) {
            Swimmable s = (Swimmable) f;
            s.swim();
        }

        if (f instanceof Duck) {
            Duck d = (Duck) f;
            d.quack();
        }
    }
}
```

**My Answer:**
```
Duck flying
Duck quacking     ← (missed Duck swimming — thought instanceof Swimmable was false)
```
> f instanceof Swimmable returns false — no object of Swimmable.
> (Duck) f is valid — checks if f is instance of Duck and it is true.

**Verdict: ⚠️ instanceof Swimmable answer wrong — actual object check missed**

**Correct Output:**
```
Duck flying
Duck swimming    ← instanceof Swimmable = true! Duck implements Swimmable!
Duck quacking
```

**instanceof Always Checks Actual Object:**

| Check | Actual Object | Result |
|-------|--------------|--------|
| `f instanceof Flyable` | Duck | ✅ true |
| `f instanceof Swimmable` | Duck | ✅ true — Duck implements Swimmable! |
| `f instanceof Duck` | Duck | ✅ true |

---

### ❓ Q11 — Full Interface Challenge 🏆

**Question asked:**
> 1. What is the output?
> 2. TwoDShape implements both interfaces but is abstract — why?
> 3. Why doesn't Circle need to implement setColor() and getColor()?
> 4. showArea() calls getArea() inside interface — which version runs?
> 5. Can we do `Shape s = new Circle(5, "Blue")`?

```java
interface Shape {
    double PI = 3.14;
    double getArea();
    default void showArea() { System.out.println("Area: " + getArea()); }
}

interface Colorable {
    void setColor(String color);
    String getColor();
}

abstract class TwoDShape implements Shape, Colorable {
    private String color;

    @Override
    public void setColor(String color) { this.color = color; }

    @Override
    public String getColor() { return color; }
}

class Circle extends TwoDShape {
    double radius;

    Circle(double radius, String color) {
        this.radius = radius;
        setColor(color);
    }

    @Override
    public double getArea() { return PI * radius * radius; }
}

public class Main {
    public static void main(String[] args) {
        Circle c = new Circle(7, "Red");
        c.showArea();
        System.out.println("Color: " + c.getColor());
        System.out.println("PI: " + Shape.PI);

        Shape s = new Circle(5, "Blue");
        s.showArea();
    }
}
```

**My Answer:**
```
Area: 153.86
Color: Red
PI: 3.14
Area: 78.5
```
> TwoDShape is abstract because abstract class can implement interface —
> and it is extended by Circle so Circle has all access of both interface methods.
> Circle doesn't need to implement setColor() and getColor() because they are
> already implemented in TwoDShape and Circle extends TwoDShape.
> It depends on which object is calling — runtime polymorphism.
> Yes we can — Shape s = new Circle() is valid because interface can be used as reference.

**Verdict: ✅ 100% Perfect!**

**Full Chain:**
```
Shape (interface)          Colorable (interface)
├── PI = 3.14              ├── setColor() → abstract
├── getArea() → abstract   └── getColor() → abstract
└── showArea() → default

TwoDShape (abstract) implements Shape, Colorable
├── getArea() → NOT implemented → still abstract!
├── setColor() → implemented ✅
└── getColor() → implemented ✅

Circle extends TwoDShape
└── getArea() → implemented ✅ → CONCRETE!
```

---

### ❓ Retry Q1 — Reference Type Limit (8 calls)

**Question asked:**
> For each method call — works or Compile Error?

```java
interface Walkable { void walk(); }
interface Talkable { void talk(); }

class Human implements Walkable, Talkable {
    public void walk() { System.out.println("Human walking"); }
    public void talk() { System.out.println("Human talking"); }
    public void think() { System.out.println("Human thinking"); }
}

public class Main {
    public static void main(String[] args) {
        Walkable w = new Human();
        Talkable t = new Human();
        Human h = new Human();
        w.walk(); w.talk(); w.think();
        t.talk(); t.walk();
        h.walk(); h.talk(); h.think();
    }
}
```

**My Answer:**

| Call | Result |
|------|--------|
| `w.walk()` | ✅ Human walking |
| `w.talk()` | 💥 Compile Error |
| `w.think()` | 💥 Compile Error |
| `t.talk()` | ✅ Human talking |
| `t.walk()` | 💥 Compile Error |
| `h.walk()` | ✅ Human walking |
| `h.talk()` | ✅ Human talking |
| `h.think()` | ✅ Human thinking |

**Verdict: ✅ 100% Perfect! Reference type rule fully locked in! 🏆**

---

### ❓ Retry Q2 — instanceof Actual Object (6 checks)

**Question asked:**
> For each instanceof — true or false and why?

```java
interface Flyable { void fly(); }
interface Swimmable { void swim(); }
interface Runnable { void run(); }

class Penguin implements Swimmable, Runnable {
    public void swim() { System.out.println("Penguin swimming"); }
    public void run() { System.out.println("Penguin running"); }
}

class Eagle implements Flyable, Swimmable {
    public void fly() { System.out.println("Eagle flying"); }
    public void swim() { System.out.println("Eagle swimming"); }
}

public class Main {
    public static void main(String[] args) {
        Swimmable s1 = new Penguin();
        Swimmable s2 = new Eagle();
        System.out.println(s1 instanceof Flyable);
        System.out.println(s1 instanceof Runnable);
        System.out.println(s1 instanceof Penguin);
        System.out.println(s2 instanceof Flyable);
        System.out.println(s2 instanceof Runnable);
        System.out.println(s2 instanceof Eagle);
    }
}
```

**My Answer:**

| Check | Actual Object | My Answer | Correct |
|-------|--------------|-----------|---------|
| `s1 instanceof Flyable` | Penguin | ❌ false | ❌ false ✅ |
| `s1 instanceof Runnable` | Penguin | ❌ false | ✅ true ← slip! |
| `s1 instanceof Penguin` | Penguin | ✅ true | ✅ true ✅ |
| `s2 instanceof Flyable` | Eagle | ✅ true | ✅ true ✅ |
| `s2 instanceof Runnable` | Eagle | ❌ false | ❌ false ✅ |
| `s2 instanceof Eagle` | Eagle | ✅ true | ✅ true ✅ |

**Verdict: ⚠️ One slip — s1 instanceof Runnable should be true (Penguin implements Runnable)**

**Golden Rule — Locked In:**
> `instanceof` ALWAYS checks the **actual object** — never the reference!
> Ask: "Does the actual object's class implement this interface?"

---

## 🏆 Topic 8 Final Scorecard — Interface

| # | Question | Concept Tested | Result |
|---|----------|---------------|--------|
| Q1 | Drawable + Circle | Basic interface + implements | ✅ Perfect |
| Q2 | Duck | Multiple interface implementation | ⚠️ Output right, reference limit wrong |
| Q3 | Constants | Interface variables — public static final | ✅ Perfect |
| Q4 | Animal array | Interface + polymorphism + array | ✅ Perfect |
| Q5 | Superman | Interface extending interface | ✅ Perfect |
| Q6 | Greetable | Default method in interface | ✅ Perfect |
| Q7 | Manager | Full interface challenge | ✅ Perfect |
| Q8 | PDF | Interface + abstract class combined | ⚠️ Q3 & Q4 reference rule wrong |
| Q9 | A, B, C, D | Default method conflict | ✅ Perfect |
| Q10 | Duck | instanceof + casting trap | ⚠️ instanceof Swimmable wrong |
| Q11 | Shape + Circle | Full combined challenge | ✅ Perfect |
| Retry Q1 | Human | Reference type limit — 8 calls | ✅ Fully Cleared! |
| Retry Q2 | Penguin + Eagle | instanceof actual object — 6 checks | ⚠️ One slip on Runnable |

---

## 💡 Key Takeaways — Interface

| Concept | Rule |
|---------|------|
| `implements` | Class must implement ALL interface methods — or Compile Error! |
| Interface variables | `public static final` by default — can read, cannot change! |
| Interface as reference | ✅ Allowed — same as abstract class reference |
| Interface as object | ❌ Never — Compile Error! |
| Multiple interfaces | ✅ A class can implement many — solves multiple inheritance! |
| Interface extends interface | ✅ Allowed — implementing class covers all methods from chain! |
| `default` method | Has a body — class inherits free or overrides! |
| Default method conflict | Two same defaults → class MUST override to resolve! |
| Reference type limit | Only what THAT interface declares — nothing more! |
| instanceof | Checks ACTUAL object — not reference type! |
| `static` variable access | Use `InterfaceName.VARIABLE` — belongs to interface! |
| Polymorphism with interface | Runtime — actual object decides which version runs! |

---

> 📝 *This README is part of a live Q&A OOP learning session.*
> *Topic 8: Interface — Fully Mastered ✅*
> *Every important concept covered, practiced, and weak areas re-drilled before moving on.*