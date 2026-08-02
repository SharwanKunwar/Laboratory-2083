#include <stdio.h>
#include <unistd.h>

/*
    Q.How man times will "Hell" be printed to the console when this program is executed? Explain your answer.
    explanation:
        The program will print "Hell" two times to the console.
        This is because the fork() system call creates a new process (child process)
        that is a duplicate of the calling process (parent process).
        After the fork() call, both the parent and child processes will execute the printf("Hell\n");
        statement independently. Therefore, "Hell" will be printed once by the parent process and once by the child process,
        resulting in a total of two prints.
*/

void main()
{
    fork();
    printf("Hell\n");
}