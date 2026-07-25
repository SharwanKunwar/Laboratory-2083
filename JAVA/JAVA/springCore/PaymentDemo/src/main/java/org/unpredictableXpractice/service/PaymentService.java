package org.unpredictableXpractice.service;

import org.unpredictableXpractice.payment.PaymentServiceHelper;

public class PaymentService
{
    PaymentServiceHelper  payment;

    public PaymentService(PaymentServiceHelper payment) {
        this.payment = payment;
    }

    public void pay(){
        System.out.println("payment done by "+payment.pay());
    }
}
