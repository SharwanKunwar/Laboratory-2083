package NumericalMethods.Problem01;

/*
     Topic : BisectionMethod
     Problem Statement : Find a real root of the equation x^3-x-11=0 by Bisection method, convert to three places of decimal.
*/

import static java.lang.Math.signum;

public class BisectionMethod {
    static void main(String[] args) {
        System.out.println("--------- Bisection Method ---------");

        int pastAns=Integer.MIN_VALUE;
        int i=0;
        while(true){

            int ans = (int)(Math.pow(i, 3) - i - 11);
            // Compare signs
            if (Integer.signum(pastAns) != Integer.signum(ans)) {
                System.out.println("pastAns:  f("+(i-1)+") = " + pastAns);
                System.out.println("pastAns:  f("+(i)+") = " + ans);

                break;
            }
            pastAns = ans;
            i++;
        }
    }
}
