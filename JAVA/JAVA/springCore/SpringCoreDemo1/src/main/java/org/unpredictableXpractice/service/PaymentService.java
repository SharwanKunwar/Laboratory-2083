package org.unpredictableXpractice.service;

import org.springframework.stereotype.Component;
import org.unpredictableXpractice.payment.PaymentServiceHandler;

@Component
public class PaymentService
{
    public void pay(){
        System.out.println("Payment done");
    }
}
