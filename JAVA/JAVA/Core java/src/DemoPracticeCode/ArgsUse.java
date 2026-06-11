package DemoPracticeCode;

public class ArgsUse {

    public static void main(String[] args) {
        int holdSum01 = add(1,2);
        int holdSum02 = add(2,3,4);
        int varArgs = add(1,2,3,4,5);
        System.out.println(varArgs);
    }
    static int add(int a, int b){
        return a+b;
    }
    static int add(int a, int b, int c){
        return a+b+c;
    }

    static int add(int... numbers){
        int sum = 0;
        for(int number : numbers){
            sum += number;
        }
        return sum;
    }
}
