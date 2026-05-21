package Arrays;

public class SuperMarketBillingSystem {
    static void main(String[] args) {

        System.out.println("Supermarket Billing System");

        int[] prices ={120, 450, 80, 600, 95, 30};
        int totalCost = 0;
        int mostExpensive = prices[0];
        double discountAmount = 0.0;



        for(int price:prices){
            totalCost += price;
            if(price > mostExpensive){
                mostExpensive = price;
            }
        }

        System.out.println("Total Cost: " + totalCost);

        System.out.println("Most Expensive Price: " + mostExpensive);

        if(totalCost > 1000){
            discountAmount = (10.0/100.0)*totalCost;
            System.out.println("Discount Amount: " + discountAmount);
        }
        System.out.println("Final Bill : "+(totalCost-discountAmount));




    }
}
