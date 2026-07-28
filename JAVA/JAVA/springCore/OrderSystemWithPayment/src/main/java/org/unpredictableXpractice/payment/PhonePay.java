package org.unpredictableXpractice.payment;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

@Component
@Qualifier("PhonePay")
public class PhonePay implements PaymentServiceHelper{
    @Override
    public String pay() {
        return "Phone Pay";
    }
}
