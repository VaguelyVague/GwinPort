
package controller;

import model.Seat;
import model.SeatModel;

public class SeatController {

    private SeatModel seatModel;
    private final long LOCK_DURATION = 5 * 60 * 1000;

    public SeatController(SeatModel seatModel){
        this.seatModel = seatModel;
    }

    private boolean isExpired(Seat seat){
        if(seat.lockTimestamp == 0) return true;
        return System.currentTimeMillis() - seat.lockTimestamp > LOCK_DURATION;
    }

    public String selectSeat(String userId, String seatNumber){
        Seat s = seatModel.getSeat(seatNumber);

        if(s == null) return "Invalid seat";

        if(s.status.equals("booked")) return "Already booked";

        if(s.status.equals("locked") && !isExpired(s))
            return "Seat locked";

        s.status = "locked";
        s.lockedBy = userId;
        s.lockTimestamp = System.currentTimeMillis();

        return "Seat locked";
    }

    public void bookSeat(String seatNumber){
        Seat s = seatModel.getSeat(seatNumber);
        s.status = "booked";
        s.lockedBy = null;
        s.lockTimestamp = 0;
    }
}
