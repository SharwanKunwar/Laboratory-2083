import java.security.SecureRandom;
import java.util.Date;
import java.util.UUID;

public class Book {
    String id;
    String title;
    String author;
    String issuedToWhom = "none";
    Date publishAt;
    int price;
    boolean isAvailable = true;


    // constructor
    Book( String title, String author, int price) {
        this.id = generateId();
        this.title = title;
        this.author = author;
        this.publishAt = new Date();
        this.price = price;
    }

    // Method Generate different id's
    public String generateId(){

        String numbers = "0123456789";
        SecureRandom random = new SecureRandom();
        StringBuilder otp = new StringBuilder();

        for (int i = 0; i < 4; i++)
        {
            int index = random.nextInt(numbers.length());
            otp.append(numbers.charAt(index));
        }

        return otp.toString();
    }


}
