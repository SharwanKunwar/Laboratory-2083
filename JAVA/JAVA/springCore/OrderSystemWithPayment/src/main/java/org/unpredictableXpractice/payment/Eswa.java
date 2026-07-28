package org.unpredictableXpractice.payment;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

@Component
@Qualifier("Eswa")
public class Eswa implements PaymentServiceHelper
{
    @Override
    public String pay() {
        return "Eswa";
    }
}
