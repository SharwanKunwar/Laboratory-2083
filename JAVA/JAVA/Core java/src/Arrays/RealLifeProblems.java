package Arrays;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

abstract class RealLifeProblemsManager{
    abstract void BankAccountTransactionSystem(int[] arr);
    abstract void StudentGradeReportSystem(int[] marks);
    abstract void InventoryManagementSystem(String[] items, int[] quantities);
    abstract void SuperMarketBillingSystem(int[] prices);
    abstract void ElectionVoteCounterSystem(int[] votes);
    abstract void ElectionVoteCounterPremiumSystem(int[] votes);
    abstract void CricketScoreAnalyzer(int[] runs);
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
    public void ElectionVoteCounterSystem(int[] votes) {

        System.out.println("------------ Election Vote Counter System------------");

        // Variables
        int size = votes.length;
        int validVotes = 0;
        int invalidVotes= 0;
        int candidate01 = 0;
        int candidate02 = 0;
        int candidate03 = 0;

        for(int i = 0; i < size; i++){
                if(votes[i] >= 1 && votes[i] <= 3 ){
                    validVotes++;
                    if(votes[i] == 1){
                        candidate01++;
                    }
                    if(votes[i] == 2){
                        candidate02++;
                    }
                    if(votes[i] == 3){
                        candidate03++;
                    }
                }else {
                    invalidVotes++;
                }
        }
        System.out.println("\nOutput :  ");
        System.out.println("Total Votes Cast : "+size);
        System.out.println("Valid Votes      : "+validVotes);
        System.out.println("Invalid Votes    : "+invalidVotes);
        System.out.printf("\nCandidate 1 : %d votes (%.2f%%)%n", candidate01, (double)candidate01/validVotes*100);
        System.out.printf("Candidate 2 : %d votes (%.2f%%)%n", candidate02, (double)candidate02/validVotes*100);
        System.out.printf("Candidate 3 : %d votes (%.2f%%)%n", candidate03, (double)candidate03/validVotes*100);

        System.out.print("\nResult : ");
        if(candidate01 == candidate02 && candidate02 == candidate03){
            System.out.println("Three-way tie between all candidates!");
        }else if(candidate01 == candidate02 && candidate01!= candidate03){
            System.out.println("Tie Between Candidate01 and  Candidate02");
        }else if(candidate02 == candidate03 && candidate02!= candidate01){
            System.out.println("Tie Between Candidate02 and  Candidate03");
        }else if(candidate03 == candidate01 && candidate03!= candidate02){
            System.out.println("Tie Between Candidate03 and  Candidate01");
        }else {
            if(candidate01 > candidate02 && candidate01 >  candidate03){
                System.out.println("Candidate01 wins!.");
            }else if(candidate02 > candidate03 && candidate02 >  candidate01){
                System.out.println("Candidate02 wins!.");
            }else if(candidate03 > candidate01 && candidate03 >  candidate02){
                System.out.println("Candidate03 wins!.");
            }
        }

    }

    @Override
    public void ElectionVoteCounterPremiumSystem(int[] votes) {
        System.out.println("------------ Election Vote Counter System------------");

        // Variables
        int size = votes.length;
        int validVotes = 0;
        int invalidVotes= 0;
        int[] candidates = new int[4];


        //enhanced counter
        for(int vote:votes){
            if(vote >= 1 && vote <= 3 ){
                candidates[vote]++;
                validVotes++;
            }else {
                invalidVotes++;
            }
        }

        System.out.println("\nOutput :  ");
        System.out.println("Total Votes Cast : "+size);
        System.out.println("Valid Votes      : "+validVotes);
        System.out.println("Invalid Votes    : "+invalidVotes);
        System.out.println();
        for(int i = 1; i <= 3; i++){
            System.out.printf("Candidate%d : %d votes (%.2f%%)%n", i, candidates[i], (double)candidates[i]/validVotes*100);
        }

        //  max is the winner here
        int max = 0;
        for(int i = 1; i <= 3; i++){
            if(candidates[i] > max) max = candidates[i];
        }

        System.out.print("\nResult : ");
        StringBuilder winners = new StringBuilder();
        int winnerCount = 0;
        for(int i = 1; i <= 3; i++){
            if(candidates[i] == max){
                if(winnerCount > 0) winners.append(" and ");
                winners.append("Candidate ").append(i);
                winnerCount++;
            }
        }

        if(winnerCount > 1){
            System.out.println("Tie between " + winners + "!");
        } else {
            System.out.println(winners + " wins!");
        }


    }

    @Override
    public void CricketScoreAnalyzer(int[] runs) {
        int size = runs.length;
        int teamTotal = 0;
        int ducksTotal = 0;
        int centuries = 0;
        int halfCenturies= 0;
        List<Integer> halfCenturiesScore = new ArrayList<Integer>();
        List<Integer> centuriesScore = new ArrayList<Integer>();
        List<Integer> topThreeScorers = new ArrayList<Integer>();
        int[] copyArray = runs.clone();
        Arrays.sort(copyArray);



        for(int i = 0; i < size; i++){
            teamTotal += runs[i];
            if(runs[i] == 0) ducksTotal++;
            if(runs[i]>=50 && runs[i]<100){
                halfCenturies++;
                halfCenturiesScore.add(runs[i]);
            }
            if(runs[i] >= 100){
                centuries++;
                centuriesScore.add(runs[i]);
            }
        }
        for(int i = size - 3; i < size; i++){
            topThreeScorers.add(copyArray[i]);
        }

        int max = copyArray[size - 1];
        int secondMax = copyArray[size - 2];


        System.out.println("------------ Cricket Score Analyzer -----------");
        System.out.println("Team Total : "+ teamTotal);
        System.out.format("Average Runs : %.2f%n", (double)teamTotal/size);
        System.out.println("Ducks (0s) : "+ducksTotal);
        System.out.println("Half Centuries : "+halfCenturies+" "+(halfCenturiesScore));
        System.out.println("Centuries  : "+centuries+" "+centuriesScore);
        System.out.println();
        System.out.println("Top 3 Scorers : "+ topThreeScorers);
        System.out.println("Highest Partnership : "+(max+secondMax)+" ("+max+"+"+secondMax+")");


    }

}
