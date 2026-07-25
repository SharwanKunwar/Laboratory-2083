package org.example;

import org.example.notification.EmailNotificationService;
import org.example.notification.NotificationServiceHandler;
import org.example.service.OrderService;

//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main {
    static void main() {
        NotificationServiceHandler n1 = new EmailNotificationService();
        OrderService order =  new OrderService(n1);
        order.placeOrder("Monitor");
    }
}
