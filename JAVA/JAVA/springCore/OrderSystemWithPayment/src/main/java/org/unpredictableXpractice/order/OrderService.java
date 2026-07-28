package org.unpredictableXpractice.order;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.unpredictableXpractice.payment.PaymentServiceHelper;

@Component
public class OrderService
{
    private final PaymentServiceHelper payment;

    @Autowired
    public OrderService(@Qualifier("Eswa") PaymentServiceHelper payment)
    {
        this.payment = payment;
    }

    public void placeOrder()
    {
        System.out.println("Placing order...");
        System.out.println("Payed by "+payment.pay());
        System.out.println("Order placed...");
    }
}
