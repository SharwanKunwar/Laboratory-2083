import java.util.List;
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
            Book book;


      // Preloaded books
      // Book book1 = new Book(1,"The power", "Sharwan jung kunwar", 10000);
      // Book book2 = new Book(2,"Eat That Frog", "Brain Tracy", 2000);
      // library.loadBooks(book1);
      // library.loadBooks(book2);

      // variables
        int op;

        // ------------------------------------------------------------------------------------
        do{
            System.out.println();
            System.out.println("------------------- Library Management System -----");
            System.out.println("---------------------------------------------------");
            System.out.println("\t1. Add Book\t\t    2. Display Books");
            System.out.println("\t3. Issue Book\t\t4. Return Book");
            System.out.println("\t5. Delete Book\t\t0. Exit");
            System.out.println("---------------------------------------------------");
            System.out.print("Enter : ");
            op = in.nextInt();

            switch(op){
                case 1:
                    String name;
                    String author;
                    int price;
                    space(40);
                    System.out.println("--------------------- Adding book process ---");
                    System.out.print("Book Name : ");
                    in.nextLine();
                    name = in.nextLine();
                    System.out.print("Book Author : ");
                    author = in.nextLine();
                    System.out.print("Book Price : ");
                    price = in.nextInt();
                        book = new Book(name,author,price);
                        library.addBook(book);
                    break;

                case 2:
                    space(40);
                    System.out.println("--------------------------- Displaying books ---");
                        library.displayBook();
                    break;

                default:
                    System.out.println("Invalid input");
            }
        }while(op != 0);
        // ------------------------------------------------------------------------------------

    }
}