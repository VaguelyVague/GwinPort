
package model;

import java.util.*;

public class BookingModel {
    private List<Booking> bookings = new ArrayList<>();

    public void addBooking(Booking booking){
        bookings.add(booking);
    }

    public boolean isDuplicate(String userId, String flightId, List<String> seats){
        for(Booking b : bookings){
            if(b.userId.equals(userId) && b.flightId.equals(flightId)){
                for(String s : seats){
                    if(b.seats.contains(s)) return true;
                }
            }
        }
        return false;
    }

    public List<Booking> getAllBookings(){
        return bookings;
    }
}
