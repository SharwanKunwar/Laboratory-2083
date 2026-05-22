package Arrays;

/*
    You are building a simple transaction tracker for a bank. A customer makes a series of transactions stored in an array — positive values = deposits, negative values = withdrawals.
    Your program must:
            * Calculate the final balance (starting from Rs. 0)
            * Find the largest deposit and largest withdrawal
            * Count total deposits and withdrawals
            * Check if the account ever went negative (overdraft) at any point
            * Print a status: "Account Healthy" if final balance >= 0, else "Account Overdrawn"
 */
public class BankAccountTransactionSystem {
    public static void main(String[] args) {

        int[] transaction = {500, -200, 1000, -1500, 300, -50, 800};

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
}
