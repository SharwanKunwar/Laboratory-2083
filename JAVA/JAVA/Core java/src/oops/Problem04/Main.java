package oops.Problem04;
interface Walkable {
    void walk();
}

interface Talkable {
    void talk();
}

class Human implements Walkable, Talkable {
    @Override
    public void walk() { System.out.println("Human walking"); }

    @Override
    public void talk() { System.out.println("Human talking"); }

    public void think() { System.out.println("Human thinking"); }
}

public class Main {
    public static void main(String[] args) {
        Walkable w = new Human();
        Talkable t = new Human();
        Human h = new Human();

        w.walk();
//        w.talk();
//        w.think();

        t.talk();
//        t.walk();

        h.walk();
        h.talk();
        h.think();
    }
}