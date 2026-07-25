package org.unpredictableXpractice.order;

import org.springframework.stereotype.Component;

@Component
public class OrderService
{
    public void placeOrder(){
        System.out.println("order placed");
    }
}
