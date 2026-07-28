# Spring Core — Order System with Payment

A simple Spring Core practice project created to understand the fundamentals of the Spring Framework, especially **Dependency Injection (DI)**, **Inversion of Control (IoC)**, **Beans**, and handling **multiple implementations of an interface**.

## 📚 What I Learned

### 1. Inversion of Control (IoC)

I learned that Spring manages the creation and lifecycle of objects instead of creating all objects manually using the `new` keyword.

Instead of:

```java
PaymentServiceHelper payment = new Eswa();
```

Spring creates and manages the object for me.

---

### 2. Dependency Injection (DI)

I learned how Spring automatically injects dependencies into a class.

For example, `OrderService` depends on `PaymentServiceHelper`:

```java
@Service
public class OrderService {

    private final PaymentServiceHelper payment;

    public OrderService(PaymentServiceHelper payment) {
        this.payment = payment;
    }
}
```

Spring automatically provides the required dependency through the constructor.

This is called **Constructor Injection**.

---

### 3. Spring Beans

I learned that classes annotated with Spring stereotypes such as:

* `@Component`
* `@Service`

can be automatically detected and managed by Spring as Beans.

Example:

```java
@Component
public class Eswa implements PaymentServiceHelper {
    
    @Override
    public String pay() {
        return "Eswa";
    }
}
```

Spring creates and manages the `Eswa` object.

---

### 4. Interfaces and Implementations

I learned how to use an interface to create a common contract for different payment services.

```java
public interface PaymentServiceHelper 
{
    String pay();
}
```

Different payment services can implement the same interface:

```java
@Component
@Qualifier("Eswa")
public class Eswa implements PaymentServiceHelper {

    @Override
    public String pay() {
        return "Eswa";
    }
}
```

```java
@Component
@Qualifier("PhonePay")
public class PhonePay implements PaymentServiceHelper {

    @Override
    public String pay() {
        return "Phone Pay";
    }
}
```

This allows the application to support multiple payment methods while depending on the interface instead of a specific implementation.

---

### 5. Component Scanning

I learned that Spring uses component scanning to find classes annotated with Spring annotations such as `@Component` and `@Service`.

For example:

```java
@Configuration
@ComponentScan("org.unpredictableXpractice")
public class AppConfig {
}
```

Spring scans the specified package and discovers the components inside it.

---

### 6. Understanding `NoSuchBeanDefinitionException`

I encountered an error where Spring could not find a Bean for:

```text
PaymentServiceHelper
```

The problem was that `@Component` was placed directly on the interface:

```java
@Component
public interface PaymentServiceHelper {
}
```

An interface itself cannot be instantiated as a concrete object.

The solution was to create an implementation class and annotate that class:

```java
public interface PaymentServiceHelper {
    String pay();
}
```

```java
@Component
public class Eswa implements PaymentServiceHelper {

    @Override
    public String pay() {
        return "Eswa";
    }
}
```

This helped me understand that Spring needs a concrete implementation to create and manage as a Bean.

---

### 7. Understanding `NoUniqueBeanDefinitionException`

After creating multiple implementations, I encountered another error:

```text
expected single matching bean but found 2:
eswa, phonePay
```

This happened because Spring found two Beans implementing the same interface:

```text
PaymentServiceHelper
       │
       ├── Eswa
       │
       └── PhonePay
```

When `OrderService` requested:

```java
PaymentServiceHelper payment;
```

Spring did not know which implementation to inject.

---

### 8. Using `@Qualifier`

I learned how to explicitly tell Spring which Bean should be injected using `@Qualifier`.

```java
public OrderService(@Qualifier("Eswa") PaymentServiceHelper payment) 
{
    this.payment = payment;
}
```

Now Spring knows that the `Eswa` Bean should be injected.

This is useful when multiple implementations of the same interface exist.

---

### 9. Using `@Primary`

I also learned that `@Primary` can be used to define a default Bean when multiple Beans of the same type exist.

```java
@Component("eswa")
@Primary
public class Eswa implements PaymentServiceHelper {

    @Override
    public String pay() {
        return "Payment successful using eSewa";
    }
}
```

If multiple `PaymentServiceHelper` implementations exist, Spring will choose the `@Primary` Bean by default.

---

### 10. Creating the Spring Application Context

I learned how to manually create a Spring Application Context using:

```java
ApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);
```

The Application Context is responsible for managing Spring Beans and their dependencies.

I can then retrieve a Bean from the context:

```java
OrderService order = context.getBean(OrderService.class);
```

And use it:

```java
order.placeOrder();
```

---

## 🏗️ Project Structure

```text
OrderSystemWithPayment
│
├── src
│   └── main
│       └── java
│           └── org
│               └── unpredictableXpractice
│                   │
│                   ├── Main.java
│                   │
│                   ├── config
│                   │   └── AppConfig.java
│                   │
│                   ├── order
│                   │   └── OrderService.java
│                   │
│                   └── payment
│                       ├── PaymentServiceHelper.java
│                       ├── Eswa.java
│                       └── PhonePay.java
│
└── README.md
```

## 🔄 Application Flow

```text
Main
 │
 │ Creates ApplicationContext
 ▼
AppConfig
 │
 │ Component Scanning
 ▼
Spring Container
 │
 ├── OrderService
 │
 ├── Eswa
 │
 └── PhonePay
 │
 │ Dependency Injection
 ▼
OrderService
 │
 │ @Qualifier("eswa")
 ▼
PaymentServiceHelper
 │
 ▼
Eswa
 │
 ▼
Payment
```

## 🧠 Key Concepts Practiced

* Inversion of Control (IoC)
* Dependency Injection (DI)
* Constructor Injection
* Spring Beans
* `@Component`
* `@Service`
* `@Configuration`
* `@ComponentScan`
* `ApplicationContext`
* `AnnotationConfigApplicationContext`
* Interfaces
* Multiple Implementations
* `@Qualifier`
* `@Primary`
* Bean Naming
* Dependency Resolution
* Spring Bean Exceptions

## 💡 Key Takeaways

Through this practice, I learned that Spring's Dependency Injection becomes especially useful when an application has multiple implementations of the same interface.

For example:

```text
PaymentServiceHelper
       │
       ├── Eswa
       │
       └── PhonePay
```

Spring can manage all these implementations as Beans, and I can control which implementation is injected using:

```java
@Qualifier("eswa")
```

or define a default implementation using:

```java
@Primary
```

This practice helped me understand the basics of how the **Spring IoC Container manages objects and their dependencies**.
