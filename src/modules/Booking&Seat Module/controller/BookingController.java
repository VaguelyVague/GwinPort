
package controller;

import model.*;
import java.util.*;

public class BookingController {

    private BookingModel bookingModel;
    private SeatController seatController;

    private PaymentService paymentService = new PaymentService();
    private FareService fareService = new FareService();
    private TicketService ticketService = new TicketService();
    private NotificationService notificationService = new NotificationService();

    public BookingController(BookingModel bookingModel, SeatController seatController){
        this.bookingModel = bookingModel;
        this.seatController = seatController;
    }

    public String generateBookingReference(){
        return "BK-" + UUID.randomUUID().toString().substring(0,6).toUpperCase();
    }

    public Booking createBooking(String userId, String flightId, List<String> seats){

        if(new HashSet<>(seats).size() != seats.size()) return null;
        if(bookingModel.isDuplicate(userId, flightId, seats)) return null;

        for(String s: seats){
            if(!seatController.selectSeat(userId, s).contains("locked"))
                return null;
        }

        double fare = fareService.calculateFare(seats.size());
        System.out.println("Fare: " + fare);

        if(!paymentService.processPayment(fare)){
            System.out.println("Payment failed");
            return null;
        }

        for(String s: seats){
            seatController.bookSeat(s);
        }

        String ref = generateBookingReference();
        Booking b = new Booking(userId, flightId, seats, ref);
        b.paymentStatus = "Paid";
        b.eTicket = ticketService.generateTicket(ref);

        bookingModel.addBooking(b);
        notificationService.sendConfirmation(userId, ref);

        return b;
    }
}
