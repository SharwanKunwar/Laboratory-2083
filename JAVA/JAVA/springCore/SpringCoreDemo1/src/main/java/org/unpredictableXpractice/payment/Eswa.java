package org.unpredictableXpractice.payment;

import org.unpredictableXpractice.service.PaymentService;

public class Eswa implements PaymentServiceHandler
{
    @Override
    public String pay() {
        return "Eswa";
    }
}
