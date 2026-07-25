package org.unpredictableXpractice;

import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.unpredictableXpractice.config.AppConfig;
import org.unpredictableXpractice.order.OrderService;
import org.unpredictableXpractice.payment.PaymentService;

//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main {
    static void main()
    {
        ApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);

        PaymentService p1 = context.getBean(PaymentService.class);
        p1.pay();

        OrderService order = context.getBean(OrderService.class);
        order.placeOrder();
    }
}
