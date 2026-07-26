package org.unpredictableXpractice;

import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.unpredictableXpractice.config.AppConfig;
import org.unpredictableXpractice.payment.Eswa;
import org.unpredictableXpractice.payment.PaymentServiceHandler;
import org.unpredictableXpractice.service.OrderService;
import org.unpredictableXpractice.service.PaymentService;


public class Main {
    static void main() throws InterruptedException
    {
        ApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);

        //order
        OrderService orderService = context.getBean(OrderService.class);
        orderService.placeOrder();
    }
}
