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
| 4 | Encapsulation | 🔜 Up Next |
| 5 | Inheritance | ⏳ Pending |
| 6 | Polymorphism | ⏳ Pending |
| 7 | Abstraction | ⏳ Pending |
| 8 | Interface | ⏳ Pending |
| 9 | Abstract Class | ⏳ Pending |
| 10 | Overloading & Overriding | ⏳ Pending |
| 11 | this, super, static, final | ⏳ Pending |
| 12 | Association, Aggregation, Composition | ⏳ Pending |

---

## 📌 Topic 3: Constructors

### 💡 Core Concept

> A **constructor** is a special method that runs **automatically** when an object is created.
> It is used to **initialize** the object's fields.

| Rule | Summary |
|------|---------|
| Same name as class | Constructor name must match class name exactly |
| No return type | Not even `void` |
| Runs automatically | Triggered by `new` keyword |
| Default constructor | Java provides one free — only when you write zero constructors |
| Removed when custom defined | The moment you write any constructor, Java removes the free default one |

---

## 🧪 Practice Questions

---

### ❓ Q1 — Default Constructor

**Question asked:**
> What will this print and why?
> Nobody called the constructor manually — how and when did it run?

```java
class Car {
    String brand;
    int speed;

    Car() {
        brand = "Toyota";
        speed = 100;
    }

    void showInfo() {
        System.out.println(brand + " : " + speed);
    }
}

public class Main {
    public static void main(String[] args) {
        Car c1 = new Car();
        Car c2 = new Car();
        c1.showInfo();
        c2.showInfo();
    }
}
```

**My Answer:**
```
Toyota : 100
Toyota : 100
```
> Because when `new` is hit, the constructor automatically initializes the fields.

**Verdict: ✅ 100% Perfect!**

**What I Learned:**
```
new Car() → constructor runs → fields initialized → object ready!
```

| | Constructor | Method |
|--|-------------|--------|
| Name | Same as class | Any name |
| Return type | None — not even void | Must have return type |
| Called | Automatically on `new` | Manually by programmer |
| Purpose | Initialize object | Perform a task |

---

### ❓ Q2 — Parameterized Constructor

**Question asked:**
> What will this print?
> This constructor takes parameters — what do we call this type of constructor?
> What is the difference between this and Q1's constructor?

```java
class Student {
    String name;
    int marks;

    Student(String n, int m) {
        name = n;
        marks = m;
    }

    void showInfo() {
        System.out.println(name + " : " + marks);
    }
}

public class Main {
    public static void main(String[] args) {
        Student s1 = new Student("Alice", 90);
        Student s2 = new Student("Bob", 75);
        s1.showInfo();
        s2.showInfo();
    }
}
```

**My Answer:**
```
Alice : 90
Bob : 75
```
> It is called a parameterized constructor.

**Verdict: ✅ 100% Perfect!**

**What I Learned:**

| Type | Example | Purpose |
|------|---------|---------|
| **Default Constructor** | `Car()` | All objects get same values |
| **Parameterized Constructor** | `Student(String n, int m)` | Each object gets custom values |

---

### ❓ Q3 — Default Constructor Removed Trap!

**Question asked:**
> This one has a trap — one of these lines will cause a problem.
> Which line is it and WHY?

```java
class Box {
    int length;
    int width;

    Box(int l, int w) {
        length = l;
        width = w;
    }
}

public class Main {
    public static void main(String[] args) {
        Box b1 = new Box(10, 5);
        Box b2 = new Box();
    }
}
```

**My Answer:**
> `b2 = new Box()` gets an error at runtime because when we define a constructor,
> it is supposed to receive values. If we try to create an object without passing
> any required values, the default constructor would run and set length=0, width=0.

**Verdict: ⚠️ Identified Correct Line — Error Type Wrong**

**What I Learned:**
> It is a **Compile Error** — NOT a Runtime Error!
> When you define a parameterized constructor, Java **removes** the automatic default constructor.
> So `new Box()` doesn't exist anymore — Java catches this before even running the program!

| Situation | Default Constructor Available? |
|-----------|-------------------------------|
| You write **no constructor** | ✅ Java gives one automatically |
| You write a **parameterized constructor** | ❌ Java removes the default one! |
| You write **both** manually | ✅ Both available |

---

### ❓ Q4 — Constructor Overloading

**Question asked:**
> 1. What is the output?
> 2. The same class has 3 constructors — what is this concept called?

```java
class Phone {
    String brand;
    int price;
    String color;

    Phone() {
        brand = "Unknown"; price = 0; color = "Black";
    }

    Phone(String b, int p) {
        brand = b; price = p; color = "Black";
    }

    Phone(String b, int p, String c) {
        brand = b; price = p; color = c;
    }

    void showInfo() {
        System.out.println(brand + " | " + price + " | " + color);
    }
}

public class Main {
    public static void main(String[] args) {
        Phone p1 = new Phone();
        Phone p2 = new Phone("Samsung", 50000);
        Phone p3 = new Phone("Apple", 120000, "White");
        p1.showInfo();
        p2.showInfo();
        p3.showInfo();
    }
}
```

**My Answer:**
```
Unknown | 0 | Black
Samsung | 50000 | Black   ← color is Black because default also runs
Apple | 120000 | White
```
> It is called constructor overloading — it is allowed.

**Verdict: ⚠️ Concept Perfect — p2 color reason wrong**

**Correct Output:**
```
Unknown | 0 | Black
Samsung | 50000 | Black
Apple | 120000 | White
```

**What I Learned:**
> Color for p2 is `"Black"` because the **2-parameter constructor** hardcodes it — NOT because the default ran!
> Only ONE constructor runs per object — Java picks the one that matches the arguments passed!

| Object | Arguments Passed | Constructor Called |
|--------|-----------------|-------------------|
| `p1` | none | `Phone()` |
| `p2` | String, int | `Phone(String, int)` |
| `p3` | String, int, String | `Phone(String, int, String)` |

---

### ❓ Q5 — Constructor Chaining with `this()`

**Question asked:**
> 1. What is the output?
> 2. What does `this()` do inside a constructor?
> 3. Which constructor actually sets the fields for `l1` and `l2`?

```java
class Laptop {
    String brand;
    int ram;
    String os;

    Laptop() {
        this("Unknown", 4, "Windows");
    }

    Laptop(String b, int r) {
        this(b, r, "Windows");
    }

    Laptop(String b, int r, String o) {
        brand = b; ram = r; os = o;
    }

    void showInfo() {
        System.out.println(brand + " | " + ram + "GB | " + os);
    }
}

public class Main {
    public static void main(String[] args) {
        Laptop l1 = new Laptop();
        Laptop l2 = new Laptop("Dell", 8);
        Laptop l3 = new Laptop("Apple", 16, "MacOS");
        l1.showInfo();
        l2.showInfo();
        l3.showInfo();
    }
}
```

**My Answer:**
```
Unknown | 4GB | Windows
Dell | 8GB | Windows
Apple | 16GB | MacOS
```
> `this` gives the context of the current class reference — we use it when we have
> the same fields and parameters to set values and remove ambiguity.
> l1 uses the default and l2 uses the 2-parameter constructor.

**Verdict: ⚠️ Output Correct — this() explanation needed correction**

**What I Learned:**

| Syntax | Purpose |
|--------|---------|
| `this.name = name` | Refers to **current object's field** |
| `this()` | **Calls another constructor** in the same class — Constructor Chaining! |

**Chain Flow:**
```
l1: Laptop() → this("Unknown",4,"Windows") → Laptop(String,int,String) ✅
l2: Laptop(String,int) → this(b,r,"Windows") → Laptop(String,int,String) ✅
l3: Laptop(String,int,String) → sets fields directly ✅
```

> The **3-parameter constructor** is the only one that actually assigns values!
> `this()` must always be the **first line** inside a constructor!

---

### ❓ Q6 — Copy Constructor

**Question asked:**
> 1. What is the output?
> 2. What is `Person(Person p)` called and what does it do?
> 3. If we change `p2.name` — does it affect `p1`? Why?

```java
class Person {
    String name;
    int age;

    Person(String n, int a) {
        name = n; age = a;
    }

    Person(Person p) {
        name = p.name;
        age = p.age;
    }

    void showInfo() {
        System.out.println(name + " : " + age);
    }
}

public class Main {
    public static void main(String[] args) {
        Person p1 = new Person("Alice", 25);
        Person p2 = new Person(p1);
        p2.name = "Bob";
        p1.showInfo();
        p2.showInfo();
    }
}
```

**My Answer (after self-correction):**
```
Alice : 25
Bob : 25
```
> When we pass the object to the constructor, it copies the values — not the address or reference.
> So changing `p2.name` only affects `p2`. They are independent objects.

**Verdict: ✅ 100% Perfect after self-correction! 💪**

**Memory Picture:**
```
p1 ───→ Object1 [ name="Alice", age=25 ]  ← untouched!
p2 ───→ Object2 [ name="Bob",   age=25 ]  ← changed independently!
```

**What I Learned:**

| Code | Type | Changes Affect Original? |
|------|------|--------------------------|
| `Person p2 = p1` | Reference Copy | ✅ Yes — same object! |
| `Person p2 = new Person(p1)` | Copy Constructor | ❌ No — new object, copied values! |

---

### ❓ Q7 — `this.` Keyword in Constructor

**Question asked:**
> 1. What is the output?
> 2. Why do we need `this.name` instead of just `name`?
> 3. What happens if we remove `this` and just write `name = name`?

```java
class Employee {
    String name;
    int salary;

    Employee(String name, int salary) {
        this.name = name;
        this.salary = salary;
    }

    void showInfo() {
        System.out.println(name + " : " + salary);
    }
}

public class Main {
    public static void main(String[] args) {
        Employee e1 = new Employee("Alice", 50000);
        Employee e2 = new Employee("Bob", 60000);
        e1.showInfo();
        e2.showInfo();
    }
}
```

**My Answer:**
```
Alice : 50000
Bob : 60000
```
> If we have the same fields and parameters, we use `this` keyword to remove ambiguity
> and improve code readability.
> Without `this` — it would be a compile error because the same field and parameter would confuse the compiler.

**Verdict: ⚠️ Output & Q2 Correct — Q3 Wrong (not compile error!)**

**What I Learned:**

| Code | What Happens |
|------|-------------|
| `this.name = name` | Field gets the parameter value ✅ |
| `name = name` | Parameter assigns to itself — field stays `null`! No error, just wrong output! ❌ |

> Java does NOT throw a compile error — it silently leaves fields uninitialized!
> Output would be `null : 0` for every object!

---

### ❓ Q8 — Method Call Inside Constructor

**Question asked:**
> 1. What is the output?
> 2. We are calling a method inside a constructor — is that allowed? When does it run?

```java
class Circle {
    double radius;
    double area;

    Circle(double radius) {
        this.radius = radius;
        this.area = calculateArea();
    }

    double calculateArea() {
        return 3.14 * radius * radius;
    }

    void showInfo() {
        System.out.println("Radius: " + radius);
        System.out.println("Area: " + area);
    }
}

public class Main {
    public static void main(String[] args) {
        Circle c1 = new Circle(7);
        Circle c2 = new Circle(5);
        c1.showInfo();
        c2.showInfo();
    }
}
```

**My Answer:**
```
Radius: 7.0
Area: 153.86
Radius: 5.0
Area: 78.5
```
> When `new Circle(7)` is hit, the constructor initializes radius first.
> Then when `this.area = calculateArea()` is reached, it calls the method,
> calculates the area, returns the double value, and control comes back to the
> constructor which sets the area field.
> Yes — calling a method inside a constructor is allowed.

**Verdict: ✅ 100% Perfect — Output and Explanation!**

**Constructor Flow:**
```
new Circle(7)
    ↓
this.radius = 7
    ↓
this.area = calculateArea() ← method called from inside constructor!
    ↓
calculateArea() runs → 3.14 × 7 × 7 = 153.86 → returns double
    ↓
this.area = 153.86
    ↓
object ready!
```

---

### ❓ Q9 — Static Field in Constructor

**Question asked:**
> 1. What is the output?
> 2. `totalObjects` is `static` — what does that mean here?
> 3. Why does every object show the same `totalObjects` value?

```java
class Counter {
    int count;
    static int totalObjects = 0;

    Counter() {
        count = 0;
        totalObjects++;
    }

    Counter(int startCount) {
        count = startCount;
        totalObjects++;
    }

    void showInfo() {
        System.out.println("Count: " + count + " | Total Objects: " + totalObjects);
    }
}

public class Main {
    public static void main(String[] args) {
        Counter c1 = new Counter();
        Counter c2 = new Counter(10);
        Counter c3 = new Counter();
        c1.showInfo();
        c2.showInfo();
        c3.showInfo();
    }
}
```

**My Answer (after tracing):**
```
Count: 0  | Total Objects: 3
Count: 10 | Total Objects: 3
Count: 0  | Total Objects: 3
```
> `totalObjects` is static — it is not associated with any object.
> It belongs to the class so all objects share the same value.
> By the time `showInfo()` runs, all 3 objects are already created — so everyone sees 3.

**Verdict: ✅ 100% Perfect after tracing! 💪**

**Timeline that matters:**
```
CREATION PHASE:
new Counter()     → totalObjects = 1
new Counter(10)   → totalObjects = 2
new Counter()     → totalObjects = 3

PRINTING PHASE:   ← happens AFTER all objects are created!
c1.showInfo()  → totalObjects = 3 ✅
c2.showInfo()  → totalObjects = 3 ✅
c3.showInfo()  → totalObjects = 3 ✅
```

**Static vs Instance field:**
```
c1 ───→ Object1 [ count=0  ] ╗
c2 ───→ Object2 [ count=10 ] ╠══→ totalObjects = 3 (shared by ALL!)
c3 ───→ Object3 [ count=0  ] ╝
```

---

### ❓ Q10 — Final Constructor Challenge 🏆

**Question asked:**
> 1. What is the output?
> 2. Which constructor does `p1` actually use to set its fields?
> 3. How many constructors are available and what type are they?

```java
class Product {
    String name;
    double price;
    int quantity;

    Product(String name, double price) {
        this(name, price, 1);
    }

    Product(String name, double price, int quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

    double getTotalValue() {
        return price * quantity;
    }

    void showInfo() {
        System.out.println(name + " | Rs." + price + " x " + quantity
                + " = Rs." + getTotalValue());
    }
}

public class Main {
    public static void main(String[] args) {
        Product p1 = new Product("Apple", 50.0);
        Product p2 = new Product("Mango", 30.0, 5);
        Product p3 = new Product("Banana", 10.0, 12);
        p1.showInfo();
        p2.showInfo();
        p3.showInfo();
    }
}
```

**My Answer:**
```
Apple  | Rs.50.0 x 1  = Rs.50.0
Mango  | Rs.30.0 x 5  = Rs.150.0
Banana | Rs.10.0 x 12 = Rs.120.0
```
> `p1` uses the 3-parameter constructor (chained via `this()`).
> There are 2 constructors total — no default constructor available because we wrote our own.
> One uses constructor chaining with `this()` and the other sets fields using `this.` keyword.

**Verdict: ✅ Concepts Perfect — Output format needed small fix**

**Constructor Flow for p1:**
```
new Product("Apple", 50.0)
        ↓
Product(String, double) → this("Apple", 50.0, 1)
        ↓
Product(String, double, int) → sets all fields!
        ↓
name="Apple", price=50.0, quantity=1
```

---

## 🔁 Weak Concept Extra Practice

---

### ❓ Extra Q1 — `this()` Chaining Deep Dive

**Question asked:**
> 1. What is the output?
> 2. Trace the exact chain for `h1`, `h2`, and `h3` step by step!
> 3. Which constructor actually sets the fields for ALL objects?

```java
class House {
    String type;
    int rooms;
    String location;
    int price;

    House() {
        this("Apartment", 2);
    }

    House(String type, int rooms) {
        this(type, rooms, "City");
    }

    House(String type, int rooms, String location) {
        this(type, rooms, location, 5000000);
    }

    House(String type, int rooms, String location, int price) {
        this.type = type;
        this.rooms = rooms;
        this.location = location;
        this.price = price;
    }

    void showInfo() {
        System.out.println(type + " | " + rooms + " rooms | " + location + " | Rs." + price);
    }
}

public class Main {
    public static void main(String[] args) {
        House h1 = new House();
        House h2 = new House("Villa", 5);
        House h3 = new House("Bungalow", 8, "Suburbs");
        House h4 = new House("Penthouse", 10, "Downtown", 50000000);
        h1.showInfo();
        h2.showInfo();
        h3.showInfo();
        h4.showInfo();
    }
}
```

**My Answer:**
```
Apartment | 2 rooms | City | Rs.5000000
Villa | 5 rooms | City | Rs.5000000
Bungalow | 8 rooms | Suburbs | Rs.5000000
Penthouse | 10 rooms | Downtown | Rs.50000000
```
> h1 chains: 0-param → 2-param → 3-param → 4-param
> h2 chains: 2-param → 3-param → 4-param
> h3 chains: 3-param → 4-param
> h4 goes directly to 4-param
> The 4-parameter constructor sets the fields for ALL objects.

**Verdict: ✅ 100% Perfect! `this()` chaining fully cleared! 🏆**

**Chain Flow:**
```
h1: House() → House(String,int) → House(String,int,String) → House(String,int,String,int) ✅
h2: House(String,int) → House(String,int,String) → House(String,int,String,int) ✅
h3: House(String,int,String) → House(String,int,String,int) ✅
h4: House(String,int,String,int) → sets fields directly ✅
```

---

### ❓ Extra Q2 — Copy Constructor vs Reference Copy

**Question asked:**
> 1. What is the output?
> 2. How many actual objects in memory?
> 3. Does changing `l2.brand` affect `l1`? Why?
> 4. Does changing `l3.ram` affect `l1`? Why?

```java
class Laptop {
    String brand;
    int ram;

    Laptop(String brand, int ram) {
        this.brand = brand;
        this.ram = ram;
    }

    Laptop(Laptop l) {
        this.brand = l.brand;
        this.ram = l.ram;
    }

    void showInfo() {
        System.out.println(brand + " | " + ram + "GB");
    }
}

public class Main {
    public static void main(String[] args) {
        Laptop l1 = new Laptop("Dell", 16);
        Laptop l2 = new Laptop(l1);
        Laptop l3 = l1;
        l2.brand = "HP";
        l3.ram = 32;
        l1.showInfo();
        l2.showInfo();
        l3.showInfo();
    }
}
```

**My Answer:**
```
Dell | 32GB
HP | 16GB
Dell | 32GB
```
> There are 2 actual objects in memory.
> Changing `l2.brand` does NOT affect `l1` because the copy constructor copies values,
> not the reference — so l2 is a completely independent object.
> Changing `l3.ram` DOES affect `l1` because `l3 = l1` assigns the reference —
> both point to the same object in heap.

**Verdict: ✅ 100% Perfect! 🏆**

**Memory Picture:**
```
l1 ──┐
     ├──→ Object1 [ brand="Dell", ram=32 ]
l3 ──┘

l2 ───→ Object2 [ brand="HP", ram=16 ]
```

---

### ❓ Extra Q3 — Static Field Timing

**Question asked:**
> 1. What is the output?
> 2. By the time `s1.showInfo()` runs — what are `totalStudents` and `totalMarks`?
> 3. Why does `s1` NOT print `totalStudents = 1` even though it was created first?

```java
class Student {
    String name;
    int marks;
    static int totalStudents = 0;
    static int totalMarks = 0;

    Student(String name, int marks) {
        this.name = name;
        this.marks = marks;
        totalStudents++;
        totalMarks += marks;
    }

    void showInfo() {
        System.out.println(name + " | " + marks + " | Total: "
                + totalStudents + " | Avg: " + (totalMarks / totalStudents));
    }
}

public class Main {
    public static void main(String[] args) {
        Student s1 = new Student("Alice", 80);
        Student s2 = new Student("Bob", 60);
        Student s3 = new Student("Charlie", 100);
        s1.showInfo();
        s2.showInfo();
        s3.showInfo();
    }
}
```

**My Answer:**
```
Alice   | 80  | Total: 3 | Avg: 80
Bob     | 60  | Total: 3 | Avg: 80
Charlie | 100 | Total: 3 | Avg: 80
```
> By the time `s1.showInfo()` runs — totalStudents = 3 and totalMarks = 240.
> s1 doesn't print 1 because static fields are associated with the class, not the object.
> All 3 objects are created before any showInfo() runs — so everyone sees 3.

**Verdict: ✅ 100% Perfect! 🏆**

---

### ❓ Extra Q4 — Default Constructor Removed

**Question asked:**
> 1. What happens when this code runs?
> 2. Which line causes the problem and what type of error?
> 3. How can you fix it WITHOUT removing the existing constructors?

```java
class Animal {
    String name;
    String sound;
    int legs;

    Animal(String name, String sound) {
        this.name = name;
        this.sound = sound;
        this.legs = 4;
    }

    Animal(String name, String sound, int legs) {
        this.name = name;
        this.sound = sound;
        this.legs = legs;
    }

    void showInfo() {
        System.out.println(name + " says " + sound + " and has " + legs + " legs");
    }
}

public class Main {
    public static void main(String[] args) {
        Animal a1 = new Animal("Dog", "Woof");
        Animal a2 = new Animal("Snake", "Hiss", 0);
        Animal a3 = new Animal();
        a1.showInfo();
        a2.showInfo();
        a3.showInfo();
    }
}
```

**My Answer:**
> Compile error at `Animal a3 = new Animal()` because there is no no-parameter constructor.
> The default constructor is not available because we defined our own constructors.
> Fix: Simply add a no-parameter constructor manually.

```java
Animal() {
    this.name = "Unknown";
    this.sound = "...";
    this.legs = 0;
}
```

**Verdict: ✅ 100% Perfect! 🏆**

---

## 🏆 Topic 3 Final Scorecard — Constructors

| # | Question | Concept Tested | Result |
|---|----------|---------------|--------|
| Q1 | Car | Default constructor | ✅ Perfect |
| Q2 | Student | Parameterized constructor | ✅ Perfect |
| Q3 | Box | Default constructor removed | ⚠️ Line correct, error type wrong |
| Q4 | Phone | Constructor overloading | ⚠️ Concept right, p2 color reason wrong |
| Q5 | Laptop | Constructor chaining with `this()` | ⚠️ Output correct, this() confused with this. |
| Q6 | Person | Copy constructor | ✅ Self-corrected! 💪 |
| Q7 | Employee | `this.` keyword | ⚠️ Q2 right, Q3 said compile error |
| Q8 | Circle | Method call inside constructor | ✅ Perfect |
| Q9 | Counter | Static field in constructor | ✅ Perfect after tracing |
| Q10 | Product | Full constructor challenge | ✅ Perfect |
| Extra Q1 | House | `this()` chaining deep dive | ✅ Fully cleared! |
| Extra Q2 | Laptop | Copy vs reference | ✅ Perfect |
| Extra Q3 | Student | Static timing | ✅ Perfect |
| Extra Q4 | Animal | Default constructor removed | ✅ Perfect |

---

## 💡 Key Takeaways — Constructors

| Concept | Rule |
|---------|------|
| Default Constructor | Java gives one free — only when you write zero constructors |
| Parameterized Constructor | Takes arguments — each object gets custom values |
| Constructor Removed | Write any constructor → Java removes the free default one! |
| Constructor Overloading | Multiple constructors with different parameters — allowed! |
| `this()` | Calls another constructor in same class — must be FIRST line! |
| `this.` | Refers to current object's field — removes ambiguity |
| Copy Constructor | `Person(Person p)` — copies values, creates new independent object |
| Method in Constructor | Allowed — runs normally, returns value to constructor |
| Static field | Belongs to class — shared by ALL objects — timing matters! |
| `name = name` without `this` | No error — but field stays null silently! |

---

> 📝 *This README is part of a live Q&A OOP learning session.*
> *Topic 3: Constructors — Fully Mastered ✅*
> *Every important concept covered, practiced, and weak areas re-drilled before moving on.*