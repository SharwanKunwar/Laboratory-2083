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
| 6 | Polymorphism | 🔜 Up Next |
| 7 | Abstraction | ⏳ Pending |
| 8 | Interface | ⏳ Pending |
| 9 | Abstract Class | ⏳ Pending |
| 10 | Overloading & Overriding | ⏳ Pending |
| 11 | this, super, static, final | ⏳ Pending |
| 12 | Association, Aggregation, Composition | ⏳ Pending |

---

## 📌 Topic 5: Inheritance

### 💡 Core Concept

> **Inheritance** means one class acquires the properties and methods of another class.
> The class that gives is called the **Parent (Super) class**.
> The class that receives is called the **Child (Sub) class**.
> In Java we use the `extends` keyword.

| Concept | Summary |
|---------|---------|
| `extends` | Child class inherits from parent class |
| `super()` | Calls the parent constructor — must be first line! |
| `super.method()` | Calls the parent's version of a method |
| `protected` | Accessible in same package OR child class anywhere |
| `@Override` | Annotation — marks intentional method overriding |
| `final class` | Cannot be extended — no child classes allowed! |
| `final method` | Can be inherited but cannot be overridden! |

---

## 🧪 Practice Questions

---

### ❓ Q1 — Basic Inheritance

**Question asked:**
> What will this print and why?
> `Dog` never defined `name` or `eat()` — so how can `d.name` and `d.eat()` work?

```java
class Animal {
    String name = "Animal";

    void eat() {
        System.out.println("Animal is eating");
    }
}

class Dog extends Animal {
    String breed = "Labrador";

    void bark() {
        System.out.println("Dog is barking");
    }
}

public class Main {
    public static void main(String[] args) {
        Dog d = new Dog();
        System.out.println(d.name);
        System.out.println(d.breed);
        d.eat();
        d.bark();
    }
}
```

**My Answer:**
```
Animal
Labrador
Animal is eating
Dog is barking
```
> It is called inheritance. Dog class extends Animal so it can use
> the fields and methods of the parent class.

**Verdict: ✅ 100% Perfect!**

**What Dog inherited:**
```
Dog object contains:
├── From Animal (inherited) → name, eat()
└── From Dog (own)          → breed, bark()
```

---

### ❓ Q2 — Inheritance + Constructor + super()

**Question asked:**
> 1. What is the output?
> 2. What does `super(brand, speed)` do?
> 3. Which constructor runs first — parent or child?

```java
class Vehicle {
    String brand;
    int speed;

    Vehicle(String brand, int speed) {
        this.brand = brand;
        this.speed = speed;
        System.out.println("Vehicle constructor called!");
    }
}

class Car extends Vehicle {
    int doors;

    Car(String brand, int speed, int doors) {
        super(brand, speed);
        this.doors = doors;
        System.out.println("Car constructor called!");
    }

    void showInfo() {
        System.out.println(brand + " | " + speed + "kmh | " + doors + " doors");
    }
}

public class Main {
    public static void main(String[] args) {
        Car c = new Car("Toyota", 180, 4);
        c.showInfo();
    }
}
```

**My Answer:**
```
Vehicle constructor called!
Car constructor called!
Toyota | 180kmh | 4 doors
```
> When `new Car()` is created, the Vehicle constructor is executed first.
> `super()` calls the parent constructor.
> Parent constructor always runs first.

**Verdict: ✅ 100% Perfect!**

**Constructor Flow:**
```
new Car("Toyota", 180, 4)
        ↓
Car constructor starts
        ↓
super(brand, speed) → Vehicle constructor runs FIRST ✅
        ↓
Vehicle constructor finishes
        ↓
Car constructor continues → this.doors = 4
        ↓
object ready!
```

---

### ❓ Q3 — Multilevel Inheritance

**Question asked:**
> 1. What is the output?
> 2. `C` never extended `A` directly — so how can `obj.methodA()` work?
> 3. What type of inheritance is this called?

```java
class A {
    void methodA() { System.out.println("Class A"); }
}

class B extends A {
    void methodB() { System.out.println("Class B"); }
}

class C extends B {
    void methodC() { System.out.println("Class C"); }
}

public class Main {
    public static void main(String[] args) {
        C obj = new C();
        obj.methodA();
        obj.methodB();
        obj.methodC();
    }
}
```

**My Answer:**
```
Class A
Class B
Class C
```
> C extends B and B extends A — so C can access both A and B.
> This is multilevel inheritance.

**Verdict: ✅ 100% Perfect!**

**Inheritance Chain:**
```
A
└── B extends A
    └── C extends B
```

**Types of Inheritance in Java:**

| Type | Description | Allowed? |
|------|-------------|---------|
| **Single** | One child, one parent | ✅ |
| **Multilevel** | Chain — A→B→C | ✅ |
| **Hierarchical** | Multiple children, one parent | ✅ |
| **Multiple** | One child, multiple parents | ❌ Not in Java! |

---

### ❓ Q4 — Hierarchical Inheritance

**Question asked:**
> 1. What is the output?
> 2. `Circle` and `Rectangle` both have `draw()` — which one runs?
> 3. `Triangle` has no `draw()` — where does it get it from?

```java
class Shape {
    String color = "Red";

    void draw() { System.out.println("Drawing a shape"); }
}

class Circle extends Shape {
    void draw() { System.out.println("Drawing a circle"); }
}

class Rectangle extends Shape {
    void draw() { System.out.println("Drawing a rectangle"); }
}

class Triangle extends Shape {
    // no draw() method
}

public class Main {
    public static void main(String[] args) {
        Circle c = new Circle();
        Rectangle r = new Rectangle();
        Triangle t = new Triangle();
        c.draw();
        r.draw();
        t.draw();
        System.out.println(c.color);
        System.out.println(r.color);
        System.out.println(t.color);
    }
}
```

**My Answer:**
```
Drawing a circle
Drawing a rectangle
Drawing a shape
Red
Red
Red
```
> It depends on which object is calling. Circle and Rectangle override the draw() method
> and this is runtime polymorphism. Triangle gets draw() from the parent class.

**Verdict: ✅ 100% Perfect — even connected to Runtime Polymorphism! 🔥**

**Hierarchical Structure:**
```
Shape
├── Circle    → has own draw()  → uses own!
├── Rectangle → has own draw()  → uses own!
└── Triangle  → no draw()       → uses Shape's!
```

---

### ❓ Q5 — super. Keyword (Parent Method Call)

**Question asked:**
> 1. What is the output?
> 2. What does `super.showInfo()` do inside Employee's `showInfo()`?
> 3. Why don't we rewrite `name` and `age` printing in Employee's `showInfo()`?

```java
class Person {
    String name;
    int age;

    Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    void showInfo() {
        System.out.println("Name: " + name + " | Age: " + age);
    }
}

class Employee extends Person {
    String company;
    int salary;

    Employee(String name, int age, String company, int salary) {
        super(name, age);
        this.company = company;
        this.salary = salary;
    }

    void showInfo() {
        super.showInfo();
        System.out.println("Company: " + company + " | Salary: " + salary);
    }
}

public class Main {
    public static void main(String[] args) {
        Employee e = new Employee("Alice", 30, "Google", 100000);
        e.showInfo();
    }
}
```

**My Answer:**
```
Name: Alice | Age: 30
Company: Google | Salary: 100000
```
> `super.showInfo()` calls the parent class method showInfo() first,
> and then continues in Employee's showInfo().
> We don't rewrite it because we are extending Person — we already have
> access to name and age so there is no need to repeat the code.

**Verdict: ✅ 100% Perfect!**

**Two uses of super — locked in:**

| Syntax | Purpose |
|--------|---------|
| `super(name, age)` | Calls **parent constructor** |
| `super.showInfo()` | Calls **parent method** |

**Execution Flow:**
```
e.showInfo() called
        ↓
Employee's showInfo() starts
        ↓
super.showInfo() → Person's showInfo() → prints Name & Age
        ↓
back to Employee's showInfo() → prints Company & Salary
```

---

### ❓ Q6 — Inheritance + Encapsulation

**Question asked:**
> 1. What is the output?
> 2. Can `Dog` access `name` directly — why or why not?
> 3. How does Dog print `name` and `age` if they are private in Animal?

```java
class Animal {
    private String name;
    private int age;

    Animal(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() { return name; }
    public int getAge() { return age; }

    public void showInfo() {
        System.out.println("Name: " + name + " | Age: " + age);
    }
}

class Dog extends Animal {
    private String breed;

    Dog(String name, int age, String breed) {
        super(name, age);
        this.breed = breed;
    }

    public String getBreed() { return breed; }

    public void showInfo() {
        super.showInfo();
        System.out.println("Breed: " + breed);
    }
}

public class Main {
    public static void main(String[] args) {
        Dog d = new Dog("Bruno", 3, "Labrador");
        d.showInfo();
        System.out.println(d.getName());
        System.out.println(d.getAge());
        System.out.println(d.name);
    }
}
```

**My Answer:**
```
Name: Bruno | Age: 3
Breed: Labrador
Bruno
3
💥 Compile Error — name is private in Animal!
```
> Dog cannot access `name` directly because it is private in Animal.
> Private means same class only — not even child classes!
> Dog can print name and age through `super.showInfo()` because
> Animal's own method can access its own private fields freely.
> Animal provides getters for controlled access.

**Verdict: ✅ 100% Perfect!**

**Access Level Table:**

| Modifier | Same Class | Child Class | Outside |
|----------|-----------|-------------|---------|
| `private` | ✅ | ❌ | ❌ |
| `protected` | ✅ | ✅ | ❌ |
| `public` | ✅ | ✅ | ✅ |

---

### ❓ Q7 — protected Keyword

**Question asked:**
> 1. What is the output?
> 2. Why can `Bike` access `brand` directly — even without a getter?
> 3. Can we access `b.brand` from `Main`?

```java
class Vehicle {
    protected String brand;
    protected int speed;

    Vehicle(String brand, int speed) {
        this.brand = brand;
        this.speed = speed;
    }

    protected void showInfo() {
        System.out.println(brand + " | " + speed + "kmh");
    }
}

class Bike extends Vehicle {
    private int wheels;

    Bike(String brand, int speed, int wheels) {
        super(brand, speed);
        this.wheels = wheels;
    }

    void showInfo() {
        System.out.println(brand + " | " + speed + "kmh | " + wheels + " wheels");
    }
}

public class Main {
    public static void main(String[] args) {
        Bike b = new Bike("Honda", 120, 2);
        b.showInfo();
        System.out.println(b.brand);
    }
}
```

**My Answer:**
```
Honda | 120kmh | 2 wheels
Honda
```
> Bike can access brand because the access modifier is protected —
> it is accessible within the same package, not from outside the package.
> Yes it is accessible because it is protected and Main is in the same package.

**Verdict: ✅ Correct — right answer, slightly incomplete reason**

**Complete protected Rule:**

| Accessing From | Same Package | Different Package |
|---------------|-------------|-------------------|
| Same class | ✅ Yes | — |
| Child class | ✅ Yes | ✅ Yes (must extend!) |
| Unrelated class | ✅ Yes | ❌ No — Compile Error! |

> `protected` = **same package** OR **child class anywhere**
> Unrelated class in different package = ❌ always blocked!

---

### ❓ Q8 — Full Inheritance Challenge 🏆

**Question asked:**
> 1. What is the output?
> 2. What type of inheritance is this?
> 3. How many levels deep is the inheritance chain?
> 4. Draw the inheritance chain — who inherits from who?

```java
class LivingThing {
    void breathe() { System.out.println("Breathing..."); }
}

class Animal extends LivingThing {
    String name;

    Animal(String name) { this.name = name; }

    void eat() { System.out.println(name + " is eating"); }
}

class Dog extends Animal {
    String breed;

    Dog(String name, String breed) {
        super(name);
        this.breed = breed;
    }

    void bark() { System.out.println(name + " is barking"); }

    void showInfo() {
        System.out.println("Name: " + name + " | Breed: " + breed);
    }
}

public class Main {
    public static void main(String[] args) {
        Dog d = new Dog("Bruno", "Labrador");
        d.breathe();
        d.eat();
        d.bark();
        d.showInfo();
    }
}
```

**My Answer:**
```
Breathing...
Bruno is eating
Bruno is barking
Name: Bruno | Breed: Labrador
```
> This is multilevel inheritance — 3 levels deep.
> Dog inherits Animal and Animal inherits LivingThing.

**Verdict: ✅ 100% Perfect!**

**Inheritance Chain:**
```
LivingThing
    └── Animal extends LivingThing
            └── Dog extends Animal
```

**Dog object contains:**
```
├── From LivingThing (inherited via Animal) → breathe()
├── From Animal (inherited)                 → name, eat()
└── From Dog (own)                          → breed, bark(), showInfo()
```

---

### ❓ Q9 — Method Overriding + @Override

**Question asked:**
> 1. What is the output?
> 2. What is Method Overriding?
> 3. What does `@Override` do — is it compulsory?
> 4. Why does `Fish` use Animal's version of `makeSound()`?

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

class Fish extends Animal {
    // no makeSound()
}

public class Main {
    public static void main(String[] args) {
        Dog d = new Dog();
        Cat c = new Cat();
        Fish f = new Fish();
        d.makeSound();
        c.makeSound();
        f.makeSound();
    }
}
```

**My Answer:**
```
Dog barks
Cat meows
Animal makes a sound
```
> Method Overriding is rewriting the parent method definition in the child class.
> `@Override` is not compulsory but it is good practice — it helps code readability.
> Fish doesn't override makeSound() so it uses Animal's version.

**Verdict: ✅ 100% Perfect!**

**Overriding Rules:**

| Rule | Detail |
|------|--------|
| Same method name | Must match exactly |
| Same parameters | Must match exactly |
| Child provides own body | Different implementation |
| `@Override` | Optional but best practice — catches typos! |
| `private` method | Cannot be overridden — not inherited! |
| `final` method | Cannot be overridden — Compile Error! |

---

### ❓ Q10 — final class + final method

**Question asked:**
> 1. What happens when this code runs?
> 2. What does `final class` mean?
> 3. How is `final class` different from `final method`?

```java
final class Vehicle {
    void start() { System.out.println("Vehicle started"); }
}

class Car extends Vehicle {
    void drive() { System.out.println("Car is driving"); }
}
```

**My Answer:**
> Vehicle started because the vehicle is final.
> Car is driving.
> final class means it is the final class — nobody can override this class.
> final class lets you extend but final method does not.

**Verdict: ❌ Error type wrong + final rule backwards**

**Correct Answer:**
```
💥 Compile Error — cannot extend final class Vehicle!
Program never runs!
```

**What I Learned:**

| Keyword | Meaning |
|---------|---------|
| `final class` | ❌ Cannot be **extended** — no child classes! |
| `final method` | ✅ Can be inherited BUT ❌ cannot be **overridden** |

```
final class   → cannot EXTEND   → Compile Error if you try!
final method  → cannot OVERRIDE → Compile Error if you try!
Both are caught BEFORE the program runs!
```

---

## 🔁 Weak Concept Extra Practice

---

### ❓ Extra Q1 — final method Trap

**Question asked:**
> 1. What happens when this code compiles?
> 2. Which method causes the problem and why?
> 3. Which method is fine to override and why?

```java
class A {
    final void display() { System.out.println("Class A display"); }
    void show() { System.out.println("Class A show"); }
}

class B extends A {
    void display() { System.out.println("Class B display"); }
    void show() { System.out.println("Class B show"); }
}
```

**My Answer:**
> Compile Error because display() is final — we can't override it.
> `show()` is fine to override because it is not final.

**Verdict: ✅ 100% Perfect — final method rule fully locked in! 🏆**

**Golden Rule:**
```
final method   → inherited ✅ → overridden ❌ → Compile Error!
normal method  → inherited ✅ → overridden ✅ → perfectly fine!
```

---

### ❓ Extra Q2 — final class Trap

**Question asked:**
> 1. What happens when this code compiles?
> 2. Which line causes the problem and why?
> 3. Can `Car` extend `Vehicle` even though `Car` is `final`?

```java
class Vehicle {
    void start() { System.out.println("Vehicle started"); }
}

final class Car extends Vehicle {
    void drive() { System.out.println("Car is driving"); }
}

class ElectricCar extends Car {
    void charge() { System.out.println("Charging..."); }
}
```

**My Answer:**
> Compile Error because ElectricCar extends Car which is final — we can't extend a final class.
> Yes, Car can extend Vehicle because Car being final only stops others from extending Car —
> it does not stop Car from extending others.

**Verdict: ✅ 100% Perfect! 🏆**

**Final Class Rule:**
```
final class Car
    ↑                    ↓
Can extend others!    Nobody can extend Car!
Car extends Vehicle ✅   ElectricCar extends Car 💥
```

---

### ❓ Extra Q3 — protected Access Trap

**Question asked:**
> For each line — does it work or cause an error?
> What if `Outside` is in a different package and does NOT extend Animal?

```java
package other;

class Outside {
    void test() {
        Animal a = new Animal("Cat", 3);
        System.out.println(a.name);   // works or error?
        a.showInfo();                 // works or error?
    }
}
```

**My Answer:**
> If all classes are in the same package — yes they can access everything.
> If Outside is in a different package and does not extend Animal —
> it cannot access because protected access requires extending the class.
> protected alone does not allow access from outside the package.

**Verdict: ✅ 100% Perfect! 🏆**

**Complete protected Rule — Locked In:**

| Accessing From | Same Package | Different Package |
|---------------|-------------|-------------------|
| Same class | ✅ Yes | — |
| Child class | ✅ Yes | ✅ Yes (must extend!) |
| Unrelated class | ✅ Yes | ❌ No — Compile Error! |

> `protected` = **same package** OR **child class anywhere**
> Unrelated class in different package = ❌ always blocked!

---

## 🏆 Topic 5 Final Scorecard — Inheritance

| # | Question | Concept Tested | Result |
|---|----------|---------------|--------|
| Q1 | Animal + Dog | Basic inheritance + extends | ✅ Perfect |
| Q2 | Vehicle + Car | super() + constructor order | ✅ Perfect |
| Q3 | A, B, C | Multilevel inheritance | ✅ Perfect |
| Q4 | Shape hierarchy | Hierarchical inheritance | ✅ Perfect |
| Q5 | Person + Employee | super. method call | ✅ Perfect |
| Q6 | Animal + Dog | Inheritance + encapsulation | ✅ Perfect |
| Q7 | Vehicle + Bike | protected keyword | ✅ Right answer, incomplete reason |
| Q8 | LivingThing chain | Full inheritance challenge | ✅ Perfect |
| Q9 | Animal sounds | Method overriding + @Override | ✅ Perfect |
| Q10 | final class | final class + final method | ❌ Rule backwards + wrong error type |
| Extra Q1 | A + B | final method trap | ✅ Fully Cleared! |
| Extra Q2 | Vehicle + Car | final class trap | ✅ Fully Cleared! |
| Extra Q3 | protected access | protected across packages | ✅ Fully Cleared! |

---

## 💡 Key Takeaways — Inheritance

| Concept | Rule |
|---------|------|
| `extends` | Child inherits all non-private fields and methods from parent |
| `super()` | Calls parent constructor — must be FIRST line in child constructor! |
| `super.method()` | Calls parent's version of a method from child |
| Single Inheritance | One child, one parent — basic |
| Multilevel Inheritance | Chain — A→B→C — C gets everything! |
| Hierarchical Inheritance | One parent, multiple children |
| Multiple Inheritance | ❌ Not allowed in Java with classes! |
| `private` | Not accessible in child — same class only! |
| `protected` | Accessible in same package OR child class anywhere |
| Method Overriding | Child rewrites parent method — same name, same params, own body |
| `@Override` | Optional but best practice — catches typos at compile time |
| `final class` | Cannot be extended — Compile Error if tried! |
| `final method` | Can be inherited but cannot be overridden — Compile Error if tried! |

---

> 📝 *This README is part of a live Q&A OOP learning session.*
> *Topic 5: Inheritance — Fully Mastered ✅*
> *Every important concept covered, practiced, and weak areas re-drilled before moving on.*