package org.unpredictableXpractice.service;

import org.unpredictableXpractice.payment.PaymentServiceHelper;

public class PaymentService {
    PaymentServiceHelper paymentService;

    public PaymentService(PaymentServiceHelper paymentService) {
        this.paymentService = paymentService;
    }

    public void pay(){
        System.out.println("Payment service started");
        System.out.println("Payed by '"+paymentService.pay()+"'");
        System.out.println("Payment service finished");
    }
}
