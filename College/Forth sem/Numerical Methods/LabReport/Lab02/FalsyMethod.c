#include <stdio.h>
#include <math.h>

float f(float x)
{
    return x * x * x - 2 * x - 5; // Function
}

int main()
{
    float x1, x2, x3, Te;
    int i = 0;

pp:

    printf("Enter x1 = ");
    scanf("%f", &x1);

    printf("Enter x2 = ");
    scanf("%f", &x2);

    printf("Enter the tolerance error (Te) = ");
    scanf("%f", &Te);

    if (f(x1) * f(x2) > 0)
    {
        printf("\nThe function has no root in the given interval.\n");
        printf("Please enter another interval.\n\n");
        goto pp;
    }

    printf("\nIteration\t x1\t\t x2\t\t x3\t\t f(x3)\n");

    do
    {
        // False Position Formula
        x3 = (x1 * f(x2) - x2 * f(x1)) / (f(x2) - f(x1));

        printf("%d\t\t %.6f\t %.6f\t %.6f\t %.6f\n",
               ++i, x1, x2, x3, f(x3));

        if (f(x1) * f(x3) < 0)
        {
            x2 = x3;
        }
        else
        {
            x1 = x3;
        }

    } while (fabs(f(x3)) > Te);

    printf("\nApproximate Root = %.6f\n", x3);
    printf("f(%.6f) = %.6f\n", x3, f(x3));
    printf("Number of Iterations = %d\n", i);

    return 0;
}