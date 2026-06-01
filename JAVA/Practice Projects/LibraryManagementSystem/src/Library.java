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
            System.out.println("publishAt : "+book.publishAt);
            System.out.println("isAvailable : "+((book.isAvailable)? "Yes":"No"));
            System.out.println("IssuedTo : "+book.issuedToWhom);
            System.out.println("Price : " + book.price);
            System.out.println("----------------------------------");

        }
    }

    // This method loading existing books
    @Override
    public void loadBooks(Book book) {
        books.add(book);
    }

    @Override
    public void deleteBook(String referenceId) {
        List<Book> holdDeletedBookDetails = new ArrayList<>();
        holdDeletedBookDetails.addAll(books);
        boolean isMatched = false;
        boolean canDelete;

        if (holdDeletedBookDetails.isEmpty()) return;
        for(Book book : holdDeletedBookDetails) {
            if (book.id.equals(referenceId)) {
                isMatched = true;
                canDelete = book.isAvailable;
                if(isMatched && canDelete) {
                    System.out.println("-------------------------- Deleted Book Details ---");
                    System.out.println("ID : " + referenceId);
                    System.out.println("Title : " + book.title);
                    System.out.println("Author : " + book.author);
                    System.out.println();
                    books.remove(book); // book.getId().equals(referenceId) if id is private you should use this
                }else System.out.println("\n---- Unavailable Issued To : "+book.issuedToWhom+" ----");
                break;
            }
        }



    }

    // This method is for issue Book to the student/seeker
    @Override
    public void issueBook(String referenceId, String personName) {
        boolean isFound = false;
        if(books.isEmpty()) System.out.println("Books not added yet!");
        for(Book book : books){
            if(book.id.equals(referenceId) && book.isAvailable){
                book.isAvailable = false;
                isFound = true;
                book.issuedToWhom = personName;
            }
            if(isFound) {
                System.out.println("\nBook successfully issued to "+personName);
                System.out.println("---------------------------------------------------");
                System.out.println("ID: "+book.id);
                System.out.println("Title: "+book.title);
                System.out.println("Author: "+book.author);
                break;

            }
            else {
                if(book.id.equals(referenceId) && !book.isAvailable){
                    System.out.println("\nBook is already issued to "+book.issuedToWhom);
                    break;
                }
            }
        }

    }

    // This method is for return Book which is issued to student / seeker
    @Override
    public void returnBook(String referenceId) {
        boolean isFound = false;
        if(books.isEmpty()) System.out.println("Books not added yet!");
        for(Book book : books){
            if(book.id.equals(referenceId) && !book.isAvailable){
                book.isAvailable = true;
                isFound = true;
            }
            if(isFound) {
                System.out.println("\nBook successfully returned by "+book.issuedToWhom);
                book.issuedToWhom = "none";
                System.out.println("---------------------------------------------------");
                System.out.println("ID: "+book.id);
                System.out.println("Title: "+book.title);
                System.out.println("Author: "+book.author);
                break;

            }
            else {
                if(book.id.equals(referenceId) && !book.isAvailable){
                    System.out.println("\nBook is already issued to "+book.issuedToWhom);
                    break;
                }
            }
        }

    }


}
