package NumericalMethods.Problem01;

import java.util.ArrayList;
import java.util.List;

public class ApproximationRoot {
    List<Integer> list = new ArrayList<>();

    public void rootCalculation(int a, int b) {
        int past = a;
        int future = b;

        for(int i=1; i<=10; i++){
            double apRoot = (past + future) / 2;
            int function = (int)(Math.pow(apRoot, 3)-apRoot-11);
            if(function>=0){

            }

        }
    }
}


// excuse me