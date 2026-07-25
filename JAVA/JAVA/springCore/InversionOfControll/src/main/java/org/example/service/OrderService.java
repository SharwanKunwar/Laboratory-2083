package org.example.service;

import org.example.notification.NotificationServiceHandler;

public class OrderService {
    NotificationServiceHandler notification;

    public OrderService(NotificationServiceHandler notification) {
        this.notification = notification;
    }

    public void placeOrder(String item){
        System.out.println("Placing order...");
        System.out.println("check your "+notification.sendNotification());
        System.out.println("ordered item is : "+item);
        System.out.println("Your Order is placed.");
    }
}
