import java.util.Date;

public class Book {
    int id;
    String title;
    String author;
    Date publishAt;
    int price;

    Book(int id, String title, String author, int price) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.publishAt = new Date();
        this.price = price;
    }

    public void showDate(){
        System.out.println(publishAt);
    }
}
