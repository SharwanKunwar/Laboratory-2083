package oops.Problem06;

import java.util.ArrayList;
import java.util.List;

public class DeathNote {
    private final String bookName = "Death Note";
    private final String pages = "infinity";
    private final String about = "";
    private String person;
    private String deathReason;


    DeathNote(String person, String deathReason) {
        this.person = person;
        this.deathReason = deathReason;
    }

    protected void displayPerson() {
        System.out.println("Name : " + person);
        System.out.println("\nDeath Reason : \n" + deathReason);
    }




}
