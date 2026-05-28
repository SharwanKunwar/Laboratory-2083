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
    public void addBook(Book book) {
        books.add(book);
    }

    @Override
    public void displayBook() {
        if(books.isEmpty()) System.out.println("\n\t There is no books in the library yet.!");
        for(Book book : books){
            System.out.println("Book ID : "+book.id);
            System.out.println("Title : "+book.title);
            System.out.println("Author : "+book.author);
            System.out.println("Price : "+book.price);
            System.out.println("---------------------------------------");

        }
    }

    @Override
    public void loadBooks(Book book) {
        books.add(book);
    }

    @Override
    public void deleteBook() {

    }

}
