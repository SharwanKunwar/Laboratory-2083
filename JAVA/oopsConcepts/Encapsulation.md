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
| 5 | Inheritance | 🔜 Up Next |
| 6 | Polymorphism | ⏳ Pending |
| 7 | Abstraction | ⏳ Pending |
| 8 | Interface | ⏳ Pending |
| 9 | Abstract Class | ⏳ Pending |
| 10 | Overloading & Overriding | ⏳ Pending |
| 11 | this, super, static, final | ⏳ Pending |
| 12 | Association, Aggregation, Composition | ⏳ Pending |

---

## 📌 Topic 4: Encapsulation

### 💡 Core Concept

> **Encapsulation** means hiding the internal data of an object and only allowing
> access through **controlled methods**.
> It is achieved using **private fields** and **public getters/setters**.

| Concept | Summary |
|---------|---------|
| `private` field | Nobody can access directly from outside the class |
| **Getter** | Controlled READ access |
| **Setter** | Controlled WRITE access with validation |
| **Read Only** | Getter only — no setter |
| **Write Only** | Setter only — no getter |
| **Setter in Constructor** | Ensures validation runs even at object creation time |
| **Reference Leak** | Returning object reference from getter — encapsulation can break! |

---

## 🧪 Practice Questions

---

### ❓ Q1 — Why Encapsulation?

**Question asked:**
> What is wrong with this code and how would you fix it?

```java
class BankAccount {
    int balance = 5000;
}

public class Main {
    public static void main(String[] args) {
        BankAccount acc = new BankAccount();
        acc.balance = -99999;
        System.out.println("Balance: " + acc.balance);
    }
}
```

**My Answer:**
> The problem is that the balance should not be changeable from main — it is critical data.
> We should make balance private and create getter and setter methods.
> In the setter, add an if condition — if the sent value is negative, print "Amount must be > 0".

**Verdict: ✅ 100% Perfect — Identified problem and gave exact real-world solution!**

**Fixed Code:**
```java
class BankAccount {
    private int balance = 5000;

    public int getBalance() {
        return balance;
    }

    public void setBalance(int amount) {
        if (amount < 0) {
            System.out.println("Amount must be > 0");
        } else {
            balance = amount;
        }
    }
}
```

**Output after fix:**
```
Amount must be > 0
Balance: 5000
```

**Three Pillars of Encapsulation:**

| Pillar | Meaning |
|--------|---------|
| `private` field | Nobody can access directly from outside |
| **Getter** | Controlled READ access |
| **Setter** | Controlled WRITE access with validation |

---

### ❓ Q2 — Getter & Setter with Validation

**Question asked:**
> 1. What is the output?
> 2. Why can't we just do `s.marks = 85` directly?

```java
class Student {
    private String name;
    private int marks;

    public String getName() { return name; }
    public int getMarks() { return marks; }

    public void setName(String name) {
        if (name == null || name.isEmpty())
            System.out.println("Name cannot be empty!");
        else this.name = name;
    }

    public void setMarks(int marks) {
        if (marks < 0 || marks > 100)
            System.out.println("Marks must be between 0 and 100!");
        else this.marks = marks;
    }
}

public class Main {
    public static void main(String[] args) {
        Student s = new Student();
        s.setName("Alice");
        s.setMarks(150);
        s.setMarks(85);
        System.out.println(s.getName() + " : " + s.getMarks());
    }
}
```

**My Answer:**
```
Marks must be between 0 and 100!
Alice : 85
```
> We can't do `s.marks = 85` directly because marks is private —
> it can only be accessed from inside the class.

**Verdict: ✅ 100% Perfect!**

**Step by step trace:**

| Action | Result |
|--------|--------|
| `s.setName("Alice")` | Valid — name set ✅ |
| `s.setMarks(150)` | Invalid — prints warning, marks stays `0` |
| `s.setMarks(85)` | Valid — marks set to 85 ✅ |

---

### ❓ Q3 — Read Only & Write Only Fields

**Question asked:**
> 1. What is the output?
> 2. Why is `password` write-only and `name` read-only — what is the real world reason?

```java
class Employee {
    private String name;
    private int salary;
    private String password;

    Employee(String name, int salary, String password) {
        this.name = name;
        this.salary = salary;
        this.password = password;
    }

    public String getName() { return name; }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getSalary() { return salary; }
    public void setSalary(int salary) {
        if (salary > 0) this.salary = salary;
    }
}

public class Main {
    public static void main(String[] args) {
        Employee e = new Employee("Alice", 50000, "abc123");
        System.out.println(e.getName());
        System.out.println(e.getSalary());
        e.setSalary(60000);
        e.setPassword("xyz789");
        System.out.println(e.getSalary());
        System.out.println(e.getPassword());
    }
}
```

**My Answer:**
```
Alice
50000
60000
xyz789   ← (wrong — getPassword() doesn't exist!)
```
> Password can't be seen and name can only be read, not changed.

**Verdict: ⚠️ Real world reason perfect — last line wrong**

**Correct Output:**
```
Alice
50000
60000
💥 Compile Error — getPassword() does not exist!
```

**Three levels of field access:**

| Type | Getter | Setter | Example |
|------|--------|--------|---------|
| **Read Only** | ✅ Yes | ❌ No | `name` — can read, can't change |
| **Write Only** | ❌ No | ✅ Yes | `password` — can change, can't read |
| **Read & Write** | ✅ Yes | ✅ Yes | `salary` — full access with validation |

---

### ❓ Q4 — Encapsulation with Constructor + Setters

**Question asked:**
> 1. What is the output?
> 2. Why is the constructor calling `setPrice()` and `setStock()` instead of assigning directly?
> 3. What are `p2`'s price and stock after creation?

```java
class Product {
    private String name;
    private double price;
    private int stock;

    Product(String name, double price, int stock) {
        this.name = name;
        setPrice(price);
        setStock(stock);
    }

    public String getName() { return name; }
    public double getPrice() { return price; }
    public int getStock() { return stock; }

    public void setPrice(double price) {
        if (price > 0) this.price = price;
        else System.out.println("Price must be positive!");
    }

    public void setStock(int stock) {
        if (stock >= 0) this.stock = stock;
        else System.out.println("Stock cannot be negative!");
    }

    void showInfo() {
        System.out.println(name + " | Rs." + price + " | Stock: " + stock);
    }
}

public class Main {
    public static void main(String[] args) {
        Product p1 = new Product("Apple", 50.0, 100);
        Product p2 = new Product("Mango", -30.0, -5);
        p1.setPrice(60.0);
        p2.setStock(10);
        p1.showInfo();
        p2.showInfo();
    }
}
```

**My Answer:**
```
Price must be positive!
Stock cannot be negative!
Apple | Rs.60.0 | Stock: 100
Mango | Rs.0.0  | Stock: 10
```
> The constructor calls setters so that validation runs first before assigning.
> p2's price = 0.0 (default double) and stock = 10 (set after creation).

**Verdict: ✅ Perfect!**

**What I Learned:**
> Calling setters inside the constructor means your object is **always valid from birth!**

```java
// ❌ Without setter — no validation at creation!
this.price = -30.0;  // accepted silently!

// ✅ With setter — validation at creation!
setPrice(-30.0);     // caught! → "Price must be positive!"
```

---

### ❓ Q5 — Full Encapsulation Challenge 🏆

**Question asked:**
> 1. What is the output?
> 2. What are `s2`'s field values right after creation?
> 3. Why does `s2.showInfo()` not crash even though name was empty at creation?
> 4. Which fields use read-only, write-only, or full access?

```java
class Student {
    private String name;
    private int age;
    private double gpa;

    Student(String name, int age, double gpa) {
        setName(name);
        setAge(age);
        setGpa(gpa);
    }

    public String getName() { return name; }
    public int getAge() { return age; }
    public double getGpa() { return gpa; }

    public void setName(String name) {
        if (name == null || name.isEmpty())
            System.out.println("Name cannot be empty!");
        else this.name = name;
    }

    public void setAge(int age) {
        if (age < 5 || age > 100)
            System.out.println("Age must be between 5 and 100!");
        else this.age = age;
    }

    public void setGpa(double gpa) {
        if (gpa < 0.0 || gpa > 4.0)
            System.out.println("GPA must be between 0.0 and 4.0!");
        else this.gpa = gpa;
    }

    void showInfo() {
        System.out.println(name + " | Age: " + age + " | GPA: " + gpa);
    }
}

public class Main {
    public static void main(String[] args) {
        Student s1 = new Student("Alice", 20, 3.8);
        Student s2 = new Student("", 150, 5.0);
        s2.setName("Bob");
        s2.setAge(25);
        s1.showInfo();
        s2.showInfo();
    }
}
```

**My Answer:**
```
Name cannot be empty!
Age must be between 5 and 100!
GPA must be between 0.0 and 4.0!
Alice | Age: 20 | GPA: 3.8
Bob | Age: 25 | GPA: 0.0
```
> s2 fields after creation: name=null, age=0, gpa=0.0 — all invalid values rejected.
> s2.showInfo() doesn't crash because null in println is safe — Java prints "null" as text.
> It only crashes when you call a method ON null.
> All fields have both getter and setter — full read & write access.

**Verdict: ✅ Perfect on all 4 questions!**

**s2 field values after creation:**
```
name = null   ← empty string rejected, default is null
age  = 0      ← 150 rejected, default int is 0
gpa  = 0.0    ← 5.0 rejected, default double is 0.0
```

---

### ❓ Q6 — Encapsulation with Multiple Classes

**Question asked:**
> 1. What is the output?
> 2. `p.getAddress().getCity()` — what is this style called?
> 3. We changed `addr.setCity("Pokhara")` — why did `p.getAddress().getCity()` also change?

```java
class Address {
    private String city;
    private String country;

    Address(String city, String country) {
        this.city = city;
        this.country = country;
    }

    public String getCity() { return city; }
    public String getCountry() { return country; }

    public void setCity(String city) {
        if (city == null || city.isEmpty())
            System.out.println("City cannot be empty!");
        else this.city = city;
    }
}

class Person {
    private String name;
    private Address address;

    Person(String name, Address address) {
        this.name = name;
        this.address = address;
    }

    public String getName() { return name; }
    public Address getAddress() { return address; }
}

public class Main {
    public static void main(String[] args) {
        Address addr = new Address("Kathmandu", "Nepal");
        Person p = new Person("Alice", addr);
        System.out.println(p.getName());
        System.out.println(p.getAddress().getCity());
        addr.setCity("Pokhara");
        System.out.println(p.getAddress().getCity());
    }
}
```

**My Answer:**
```
Alice
Kathmandu
Pokhara
```
> `p.getAddress().getCity()` is method chaining.
> It changed because Person stores the reference of addr — not a copy.
> When addr changes, p.getAddress() returns the same updated object.

**Verdict: ✅ 100% Perfect!**

**Memory Picture:**
```
addr ──┐
       ├──→ Object [ city="Pokhara", country="Nepal" ]
p.address ─┘
```

**Method Chaining:**
```
p.getAddress()   → returns Address object
        ↓
.getCity()       → called on that Address object → returns city
```

---

### ❓ Q7 — Reference Leak (Encapsulation Breaking) 💀

**Question asked:**
> 1. What is the output?
> 2. `ref.setMath(150)` — why is it blocked?
> 3. After `ref.setMath(75)` — what is `s.getValue()`?
> 4. Is encapsulation broken here and why?

```java
class Marks {
    private int math;
    private int science;

    Marks(int math, int science) {
        this.math = math;
        this.science = science;
    }

    public int getMath() { return math; }
    public int getScience() { return science; }

    public void setMath(int math) {
        if (math >= 0 && math <= 100) this.math = math;
        else System.out.println("Invalid marks!");
    }
}

class Student {
    private String name;
    private Marks marks;

    Student(String name, Marks marks) {
        this.name = name;
        this.marks = marks;
    }

    public String getName() { return name; }
    public Marks getMarks() { return marks; }
}

public class Main {
    public static void main(String[] args) {
        Marks m = new Marks(80, 90);
        Student s = new Student("Alice", m);
        Marks ref = s.getMarks();
        ref.setMath(150);
        ref.setMath(95);
        System.out.println(s.getName());
        System.out.println(s.getMarks().getMath());
        System.out.println(m.getMath());
    }
}
```

**My Answer:**
```
Invalid marks!
Alice
95
95
```
> `ref.setValue(200)` is blocked by validation — value stays at 80, just prints message.
> After `ref.setValue(75)`, `s.getValue()` = 75 because ref shares the reference address.
> Yes, encapsulation is broken because we shared the reference address through getMarks().

**Verdict: ⚠️ Concept Perfect — math stays 80 after rejection, not 0**

**Correct Output:**
```
Invalid marks!
Alice
95
95
```

**Reference Leak Picture:**
```
m   ──┐
      ├──→ Object [ math=95, science=90 ]
s.marks ──┘
      ↑
ref ──┘  ← got the address from getMarks() — bypasses private wall!
```

**What I Learned:**

| Approach | Safe? |
|----------|-------|
| `getMarks()` returns reference | ❌ Encapsulation can break! |
| `getMarks()` returns a copy | ✅ Original object safe! |

> This is called the **Reference Leak Problem!**

---

## 🔁 Weak Concept Extra Practice

---

### ❓ Extra Q1 — Read Only & Write Only Trap

**Question asked:**
> 1. What is the output?
> 2. Which line causes a problem and what type of error?
> 3. Why is `secretKey` write-only and `username` read-only in real world?

```java
class User {
    private String username;
    private String email;
    private String secretKey;

    User(String username, String email, String secretKey) {
        this.username = username;
        this.email = email;
        this.secretKey = secretKey;
    }

    public String getUsername() { return username; }

    public void setSecretKey(String secretKey) {
        this.secretKey = secretKey;
    }

    public String getEmail() { return email; }
    public void setEmail(String email) {
        if (email == null || email.isEmpty())
            System.out.println("Email cannot be empty!");
        else this.email = email;
    }
}

public class Main {
    public static void main(String[] args) {
        User u = new User("alice123", "alice@gmail.com", "KEY999");
        System.out.println(u.getUsername());
        System.out.println(u.getEmail());
        u.setEmail("");
        u.setSecretKey("NEWKEY123");
        System.out.println(u.getSecretKey());
        System.out.println(u.getEmail());
    }
}
```

**My Answer:**
```
alice123
alice@gmail.com
Email cannot be empty!
💥 Compile Error — getSecretKey() does not exist!
```
> When we try to call `getSecretKey()` it has no getter — it is write only.
> The error type is Compile Error.
> secretKey should not be readable for security, and username is read-only
> because it should never change after creation.

**Verdict: ✅ 100% Perfect — Fully Cleared! 🏆**

---

### ❓ Extra Q2 — Setter Inside Constructor Trap

**Question asked:**
> 1. What is the output?
> 2. `t2` was created with `-300.0` — is it blocked or accepted? Why?

```java
class Temperature {
    private double celsius;

    Temperature(double celsius) {
        this.celsius = celsius;
    }

    public double getCelsius() { return celsius; }

    public void setCelsius(double celsius) {
        if (celsius < -273.15)
            System.out.println("Temperature below absolute zero is impossible!");
        else this.celsius = celsius;
    }
}

public class Main {
    public static void main(String[] args) {
        Temperature t1 = new Temperature(25.0);
        Temperature t2 = new Temperature(-300.0);
        System.out.println(t1.getCelsius());
        System.out.println(t2.getCelsius());
    }
}
```

**My Answer (after self-correction):**
```
25.0
-300.0
```
> The constructor assigns directly — `setCelsius()` is never called.
> So validation never runs for t2 — -300.0 gets accepted silently.
> The constructor assigns -300.0 before any check because we didn't use `setCelsius()`.

**Verdict: ✅ Correct after self-correction! 💪**

**What I Learned:**
```java
// ❌ Direct assignment — validation SKIPPED!
Temperature(double celsius) {
    this.celsius = celsius;
}

// ✅ Calling setter — validation RUNS!
Temperature(double celsius) {
    setCelsius(celsius);
}
```

---

### ❓ Extra Q3 — Reference Leak Trap

**Question asked:**
> 1. What is the output?
> 2. `ref.setValue(200)` — what happens to `value`?
> 3. After `ref.setValue(75)` — what is `s.getValue()`?
> 4. Is encapsulation broken here and why?

```java
class Score {
    private int value;

    Score(int value) { this.value = value; }

    public int getValue() { return value; }

    public void setValue(int value) {
        if (value >= 0 && value <= 100) this.value = value;
        else System.out.println("Score must be between 0 and 100!");
    }
}

class Player {
    private String name;
    private Score score;

    Player(String name, Score score) {
        this.name = name;
        this.score = score;
    }

    public String getName() { return name; }
    public Score getScore() { return score; }
}

public class Main {
    public static void main(String[] args) {
        Score s = new Score(50);
        Player p = new Player("Alice", s);
        Score ref = p.getScore();
        ref.setValue(200);
        ref.setValue(75);
        System.out.println(p.getName());
        System.out.println(p.getScore().getValue());
        System.out.println(s.getValue());
    }
}
```

**My Answer:**
```
Score must be between 0 and 100!
Alice
75
75
```
> `ref.setValue(200)` is blocked — value stays at 50, just prints message.
> After `ref.setValue(75)`, s.getValue() = 75 because ref shares the reference address.
> Yes, encapsulation is broken because getScore() returns the reference —
> ref bypasses the private wall and modifies the object directly.

**Verdict: ✅ 100% Perfect! 🏆**

**Memory Picture:**
```
s   ──┐
      ├──→ Object [ value=75 ]
p.score ──┘
      ↑
ref ──┘  ← all three point to same object!
```

---

## 🏆 Topic 4 Final Scorecard — Encapsulation

| # | Question | Concept Tested | Result |
|---|----------|---------------|--------|
| Q1 | BankAccount | Why encapsulation + private + getter/setter | ✅ Perfect |
| Q2 | Student | Getter/setter with validation | ✅ Perfect |
| Q3 | Employee | Read only + write only fields | ⚠️ Real world reason right, getPassword wrong |
| Q4 | Product | Setter called inside constructor | ✅ Perfect |
| Q5 | Student GPA | Full encapsulation challenge | ✅ Perfect |
| Q6 | Person + Address | Encapsulation with multiple classes | ✅ Perfect |
| Q7 | Student + Marks | Reference leak problem | ⚠️ Concept perfect, math value wrong |
| Extra Q1 | User | Read only & write only trap | ✅ Fully Cleared! |
| Extra Q2 | Temperature | Setter inside constructor trap | ✅ Self-corrected! |
| Extra Q3 | Player + Score | Reference leak trap | ✅ Perfect |

---

## 💡 Key Takeaways — Encapsulation

| Concept | Rule |
|---------|------|
| `private` field | Can only be accessed from inside the class |
| Getter | Returns the field value — READ access |
| Setter | Validates then sets the field value — WRITE access |
| Read Only | Getter only — field can be seen but never changed |
| Write Only | Setter only — field can be changed but never seen |
| Setter in Constructor | Validation runs at object creation — object always valid from birth! |
| Direct assignment in Constructor | Validation is SKIPPED — object can be invalid silently! |
| `null` in println | Safe — prints "null" as text, does NOT crash! |
| `null.method()` | 💥 NullPointerException — crashes! |
| Reference Leak | `getObject()` returns reference — encapsulation can break! |
| Method Chaining | `p.getAddress().getCity()` — chain method calls on returned objects |

---

> 📝 *This README is part of a live Q&A OOP learning session.*
> *Topic 4: Encapsulation — Fully Mastered ✅*
> *Every important concept covered, practiced, and weak areas re-drilled before moving on.*