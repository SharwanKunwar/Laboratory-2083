#include <stdio.h>
#include <unistd.h>

/*
    Q.How man times will "Hell" be printed to the console when this program is executed? Explain your answer.
    explanation:
        The program will print "Hell" four times to the console.
        This is because the first fork() system call creates a new process (child process)
        that is a duplicate of the calling process (parent process).
        After the first fork() call, both the parent and child processes will execute the second fork() call independently.
        Each of these two processes will create another child process, resulting in a total of four processes (one parent and three children).
        Therefore, "Hell" will be printed once by each of the four processes, resulting in a total of four prints.

*/

void main()
{
    fork();
    fork();
    printf("Hell\n");
}