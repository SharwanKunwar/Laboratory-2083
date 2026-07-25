package org.unpredictableXpractice.payment;

public class Stripe implements PaymentServiceHelper{
    @Override
    public String pay() {
        return "Stripe";
    }
}
