package org.unpredictableXpractice.payment;

public class PhonePay implements PaymentServiceHelper
{
    @Override
    public String pay() {
        return "PhonePay";
    }
}
