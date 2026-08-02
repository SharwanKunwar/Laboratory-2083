#include <stdio.h>
#include <unistd.h>

/*
    Q.How man times will "hell" be printed to the console when this program is executed? Explain your answer.
    explanation:
        The program will print "hello" a total of 3 times to the console.
        This is because the first fork() creates a new process, resulting in 2 processes.
        The second fork() is executed by both processes, creating 2 more processes, resulting in a total of 4 processes.
        However, only the original process and the first child process will execute the printf("hello\n"); statement, as the second fork() is only executed by the original process and the first child process.
        Therefore, a total of 3 prints will occur: one from the original process and two from the first child process.


*/
void main()
{
    if (fork() && fork())
    {
        fork();
        printf("hello\n");
    }
}