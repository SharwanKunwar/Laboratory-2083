package oops.problem03;


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

public class ClassCastException {
    static void main(String[] args) {
        Shape s1 = new Circle();
        Shape s2 = new Square();

        s1.draw();

        Circle c = (Circle) s1;
        c.getRadius();

        Circle c2 = (Circle) s2;
        c2.getRadius();
    }
}
