package oops.problem02;

class Cal{
    public int add(int a,int b){
        return a+b;
    }
    public double add (double a,double b){
        return a+b;
    }


}
public class Code {
    static void main(String[] args) {
        Cal c = new Cal();
        int h = c.add(10, 10);
        double f = c.add(60, 20);
        System.out.println(h);
        System.out.println(f);
    }
}
