import java.util.Scanner;

public class Main {
    static void space(int size){
        for(int i = 0; i<size; i++){
            System.out.println();
        }
    }
    public static void main(String[] args) {

        Scanner in = new Scanner(System.in);
        Library library = new Library();


        // pre-loaded books
        Book book1 = new Book(1,"The power", "Sharwan jung kunwar", 10000);
        Book book2 = new Book(2,"Eat That Frog", "Brain Tracy", 2000);
        library.loadBooks(book1);
        library.loadBooks(book2);

        // variables
        int op;

        do{

            System.out.println();
            System.out.println("------------ Library Management System ------------");
            System.out.println("---------------------------------------------------");
            System.out.println("\t1. Add Book\t\t    2. Display Books");
            System.out.println("\t3. Issue Book\t\t4. Return Book");
            System.out.println("\t5. Delete Book\t\t0. Exit");
            System.out.println("---------------------------------------------------");
            System.out.print("Enter : ");
            op = in.nextInt();

            switch(op){
                case 1:
                    space(40);
                    library.addBook();
                    break;
                case 2:
                    space(40);
                    library.displayBook();
                    break;

            }
        }while(op != 0);

    }
}