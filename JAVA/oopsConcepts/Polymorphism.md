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
| 7 | Abstraction | 🔜 Up Next |
| 8 | Interface | ⏳ Pending |
| 9 | Abstract Class | ⏳ Pending |
| 10 | Overloading & Overriding | ⏳ Pending |
| 11 | this, super, static, final | ⏳ Pending |
| 12 | Association, Aggregation, Composition | ⏳ Pending |

---

## 📌 Topic 6: Polymorphism

### 💡 Core Concept

> **Polymorphism** means one thing — many forms.
> The same method name behaves differently depending on the object or arguments.

| Type | When Decided | How |
|------|-------------|-----|
| **Compile Time** (Static) | At compile time | Method Overloading |
| **Runtime** (Dynamic) | At runtime | Method Overriding + Parent reference |

| Concept | Summary |
|---------|---------|
| **Overloading** | Same method name, different parameters — compile time |
| **Overriding** | Child rewrites parent method — runtime |
| **Upcasting** | Child → Parent reference — automatic |
| **Downcasting** | Parent → Child reference — manual, needs `instanceof` check |
| **instanceof** | Checks if actual object is instance of a class |
| **ClassCastException** | Wrong downcast — runtime error! |
| **Field Hiding** | Fields follow reference type — NOT actual object! |
| **Dynamic Method Dispatch** | Method version decided at runtime based on actual object |

---

## 🧪 Practice Questions

---

### ❓ Q1 — Compile Time Polymorphism (Overloading)

**Question asked:**
> 1. What is the output?
> 2. Same method name `add` — how does Java know which one to call?
> 3. What is this concept called?

```java
class Calculator {
    int add(int a, int b) { return a + b; }
    int add(int a, int b, int c) { return a + b + c; }
    double add(double a, double b) { return a + b; }
}

public class Main {
    public static void main(String[] args) {
        Calculator c = new Calculator();
        System.out.println(c.add(10, 20));
        System.out.println(c.add(10, 20, 30));
        System.out.println(c.add(1.5, 2.5));
    }
}
```

**My Answer:**
```
30
60
4.0
```
> This is the concept of compile time polymorphism — parameter tracking.
> Java looks at the number and type of arguments and picks the matching method.

**Verdict: ✅ 100% Perfect!**

**Method Resolution:**
```
c.add(10, 20)      → int, int        → add(int a, int b)        ✅
c.add(10, 20, 30)  → int, int, int   → add(int a, int b, int c) ✅
c.add(1.5, 2.5)    → double, double  → add(double a, double b)  ✅
```

**Overloading Rules:**

| Can Overload By | Example |
|----------------|---------|
| Different number of params | `add(int,int)` vs `add(int,int,int)` |
| Different param types | `add(int,int)` vs `add(double,double)` |
| Different param order | `add(int,double)` vs `add(double,int)` |
| ❌ Return type alone | NOT allowed! |

---

### ❓ Q2 — Runtime Polymorphism

**Question asked:**
> 1. What is the output?
> 2. `a1` is declared as `Animal` — why does it print "Dog barks" and not "Animal makes a sound"?
> 3. When is the decision made — compile time or runtime?

```java
class Animal {
    void makeSound() { System.out.println("Animal makes a sound"); }
}

class Dog extends Animal {
    @Override
    void makeSound() { System.out.println("Dog barks"); }
}

class Cat extends Animal {
    @Override
    void makeSound() { System.out.println("Cat meows"); }
}

public class Main {
    public static void main(String[] args) {
        Animal a1 = new Dog();
        Animal a2 = new Cat();
        Animal a3 = new Animal();
        a1.makeSound();
        a2.makeSound();
        a3.makeSound();
    }
}
```

**My Answer:**
```
Dog barks
Cat meows
Animal makes a sound
```
> This is called runtime polymorphism. Reference type is Animal but object is Dog.
> Animal has makeSound() and Dog extends and overrides it.
> The decision is made at runtime.

**Verdict: ✅ 100% Perfect!**

**How Runtime Polymorphism works:**
```
Animal a1 = new Dog();
   ↑               ↑
reference type   actual object
  (Animal)          (Dog)

Compile time → checks Animal → makeSound() exists ✅
Runtime      → sees Dog object → calls Dog's makeSound() ✅
```

**Golden Rule:**
> **Reference type** decides WHAT methods you can call!
> **Object type** decides WHICH version runs!

---

### ❓ Q3 — Parent Reference Limitation

**Question asked:**
> 1. What happens when this code runs?
> 2. Why can't we call `a.bark()` even though the actual object is Dog?
> 3. How can we fix it?

```java
class Animal {
    void eat() { System.out.println("Animal eating"); }
}

class Dog extends Animal {
    @Override
    void eat() { System.out.println("Dog eating"); }
    void bark() { System.out.println("Dog barking"); }
}

public class Main {
    public static void main(String[] args) {
        Animal a = new Dog();
        a.eat();
        a.bark();
    }
}
```

**My Answer:**
> `a.bark()` causes a Compile Error — we can't access bark unless we do `Dog d = new Dog()`.

**Verdict: ✅ 100% Perfect!**

**What I Learned:**
```
Animal a = new Dog();
a.eat();   ✅ — Animal has eat() → allowed!
a.bark();  ❌ — Animal has no bark() → Compile Error!
```

**Fix:**
```java
// Option 1 — Use Dog reference directly
Dog d = new Dog();
d.bark(); ✅

// Option 2 — Downcasting
Animal a = new Dog();
((Dog) a).bark(); ✅
```

---

### ❓ Q4 — Polymorphism with Array

**Question asked:**
> 1. What is the output?
> 2. All elements are declared as `Shape` — why does each print differently?
> 3. What is the real power of polymorphism shown here?

```java
class Shape {
    void draw() { System.out.println("Drawing a shape"); }
}

class Circle extends Shape {
    @Override
    void draw() { System.out.println("Drawing a circle"); }
}

class Rectangle extends Shape {
    @Override
    void draw() { System.out.println("Drawing a rectangle"); }
}

class Triangle extends Shape {
    @Override
    void draw() { System.out.println("Drawing a triangle"); }
}

public class Main {
    public static void main(String[] args) {
        Shape[] shapes = new Shape[4];
        shapes[0] = new Circle();
        shapes[1] = new Rectangle();
        shapes[2] = new Triangle();
        shapes[3] = new Shape();

        for (Shape s : shapes) {
            s.draw();
        }
    }
}
```

**My Answer:**
```
Drawing a circle
Drawing a rectangle
Drawing a triangle
Drawing a shape
```
> They extend Shape and Shape has draw() which all override.
> shapes[0] = new Circle() means assigning a Circle object.
> The real power is that it can hold different objects.

**Verdict: ✅ 100% Perfect!**

**Real Power of Polymorphism:**
```java
// Without polymorphism — messy!
Circle[] circles = ...
Rectangle[] rects = ...

// With polymorphism — clean!
Shape[] shapes = { new Circle(), new Rectangle(), new Triangle() }
```

---

### ❓ Q5 — instanceof + Casting

**Question asked:**
> 1. What is the output?
> 2. What does `instanceof` do?
> 3. What does `(Dog) a1` do — what is this called?

```java
class Animal {
    void eat() { System.out.println("Animal eating"); }
}

class Dog extends Animal {
    @Override
    void eat() { System.out.println("Dog eating"); }
    void bark() { System.out.println("Dog barking"); }
}

class Cat extends Animal {
    @Override
    void eat() { System.out.println("Cat eating"); }
    void meow() { System.out.println("Cat meowing"); }
}

public class Main {
    public static void main(String[] args) {
        Animal a1 = new Dog();
        Animal a2 = new Cat();
        a1.eat();
        if (a1 instanceof Dog) {
            Dog d = (Dog) a1;
            d.bark();
        }
        if (a2 instanceof Dog) {
            Dog d = (Dog) a2;
            d.bark();
        }
        a2.eat();
    }
}
```

**My Answer:**
```
Dog eating
Dog barking
Cat eating
```
> `instanceof` checks if the reference type is a Dog instance or object.
> `(Dog) a1` is called casting — downcasting the object.

**Verdict: ✅ 100% Perfect!**

**Two Types of Casting:**

| Type | Direction | Automatic? | Example |
|------|-----------|-----------|---------|
| **Upcasting** | Child → Parent | ✅ Yes | `Animal a = new Dog()` |
| **Downcasting** | Parent → Child | ❌ Manual | `Dog d = (Dog) a` |

> Without `instanceof` check → wrong cast → 💥 **ClassCastException at Runtime!**

---

### ❓ Q6 — Full Polymorphism Challenge 🏆

**Question asked:**
> 1. What is the output?
> 2. `showInfo()` calls `calculateSalary()` — which version runs for each employee?
> 3. What is the real world benefit shown here?

```java
class Employee {
    String name;

    Employee(String name) { this.name = name; }

    double calculateSalary() { return 0; }

    void showInfo() {
        System.out.println(name + " earns: Rs." + calculateSalary());
    }
}

class FullTime extends Employee {
    double monthlySalary;

    FullTime(String name, double monthlySalary) {
        super(name);
        this.monthlySalary = monthlySalary;
    }

    @Override
    double calculateSalary() { return monthlySalary; }
}

class PartTime extends Employee {
    double hourlyRate;
    int hoursWorked;

    PartTime(String name, double hourlyRate, int hoursWorked) {
        super(name);
        this.hourlyRate = hourlyRate;
        this.hoursWorked = hoursWorked;
    }

    @Override
    double calculateSalary() { return hourlyRate * hoursWorked; }
}

public class Main {
    public static void main(String[] args) {
        Employee[] employees = new Employee[3];
        employees[0] = new FullTime("Alice", 80000);
        employees[1] = new PartTime("Bob", 500, 120);
        employees[2] = new FullTime("Charlie", 95000);

        for (Employee e : employees) {
            e.showInfo();
        }
    }
}
```

**My Answer:**
```
Alice earns: Rs.80000.0
Bob earns: Rs.60000.0
Charlie earns: Rs.95000.0
```
> By using runtime polymorphism we can hold different objects if they extend the same class.
> This gives us reliability and code reusability.

**Verdict: ✅ Perfect — small fix: Java prints double with .0**

**Which version runs:**

| Employee | Actual Object | calculateSalary() called |
|----------|---------------|--------------------------|
| employees[0] | FullTime | FullTime's → 80000.0 |
| employees[1] | PartTime | PartTime's → 60000.0 |
| employees[2] | FullTime | FullTime's → 95000.0 |

---

## 🔁 Extra Practice + Weak Concepts

---

### ❓ Q7 — Overloading Trap

**Question asked:**
> 1. What is the output?
> 2. `p.print(10, 3.14)` — which method gets called?
> 3. Can we overload ONLY by changing return type?

```java
class Printer {
    void print(int a) { System.out.println("int: " + a); }
    void print(double a) { System.out.println("double: " + a); }
    void print(String a) { System.out.println("String: " + a); }
    void print(int a, int b) { System.out.println("two ints: " + a + " " + b); }
}

public class Main {
    public static void main(String[] args) {
        Printer p = new Printer();
        p.print(10);
        p.print(3.14);
        p.print("Hello");
        p.print(5, 10);
        p.print(10, 3.14);
    }
}
```

**My Answer:**
```
int: 10
double: 3.14
String: Hello
two ints: 5 10
💥 Compile Error   ← (said runtime error initially)
```
> `p.print(10, 3.14)` causes a Compile Error because there is no method accepting int and double.
> We cannot overload only by changing return type — no.

**Verdict: ✅ Output & Q3 Correct — error type needed clarification**

**What I Learned:**
> No method matches `(int, double)` — Java cannot find any match → **Compile Error!**
> Return type alone cannot differentiate methods — Java cannot tell which one to call!

| Counts for Overloading | Does NOT Count |
|----------------------|----------------|
| ✅ Number of params | ❌ Return type |
| ✅ Type of params | ❌ Parameter names |
| ✅ Order of params | |

---

### ❓ Q8 — Field vs Method (Trickiest Trap!) 😈

**Question asked:**
> 1. What is the output?
> 2. Why does `a1.sound` NOT print "Woof" even though actual object is Dog?
> 3. Why does `a1.makeSound()` print "Dog barks" even though reference is Animal?

```java
class Animal {
    String sound = "Generic Sound";
    void makeSound() { System.out.println("Animal sound"); }
}

class Dog extends Animal {
    String sound = "Woof";

    @Override
    void makeSound() { System.out.println("Dog barks"); }
}

class Cat extends Animal {
    String sound = "Meow";

    @Override
    void makeSound() { System.out.println("Cat meows"); }
}

public class Main {
    public static void main(String[] args) {
        Animal a1 = new Dog();
        Animal a2 = new Cat();
        System.out.println(a1.sound);
        System.out.println(a2.sound);
        a1.makeSound();
        a2.makeSound();
    }
}
```

**My Answer (after retry):**
```
Generic Sound
Generic Sound
Dog barks
Cat meows
```
> `a1.sound` prints "Generic Sound" because fields are initialized at compile time
> and reference is Animal — so parent class sound is used.
> `a1.makeSound()` prints "Dog barks" because the object overrides the method
> and methods are initialized at runtime.

**Verdict: ✅ 100% Perfect after retry! 💪**

**Golden Rule — Most Important:**

| | Fields | Methods |
|--|--------|---------|
| Resolved at | Compile time | Runtime |
| Based on | Reference type | Actual object |
| Called | Field Hiding | Method Overriding |

> **Runtime Polymorphism only applies to METHODS — never to fields!**

---

### ❓ Q9 — ClassCastException Trap

**Question asked:**
> 1. What is the output?
> 2. `(Circle) s1` — why does this work?
> 3. `(Circle) s2` — what error, and is it compile time or runtime?

```java
class Shape {
    void draw() { System.out.println("Drawing shape"); }
}

class Circle extends Shape {
    void draw() { System.out.println("Drawing circle"); }
    void getRadius() { System.out.println("Radius: 5"); }
}

class Square extends Shape {
    void draw() { System.out.println("Drawing square"); }
    void getSide() { System.out.println("Side: 4"); }
}

public class Main {
    public static void main(String[] args) {
        Shape s1 = new Circle();
        Shape s2 = new Square();
        s1.draw();
        Circle c = (Circle) s1;
        c.getRadius();
        Circle c2 = (Circle) s2;
        c2.getRadius();
    }
}
```

**My Answer (after retry):**
```
Drawing circle
Radius: 5
💥 ClassCastException at runtime!
```
> `(Circle) s1` works because we have a Circle object — valid downcast.
> Better to check instanceof first.
> `(Circle) s2` fails at runtime because actual object is Square — cannot cast to Circle.

**Verdict: ✅ 100% Perfect after retry! 💪**

**Error Types — Locked In:**

| Situation | Error Type |
|-----------|-----------|
| Wrong cast caught by Java at compile | Compile Error |
| Wrong cast not caught until running | 💥 ClassCastException (Runtime!) |
| Always use `instanceof` before casting | ✅ Safe! |

---

### ❓ Q10 — Full Combined Trap 🏆

**Question asked:**
> 1. What is the output?
> 2. `p1.role` — which role prints and why?
> 3. `p1.introduce()` — which version runs and why?
> 4. Does the second instanceof block execute?

```java
class Person {
    String role = "Person";
    void introduce() { System.out.println("I am a person"); }
}

class Teacher extends Person {
    String role = "Teacher";

    @Override
    void introduce() { System.out.println("I am a teacher"); }
    void teach() { System.out.println("Teaching..."); }
}

class Student extends Person {
    String role = "Student";

    @Override
    void introduce() { System.out.println("I am a student"); }
    void study() { System.out.println("Studying..."); }
}

public class Main {
    public static void main(String[] args) {
        Person p1 = new Teacher();
        Person p2 = new Student();
        System.out.println(p1.role);
        System.out.println(p2.role);
        p1.introduce();
        p2.introduce();
        if (p1 instanceof Teacher) {
            Teacher t = (Teacher) p1;
            t.teach();
        }
        if (p2 instanceof Teacher) {
            Teacher t = (Teacher) p2;
            t.teach();
        }
    }
}
```

**My Answer (after retry):**
```
Person
Person
I am a teacher
I am a student
Teaching...
```
> `p1.role` prints "Person" because fields are initialized at compile time — reference type wins.
> `p1.introduce()` prints "I am a teacher" because methods are runtime — actual object wins.
> Second instanceof block: p2 is Student, not Teacher → false → block skipped!

**Verdict: ✅ 100% Perfect after retry! 💪**

**Complete Summary:**

| Line | Rule | Result |
|------|------|--------|
| `p1.role` | Field → compile time → reference | `"Person"` |
| `p2.role` | Field → compile time → reference | `"Person"` |
| `p1.introduce()` | Method → runtime → actual object | `"I am a teacher"` |
| `p2.introduce()` | Method → runtime → actual object | `"I am a student"` |
| `p1 instanceof Teacher` | actual = Teacher | `true` → executes |
| `p2 instanceof Teacher` | actual = Student | `false` → skipped |

---

## 🏆 Topic 6 Final Scorecard — Polymorphism

| # | Question | Concept Tested | Result |
|---|----------|---------------|--------|
| Q1 | Calculator | Compile time polymorphism — overloading | ✅ Perfect |
| Q2 | Animal sounds | Runtime polymorphism — overriding | ✅ Perfect |
| Q3 | Animal + Dog | Parent reference limitation | ✅ Perfect |
| Q4 | Shape array | Polymorphism with array | ✅ Perfect |
| Q5 | instanceof + casting | Downcasting + instanceof | ✅ Perfect |
| Q6 | Employee salary | Full polymorphism challenge | ✅ Perfect |
| Q7 | Overloading trap | Return type + type promotion | ⚠️ Error type clarified |
| Q8 | Field vs Method | Field hiding vs method overriding | ❌ → ✅ Cleared after retry! |
| Q9 | ClassCastException | Compile vs Runtime cast error | ⚠️ → ✅ Cleared after retry! |
| Q10 | Full combined | Fields + methods + casting together | ⚠️ → ✅ Cleared after retry! |

---

## 💡 Key Takeaways — Polymorphism

| Concept | Rule |
|---------|------|
| Method Overloading | Same name, different params — compile time decision |
| Method Overriding | Child rewrites parent — runtime decision |
| Reference type | Decides WHAT methods you can call |
| Actual object | Decides WHICH version runs |
| Fields | Always follow REFERENCE TYPE — compile time! |
| Methods | Always follow ACTUAL OBJECT — runtime! |
| Upcasting | Child → Parent — automatic, always safe |
| Downcasting | Parent → Child — manual, needs instanceof check! |
| instanceof | Checks actual object type — prevents ClassCastException |
| ClassCastException | Wrong downcast — Runtime Error! |
| Polymorphism with array | One parent array holds many child objects! |
| Return type overloading | ❌ NOT allowed — Java cannot differentiate! |

---

> 📝 *This README is part of a live Q&A OOP learning session.*
> *Topic 6: Polymorphism — Fully Mastered ✅*
> *Every important concept covered, practiced, and weak areas re-drilled before moving on.*