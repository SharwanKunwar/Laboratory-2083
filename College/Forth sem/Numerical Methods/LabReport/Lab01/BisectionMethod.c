#include <stdio.h>
#include <math.h>

double f(double x)
{
    return x * x * x - 4 * x - 9;
}

int main()
{
    double a = 2.0, b = 3.0, c;
    int n = 1;

    printf("%-4s %-10s %-10s %-10s %-10s %-10s %-10s\n",
           "n", "a", "b", "c", "f(a)", "f(b)", "f(c)");
    printf("-----------------------------------------------------------------------\n");

    while ((b - a) / 2.0 > 0.00005)
    {
        c = (a + b) / 2.0;

        printf("%-4d %-10.4f %-10.4f %-10.4f %-10.4f %-10.4f %-10.4f\n",
               n, a, b, c, f(a), f(b), f(c));

        if (f(a) * f(c) < 0)
            b = c;
        else
            a = c;

        n++;
    }

    c = (a + b) / 2.0;

    printf("\nRoot ≈ %.4f\n", c);

    return 0;
}