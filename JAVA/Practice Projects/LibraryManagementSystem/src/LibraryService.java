abstract public class LibraryService {
    abstract public void aboutUs();
    abstract public void addBook(Book book);
    abstract public void displayBook();
    abstract public void loadBooks(Book book);
    abstract public void deleteBook(String referenceId);
    abstract public void issueBook(String referenceId, String personName);
    abstract public void returnBook(String referenceId);

}
