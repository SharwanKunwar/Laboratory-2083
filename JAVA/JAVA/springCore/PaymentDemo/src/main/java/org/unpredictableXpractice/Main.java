package org.unpredictableXpractice;

import org.unpredictableXpractice.payment.PaymentServiceHelper;
import org.unpredictableXpractice.payment.Stripe;
import org.unpredictableXpractice.service.OrderService;

public class Main {
    static void main()
    {
        System.out.println("Payment service practice");
        PaymentServiceHelper payment = new Stripe();
        OrderService orderService = new OrderService(payment);
        orderService.pay();
    }
}
