package org.unpredictableXpractice;

import org.unpredictableXpractice.payment.Eswa;
import org.unpredictableXpractice.payment.PaymentServiceHelper;
import org.unpredictableXpractice.payment.Stripe;
import org.unpredictableXpractice.service.PaymentService;

public class Main {
    static void main()
    {
        System.out.println("Payment service practice");
        PaymentServiceHelper payment = new Stripe();
        PaymentService  paymentService = new PaymentService(payment);
        paymentService.pay();
    }
}
