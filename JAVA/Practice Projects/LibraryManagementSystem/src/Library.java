import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Scanner;

public class Library extends LibraryService{
    Scanner sc = new Scanner(System.in);
    private String libraryName;
    private final String establishedAt = "2083/12/1";

    List<Book> books = new ArrayList<Book>();


    @Override
    public void addBook() {

        int id;
        String name;
        String author;
        int price;

        System.out.print("ID: ");
        id = sc.nextInt();
        System.out.print("Enter your book Name : ");
        sc.nextLine();
        name = sc.nextLine();
        System.out.print("Enter your book Author : ");
        author = sc.nextLine();
        System.out.print("Enter your book Price : ");
        price = sc.nextInt();

        Book book = new Book(id,name,author,price);
        books.add(book);
    }

    @Override
    public void displayBook() {
        if(books.isEmpty()){
            System.out.println("There is no books in the library");
        }
        for(Book book : books){
            System.out.println("------------------------- Displaying books "+book.id+" ---");
            System.out.println("Book ID : "+book.id);
            System.out.println("Title : "+book.title);
            System.out.println("Author : "+book.author);
            System.out.println("Price : "+book.price);

        }
    }

    @Override
    public void loadBooks(Book book) {
        books.add(book);
    }

}
