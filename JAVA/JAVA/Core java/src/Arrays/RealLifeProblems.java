package Arrays;

abstract class RealLifeProblemsManager{

    // Problem01 : /*
    //    You are building a simple transaction tracker for a bank. A customer makes a series of transactions stored in an array — positive values = deposits, negative values = withdrawals.
    //    Your program must:
    //            * Calculate the final balance (starting from Rs. 0)
    //            * Find the largest deposit and largest withdrawal
    //            * Count total deposits and withdrawals
    //            * Check if the account ever went negative (overdraft) at any point
    //            * Print a status: "Account Healthy" if final balance >= 0, else "Account Overdrawn"
    // */
    abstract void BankAccountTransactionSystem(int[] arr);

    // problem02:
    abstract void StudentGradeReportSystem(int[] marks);

    // Problem03:
    abstract void InventoryManagementSystem(String[] items, int[] quantities);

    //Problem04:
    abstract void SuperMarketBillingSystem(int[] prices);

    //Problem05:
    /*
        You are building a vote counting system. Votes are stored as an array of candidate numbers (1, 2, or 3). Your program must count votes, find the winner, and detect invalid votes.
        Your program must:
            * Count votes for each candidate (1, 2, 3)
            * Find the winner (most votes)
            * Detect invalid votes (anything other than 1, 2, 3)
            * Calculate each candidate's vote percentage
            * Detect if there is a tie between any candidates

     */
    abstract void ElectionVoteCounterSystem(int[] votes);

}




public class RealLifeProblems extends RealLifeProblemsManager{

    @Override
    public void BankAccountTransactionSystem(int[] transaction) {

        int largestDeposit = 0;
        int largestWithdrawal = 0;

        int finalBalance = 0;
        int countDeposits = 0;
        int countWithdrawals = 0;
        boolean isOverdraft = false;


        for(int amount : transaction){

            if(amount >= 0){
                countDeposits++;
                finalBalance += amount;
            }else{
                countWithdrawals++;
                finalBalance -= Math.abs(amount);
            }

            if(finalBalance < 0) isOverdraft=true;
            if(amount > largestDeposit) largestDeposit = amount;
            if(amount < largestWithdrawal) largestWithdrawal = amount;

        }

        System.out.println("Final Balance: " + finalBalance);
        System.out.println("Total deposits: " + countDeposits);
        System.out.println("Total withdrawals: " + countWithdrawals);
        System.out.println("Largest Deposit: " + largestDeposit);
        System.out.println("Largest Withdrawal: " +Math.abs(largestWithdrawal));
        System.out.println("Overdraft Occurred : "+((isOverdraft)?"yes":"no"));
        System.out.println("Status : "+((finalBalance>=0)?"Account Healthy":"Account Unhealthy"));
    }

    @Override
    public void StudentGradeReportSystem(int[] marks) {
        int sum = 0;
        double avg = 0.0;
        int passCount = 0;
        int highestMark = marks[0];
        int lowestMark = marks[0];
        for(int mark : marks){
            sum += mark;
            if(mark >= 40){
                passCount++;
            }
            if(mark > highestMark){
                highestMark = mark;
            }
            if(mark <  lowestMark){
                lowestMark = mark;
            }
        }
        avg = (double)sum/marks.length;
        System.out.println("Total Subjects : "+marks.length);
        System.out.println("Average Marks : "+avg);
        System.out.println("Pass Count : "+passCount);
        System.out.println("Highest Mark : "+highestMark);
        System.out.println("Lowest Mark : "+lowestMark);
        if(avg >= 80){
            System.out.println("Distinction");
        }else if(avg >= 60){
            System.out.println("First Devision");
        }else if(avg >= 45){
            System.out.println("Second Devision");
        }else  if(avg >= 32){
            System.out.println("Pass");
        }else{
            System.out.println("Fail");
        }
        System.out.println(avg);

    }

    @Override
    public void InventoryManagementSystem(String[] items, int[] quantities) {

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

    @Override
    public void SuperMarketBillingSystem(int[] prices) {
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

    @Override
    void ElectionVoteCounterSystem(int[] votes) {

    }

}
