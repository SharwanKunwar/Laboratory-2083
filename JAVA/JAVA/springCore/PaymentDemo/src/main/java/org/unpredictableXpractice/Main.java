package org.unpredictableXpractice;

import org.unpredictableXpractice.payment.Eswa;
import org.unpredictableXpractice.payment.PaymentServiceHelper;
import org.unpredictableXpractice.payment.Stripe;
import org.unpredictableXpractice.service.OrderService;
import org.unpredictableXpractice.service.PaymentService;

public class Main {
    static void main()
    {
        System.out.println("Payment service practice");
        PaymentServiceHelper payment = new Eswa();
        OrderService orderService = new OrderService();
        orderService.placeOrder("monitor");

        PaymentService ps = new PaymentService(payment);
        ps.pay();
    }
}
