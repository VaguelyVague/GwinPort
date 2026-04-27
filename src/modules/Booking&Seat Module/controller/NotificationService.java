
package controller;

public class NotificationService {

    public void sendConfirmation(String user, String ref){
        System.out.println("Notification sent to " + user + " for booking " + ref);
    }
}
