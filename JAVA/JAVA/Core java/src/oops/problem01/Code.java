package oops.problem01;

class Animal {
    void eat() {
        System.out.println("Animal eating");
    }
}

class Dog extends Animal {
    @Override
    void eat() {
        System.out.println("Dog eating");
    }

    void bark() {
        System.out.println("Dog barking");
    }
}

public class Code {
    static void main(String[] args) {
        Animal a = new Dog();
        a.eat();
//        a.bark();
    }
}
