import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Scanner;

public class Library extends LibraryService {
    Scanner sc = new Scanner(System.in);
    private final String libraryName = "Library of Knowledge";
    private final String establishedAt = "2083/12/1";
    private final String createdBy = "Sharwan Jung Kunwar";

    List<Book> books = new ArrayList<Book>();


    @Override
    public void aboutUs() {
        System.out.println("Library name: " + libraryName);
        System.out.println("Established Date : " + establishedAt);
        System.out.println("Created By : " + createdBy);
    }

    @Override
    public void addBook(Book book) {
        books.add(book);
    }

    @Override
    public void displayBook() {
        if (books.isEmpty()) System.out.println("\n\t There is no books in the library yet.!");
        for (Book book : books) {
            System.out.println("Book ID : " + book.id);
            System.out.println("Title : " + book.title);
            System.out.println("Author : " + book.author);
            System.out.println("Price : " + book.price);
            System.out.println("---------------------------------------");

        }
    }

    @Override
    public void loadBooks(Book book) {
        books.add(book);
    }

    @Override
    public void deleteBook(String referenceId) {
        List<Book> holdDeletedBookDetails = new ArrayList<>();
        holdDeletedBookDetails.addAll(books);
        boolean isDeleted = false;

        if (holdDeletedBookDetails.isEmpty()) return;
        for(Book book : holdDeletedBookDetails) {
            if (book.id.equals(referenceId)) {
                isDeleted = true;
                break;
            }
        }

        if(isDeleted){
            System.out.println("---------------------- Deleted Book Details ---");
            System.out.println("ID : " + referenceId);
            System.out.println("Title : " + holdDeletedBookDetails.get(0).title);
            System.out.println("Author : " + holdDeletedBookDetails.get(0).author);
            books.removeIf(book -> book.id.equals(referenceId)); // book.getId().equals(referenceId) if id is private you should use this
        }else System.out.println("----------------------------- ID Not Found ---");

    }


}
