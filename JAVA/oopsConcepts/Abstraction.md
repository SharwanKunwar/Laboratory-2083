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
| 8 | Interface | 🔜 Up Next |
| 9 | Abstract Class | ⏳ Pending |
| 10 | Overloading & Overriding | ⏳ Pending |
| 11 | this, super, static, final | ⏳ Pending |
| 12 | Association, Aggregation, Composition | ⏳ Pending |

---

## 📌 Topic 7: Abstraction

### 💡 Core Concept

> **Abstraction** means hiding the implementation details and showing only essential features.
> You define WHAT to do — but not HOW to do it.
> In Java, abstraction is achieved using **Abstract Classes** and **Interfaces**.

| Rule | Detail |
|------|--------|
| `abstract class` | Cannot be instantiated — no `new AbstractClass()`! |
| `abstract method` | No body — just declaration! Child MUST implement it! |
| Can have both | Abstract AND normal methods together |
| Can have constructor | Yes — called by child via `super()` |
| Child must implement | All abstract methods — or child becomes abstract too! |
| Abstract as reference | ✅ `Shape s = new Circle()` — allowed! |
| Abstract as object | ❌ `new Shape()` — never allowed! |

---

## 🧪 Practice Questions

---

### ❓ Q1 — Abstract Class Basics

**Question asked:**
> What will this print and why?
> Notice: `Shape` has an abstract method `getArea()` with no body!
> `Circle` provides the body. `Shape` also has a normal method `showColor()`.

```java
abstract class Shape {
    String color;

    Shape(String color) { this.color = color; }

    abstract double getArea();

    void showColor() {
        System.out.println("Color: " + color);
    }
}

class Circle extends Shape {
    double radius;

    Circle(String color, double radius) {
        super(color);
        this.radius = radius;
    }

    @Override
    double getArea() { return 3.14 * radius * radius; }
}

public class Main {
    public static void main(String[] args) {
        Circle c = new Circle("Red", 7);
        c.showColor();
        System.out.println("Area: " + c.getArea());
    }
}
```

**My Answer:**
```
Color: Red
Area: 153.86
```

**Verdict: ✅ 100% Perfect!**

**What I Learned:**
```
Shape (abstract)
├── abstract getArea()   ← no body — Circle MUST implement!
└── showColor()          ← normal method — Circle inherits free!

Circle extends Shape
└── getArea() → 3.14 × 7 × 7 = 153.86 ✅
```

---

### ❓ Q2 — Cannot Instantiate Abstract Class

**Question asked:**
> What goes wrong here?
> What type of error — and why can't we create an Animal object?

```java
abstract class Animal {
    abstract void makeSound();

    void breathe() {
        System.out.println("Breathing...");
    }
}

public class Main {
    public static void main(String[] args) {
        Animal a = new Animal();
        a.makeSound();
        a.breathe();
    }
}
```

**My Answer:**
> We are making an object of an abstract class — that is not allowed.
> It is a compile time error.

**Verdict: ✅ 100% Perfect!**

**What I Learned:**
```
abstract class Animal {
    abstract void makeSound(); // ← no body! incomplete!
}

Animal a = new Animal(); // 💥 Compile Error!
// Java says: "Animal is abstract — cannot be instantiated!"
```

> Abstract class = **incomplete blueprint**
> You can't build from an incomplete blueprint — complete it first by extending!

---

### ❓ Q3 — Child Must Implement ALL Abstract Methods

**Question asked:**
> 1. What happens when this code compiles?
> 2. How can you fix it without making Car abstract?

```java
abstract class Vehicle {
    abstract void start();
    abstract void stop();

    void fuel() { System.out.println("Filling fuel"); }
}

class Car extends Vehicle {
    @Override
    void start() { System.out.println("Car started"); }
}

public class Main {
    public static void main(String[] args) {
        Car c = new Car();
        c.start();
        c.fuel();
    }
}
```

**My Answer:**
> This code will not run because when a child class extends an abstract class,
> the child has to override and write its own definition for all abstract methods.
> We made a Car object which is fine, but we did not implement stop() — so it fails.
> Fix: Simply add the stop() implementation to Car.

**Verdict: ✅ 100% Perfect!**

**Fix:**
```java
class Car extends Vehicle {
    @Override
    void start() { System.out.println("Car started"); }

    @Override
    void stop() { System.out.println("Car stopped"); } // ← add this!
}
```

**The Rule:**
> Child MUST implement ALL abstract methods from parent!
> Missing even ONE → Compile Error! 🚫

---

### ❓ Q4 — Abstract Class with Constructor

**Question asked:**
> 1. What is the output?
> 2. Abstract class has a constructor — but abstract class can't be instantiated. Why?
> 3. When does the abstract class constructor run?

```java
abstract class Animal {
    String name;

    Animal(String name) {
        this.name = name;
        System.out.println("Animal constructor: " + name);
    }

    abstract void makeSound();

    void showName() { System.out.println("Name: " + name); }
}

class Dog extends Animal {
    Dog(String name) {
        super(name);
        System.out.println("Dog constructor: " + name);
    }

    @Override
    void makeSound() { System.out.println(name + " says Woof!"); }
}

public class Main {
    public static void main(String[] args) {
        Dog d = new Dog("Bruno");
        d.showName();
        d.makeSound();
    }
}
```

**My Answer:**
```
Animal constructor: Bruno
Dog constructor: Bruno    ← (missed this line initially)
Name: Bruno
Bruno says Woof!
```
> When `Dog d = new Dog("Bruno")` is instantiated, the parent constructor
> runs first and prints "Animal constructor: Bruno".

**Verdict: ✅ Perfect — missed Dog constructor line initially**

**What I Learned:**
> Abstract class cannot be instantiated directly — `new Animal()` is blocked! ✅
> BUT its constructor runs indirectly when child calls `super()`!
> Used to initialize common fields for all children! 🎯

```
new Dog("Bruno")
      ↓
Dog constructor starts
      ↓
super("Bruno") → Animal constructor runs → name = "Bruno"
      ↓
Dog constructor continues
      ↓
object ready!
```

---

### ❓ Q5 — Abstract Class + Polymorphism + Array

**Question asked:**
> 1. What is the output?
> 2. `showInfo()` calls `getArea()` — which version runs for each shape?
> 3. Can we store Circle and Rectangle in Shape[] even though Shape is abstract?

```java
abstract class Shape {
    String color;

    Shape(String color) { this.color = color; }

    abstract double getArea();

    void showInfo() {
        System.out.println("Color: " + color + " | Area: " + getArea());
    }
}

class Circle extends Shape {
    double radius;

    Circle(String color, double radius) {
        super(color);
        this.radius = radius;
    }

    @Override
    double getArea() { return 3.14 * radius * radius; }
}

class Rectangle extends Shape {
    double length, width;

    Rectangle(String color, double length, double width) {
        super(color);
        this.length = length;
        this.width = width;
    }

    @Override
    double getArea() { return length * width; }
}

public class Main {
    public static void main(String[] args) {
        Shape[] shapes = new Shape[3];
        shapes[0] = new Circle("Red", 7);
        shapes[1] = new Rectangle("Blue", 10, 5);
        shapes[2] = new Circle("Green", 3);

        for (Shape s : shapes) {
            s.showInfo();
        }
    }
}
```

**My Answer:**
```
Color: Red | Area: 153.86
Color: Blue | Area: 50.0
Color: Green | Area: 28.26
```
> It depends on which object is calling — runtime polymorphism.
> I thought we couldn't store in Shape[] because Shape is abstract.

**Verdict: ⚠️ Output Correct — Q3 needed correction**

**What I Learned:**

| Action | Allowed? |
|--------|---------|
| `new Shape()` | ❌ Cannot instantiate abstract class! |
| `Shape s = new Circle()` | ✅ Reference type can be abstract! |
| `Shape[] shapes` | ✅ Array of abstract type — perfectly fine! |

> Abstract class as a **reference type** = ✅ Always allowed!
> Abstract class as an **object** = ❌ Never allowed!

---

### ❓ Q6 — Full Abstraction Challenge 🏆

**Question asked:**
> 1. What is the output?
> 2. How many abstract methods does Employee have?
> 3. Which versions of `getRole()` and `calculateSalary()` run?
> 4. Why is Employee abstract and not a regular class?

```java
abstract class Employee {
    private String name;
    private int id;

    Employee(String name, int id) {
        this.name = name;
        this.id = id;
    }

    public String getName() { return name; }
    public int getId() { return id; }

    abstract double calculateSalary();
    abstract String getRole();

    void showInfo() {
        System.out.println("ID: " + id + " | Name: " + name
                + " | Role: " + getRole()
                + " | Salary: Rs." + calculateSalary());
    }
}

class Manager extends Employee {
    double fixedSalary, bonus;

    Manager(String name, int id, double fixedSalary, double bonus) {
        super(name, id);
        this.fixedSalary = fixedSalary;
        this.bonus = bonus;
    }

    @Override
    double calculateSalary() { return fixedSalary + bonus; }

    @Override
    String getRole() { return "Manager"; }
}

class Intern extends Employee {
    double stipend;

    Intern(String name, int id, double stipend) {
        super(name, id);
        this.stipend = stipend;
    }

    @Override
    double calculateSalary() { return stipend; }

    @Override
    String getRole() { return "Intern"; }
}

public class Main {
    public static void main(String[] args) {
        Employee[] employees = new Employee[3];
        employees[0] = new Manager("Alice", 101, 80000, 20000);
        employees[1] = new Intern("Bob", 102, 15000);
        employees[2] = new Manager("Charlie", 103, 90000, 30000);

        for (Employee e : employees) {
            e.showInfo();
        }
    }
}
```

**My Answer:**
```
ID: 101 | Name: Alice   | Role: Manager | Salary: Rs.100000.0
ID: 102 | Name: Bob     | Role: Intern  | Salary: Rs.15000.0
ID: 103 | Name: Charlie | Role: Manager | Salary: Rs.120000.0
```
> 2 abstract methods: calculateSalary() and getRole().
> It depends on which object is calling — runtime polymorphism.
> Employee is abstract for hiding internal details — each employee type
> calculates salary differently so there is no single correct implementation.

**Verdict: ✅ 100% Perfect!**

---

### ❓ Q7 — Abstract Chain Trap

**Question asked:**
> 1. What is the output?
> 2. B extends A but only implements methodA() — why is B still valid?
> 3. C extends B but only implements methodB() — why is C valid?
> 4. What if C didn't implement methodB()?

```java
abstract class A {
    abstract void methodA();
    abstract void methodB();
}

abstract class B extends A {
    @Override
    void methodA() { System.out.println("B implements methodA"); }
}

class C extends B {
    @Override
    void methodB() { System.out.println("C implements methodB"); }
}

public class Main {
    public static void main(String[] args) {
        C obj = new C();
        obj.methodA();
        obj.methodB();
    }
}
```

**My Answer:**
```
B implements methodA
C implements methodB
```
> B is valid because abstract class can have abstract and non-abstract methods.
> C is valid because methodA is implemented in B and C has access to it,
> and methodB is implemented in C — all covered.
> If C didn't implement methodB() it would get an error.

**Verdict: ✅ 100% Perfect!**

**Abstract Chain:**
```
A (abstract)
├── methodA() → abstract
└── methodB() → abstract

B (abstract) extends A
├── methodA() → implemented ✅
└── methodB() → still abstract — passed to children!

C extends B
├── methodA() → inherited from B ✅
└── methodB() → implemented ✅ — all covered! CONCRETE ✅
```

---

### ❓ Q8 — Abstract + Encapsulation + Polymorphism

**Question asked:**
> 1. What is the output?
> 2. Why is balance private and accessed through getBalance() in child?
> 3. Why is setBalance() protected and not public?
> 4. What are the two abstract methods and why are they abstract?

```java
abstract class BankAccount {
    private String owner;
    private double balance;

    BankAccount(String owner, double balance) {
        this.owner = owner;
        this.balance = balance;
    }

    public String getOwner() { return owner; }
    public double getBalance() { return balance; }

    protected void setBalance(double balance) { this.balance = balance; }

    abstract double calculateInterest();
    abstract String getAccountType();

    void showInfo() {
        System.out.println(getAccountType() + " | " + owner
                + " | Balance: Rs." + balance
                + " | Interest: Rs." + calculateInterest());
    }
}

class SavingsAccount extends BankAccount {
    double interestRate;

    SavingsAccount(String owner, double balance, double interestRate) {
        super(owner, balance);
        this.interestRate = interestRate;
    }

    @Override
    double calculateInterest() { return getBalance() * interestRate / 100; }

    @Override
    String getAccountType() { return "Savings"; }
}

class CurrentAccount extends BankAccount {
    double fixedInterest;

    CurrentAccount(String owner, double balance, double fixedInterest) {
        super(owner, balance);
        this.fixedInterest = fixedInterest;
    }

    @Override
    double calculateInterest() { return fixedInterest; }

    @Override
    String getAccountType() { return "Current"; }
}

public class Main {
    public static void main(String[] args) {
        BankAccount[] accounts = new BankAccount[3];
        accounts[0] = new SavingsAccount("Alice", 100000, 5);
        accounts[1] = new CurrentAccount("Bob", 200000, 1000);
        accounts[2] = new SavingsAccount("Charlie", 50000, 3);

        for (BankAccount acc : accounts) {
            acc.showInfo();
        }
    }
}
```

**My Answer:**
```
Savings | Alice   | Balance: Rs.100000.0 | Interest: Rs.5000.0
Current | Bob     | Balance: Rs.200000.0 | Interest: Rs.1000.0
Savings | Charlie | Balance: Rs.50000.0  | Interest: Rs.1500.0
```
> Balance is private — child accesses it through getBalance() — encapsulation.
> setBalance() is protected so only children and same package can modify it —
> public would allow anyone to change balance which is unsafe.
> calculateInterest() and getAccountType() are abstract because every account type
> calculates interest differently and has its own name — children must provide their own version.

**Verdict: ✅ 100% Perfect!**

**All Three Concepts Together:**
```
BankAccount (abstract + encapsulation)
├── private balance    ← hidden — encapsulation!
├── getBalance()       ← controlled read access
├── setBalance()       ← protected — children only!
├── calculateInterest() ← abstract — each child decides!
└── getAccountType()   ← abstract — each child decides!
```

---

### ❓ Q9 — Ultimate Abstraction Trap 💀

**Question asked:**
> 1. What is the output?
> 2. Why is Triangle abstract even though it extends Shape?
> 3. How does RightTriangle become concrete?
> 4. How many levels of abstraction are there?
> 5. Draw the full inheritance chain!

```java
abstract class Shape {
    abstract double getArea();
    abstract double getPerimeter();

    void showInfo() {
        System.out.println("Area: " + getArea()
                + " | Perimeter: " + getPerimeter());
    }
}

class Square extends Shape {
    double side;

    Square(double side) { this.side = side; }

    @Override
    double getArea() { return side * side; }

    @Override
    double getPerimeter() { return 4 * side; }
}

abstract class Triangle extends Shape {
    double base, height;

    Triangle(double base, double height) {
        this.base = base;
        this.height = height;
    }

    @Override
    double getArea() { return 0.5 * base * height; }
}

class RightTriangle extends Triangle {
    double hypotenuse;

    RightTriangle(double base, double height, double hypotenuse) {
        super(base, height);
        this.hypotenuse = hypotenuse;
    }

    @Override
    double getPerimeter() { return base + height + hypotenuse; }
}

public class Main {
    public static void main(String[] args) {
        Shape s1 = new Square(5);
        Shape s2 = new RightTriangle(3, 4, 5);
        s1.showInfo();
        s2.showInfo();
    }
}
```

**My Answer:**
```
Area: 25.0 | Perimeter: 20.0
Area: 6.0  | Perimeter: 12.0
```
> Triangle is abstract because we have to implement getPerimeter() — it hasn't done it.
> RightTriangle extends Triangle which already implements getArea() —
> and RightTriangle implements getPerimeter() — all covered — concrete!
> Two levels of abstraction.
> Chain: Square extends Shape | Triangle extends Shape | RightTriangle extends Triangle.

**Verdict: ✅ 100% Perfect!**

**Full Abstraction Chain:**
```
Shape (abstract)
├── getArea()       → abstract
└── getPerimeter()  → abstract

Square extends Shape          → CONCRETE ✅
├── getArea()       → implemented ✅
└── getPerimeter()  → implemented ✅

Triangle extends Shape        → STILL ABSTRACT ⚠️
├── getArea()       → implemented ✅
└── getPerimeter()  → still abstract!

RightTriangle extends Triangle → CONCRETE ✅
├── getArea()       → inherited from Triangle ✅
└── getPerimeter()  → implemented ✅
```

---

## 🏆 Topic 7 Final Scorecard — Abstraction

| # | Question | Concept Tested | Result |
|---|----------|---------------|--------|
| Q1 | Shape + Circle | Abstract class basics | ✅ Perfect |
| Q2 | Animal | Cannot instantiate abstract class | ✅ Perfect |
| Q3 | Vehicle + Car | Child must implement all abstract methods | ✅ Perfect |
| Q4 | Animal + Dog | Abstract class with constructor | ✅ Perfect |
| Q5 | Shape array | Abstract + polymorphism + array | ⚠️ Output right, Q3 needed fix |
| Q6 | Employee | Full abstraction challenge | ✅ Perfect |
| Q7 | A, B, C chain | Abstract chain trap | ✅ Perfect |
| Q8 | BankAccount | Abstract + encapsulation + polymorphism | ✅ Perfect |
| Q9 | Shape + Triangle | Ultimate abstraction trap | ✅ Perfect |

---

## 💡 Key Takeaways — Abstraction

| Concept | Rule |
|---------|------|
| `abstract class` | Cannot be instantiated — `new AbstractClass()` is Compile Error! |
| `abstract method` | No body — child MUST implement or become abstract too! |
| Normal method in abstract | Allowed — children inherit it for free! |
| Constructor in abstract | Allowed — runs via `super()` from child! |
| Abstract as reference | ✅ `Shape s = new Circle()` — always allowed! |
| Abstract as object | ❌ `new Shape()` — never allowed! |
| Abstract chain | Abstract class can partially implement — pass rest to children! |
| Missing implementation | Even ONE unimplemented abstract method = Compile Error! |
| Abstraction + Polymorphism | One abstract array holds many concrete objects! |
| Why abstract? | When no single correct implementation exists — force children to decide! |

---

> 📝 *This README is part of a live Q&A OOP learning session.*
> *Topic 7: Abstraction — Fully Mastered ✅*
> *Every important concept covered, practiced, and weak areas re-drilled before moving on.*