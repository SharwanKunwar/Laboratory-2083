package org.example.notification;

public class EmailNotificationService implements NotificationServiceHandler {
    @Override
    public String sendNotification() {
        return "Email";
    }
}
