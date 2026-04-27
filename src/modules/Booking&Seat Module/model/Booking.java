
package model;

import java.util.List;

public class Booking {
    public String userId;
    public String flightId;
    public List<String> seats;
    public String bookingReference;
    public String paymentStatus;
    public String eTicket;

    public Booking(String userId, String flightId, List<String> seats, String bookingReference){
        this.userId = userId;
        this.flightId = flightId;
        this.seats = seats;
        this.bookingReference = bookingReference;
        this.paymentStatus = "Pending";
        this.eTicket = null;
    }
}
