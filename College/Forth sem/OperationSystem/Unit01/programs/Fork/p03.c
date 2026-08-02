#include <stdio.h>
#include <unistd.h>

/*
    Q.How man times will "1" be printed to the console when this program is executed? Explain your answer.
    explanation:
        The program will print "1" a total of 31 times to the console.
        This is because the for loop iterates 4 times, and in each iteration, a fork() system call is made.
        Each fork() creates a new process, resulting in an exponential growth of processes.
        After the first fork(), there are 2 processes; after the second fork(), there are 4 processes; after the third fork(), there are 8 processes; and after the fourth fork(), there are 16 processes.
        Therefore, the total number of processes created is 1 (initial process) + 2 + 4 + 8 + 16 = 31.
        Each of these processes will execute the printf("1\n"); statement independently, resulting in a total of 31 prints.

*/

void main()
{
    for (int i = 1; i < 5; i++)
    {
        fork();
        printf("1\n");
    }
}