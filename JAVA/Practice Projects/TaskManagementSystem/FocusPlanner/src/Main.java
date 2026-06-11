import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Main {
    static void space(int size){
        for(int i=0;i<size;i++){
            System.out.println();
        }
    }
    public static void main() {

        Task task = new Task();

        Scanner in  = new Scanner(System.in);
        int op;

        do{
            System.out.println("-----------------------------------------");
            System.out.println("\t\t\tFocus Planner");
            System.out.println("-----------------------------------------");
            System.out.println("\t1. Add Task\t\t  2. Delete Task");
            System.out.println("\t3. Start Task\t  4. Display Task");
            System.out.println("-----------------------------------------");
            System.out.print("Enter : ");
            op = in.nextInt();

            switch (op) {
                case 1:
                    space(40);
                    System.out.println("------------------------- Adding Task ---");
                    task.addTask();
                    break;
                case 2:
                    space(40);
                    System.out.println("--------------------- Displaying Task ---");
                    task.displayTask();
                    break;
            }
        }while (op != 0);

    }
}