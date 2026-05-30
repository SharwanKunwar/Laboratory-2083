package oops.Problem06;

import java.util.ArrayList;
import java.util.List;

public class DeathNote {
    private final String bookName = "Death Note";
    private final String pages = "infinity";
    private final String about = "The Death Note is a supernatural notebook with a \nchilling rule: write a victim's name while picturing \ntheir face, and they will die. Discovered by genius \nstudent Light Yagami, it becomes a weapon in his quest \nto create a utopian world — free of criminals — at any \ncost.";
    private String victim;
    private String deathReason;


    DeathNote(String victim, String deathReason) {
        this.victim = victim;
        this.deathReason = deathReason;
    }

    protected void displayWho() {
        System.out.println("Name : " + victim);
        System.out.println("\nDeath Reason : \n" + deathReason);
    }

    protected void aboutBook(){
        System.out.println("Book Name : " + bookName);
        System.out.println("Book Pages : " + pages);
        System.out.println("\nBook About : \n" + about);
    }




}
