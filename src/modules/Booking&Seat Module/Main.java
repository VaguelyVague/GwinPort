
import model.*;
import controller.*;
import view.ConsoleView;
import java.util.*;

public class Main {

    public static void main(String[] args){

        SeatModel sm = new SeatModel();
        sm.initializeSeats();

        BookingModel bm = new BookingModel();
        SeatController sc = new SeatController(sm);
        BookingController bc = new BookingController(bm, sc);

        ConsoleView.showSeats(sm.getAllSeats());

        Booking b = bc.createBooking("User1","FL123", Arrays.asList("A1","A2"));

        if(b != null){
            ConsoleView.message("Booking Success: " + b.bookingReference);
            ConsoleView.message("Ticket: " + b.eTicket);
        } else {
            ConsoleView.message("Booking Failed");
        }

        ConsoleView.showSeats(sm.getAllSeats());
    }
}
