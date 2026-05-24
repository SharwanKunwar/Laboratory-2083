package Arrays;

public class InventoryManagementSystem {
   public static void main(String[] args) {

       String[] items      = {"Rice", "Sugar", "Oil", "Salt", "Milk", "Butter", "Flour"};
       int[] quantities    = {  120,      5,    43,     0,     8,      0,       35};

       // variables
       int mostStocked      = quantities[0];
       int mostStockedIndex = 0;
       int leastStocked      = quantities[0];
       int leastStockedIndex = 0;
       int totalItems       = 0;

       for(int i = 0; i < quantities.length; i++){
           totalItems += quantities[i];

           if(quantities[i] > mostStocked){
               mostStocked = quantities[i];
               mostStockedIndex = i;
           }
           if(quantities[i] < leastStocked){
               leastStocked = quantities[i];
               leastStockedIndex = i;
           }
       }

       System.out.println("Total Items in Warehouse : " + totalItems);
       System.out.printf("Average Stock            : %.2f%n", (double)totalItems / quantities.length);
       System.out.println("Most Stocked             : " + items[mostStockedIndex] + " (" + mostStocked + ")");
       System.out.println("Least Stocked            : " + items[leastStockedIndex] + " (" + leastStocked + ")");

       System.out.println("\nLow Stock Items (< 10)   :");
       for(int i = 0; i < quantities.length; i++){
           if(quantities[i] < 10 && quantities[i] > 0){
               System.out.println("  - " + items[i] + " : " + quantities[i]);
           }
       }

       System.out.println("\nOut of Stock Item       :");
       for(int i = 0; i < quantities.length; i++){
           if(quantities[i] == 0){
               System.out.println("  - " + items[i]);
           }
       }




    }
}
