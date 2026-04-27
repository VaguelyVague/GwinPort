
package model;

import java.util.HashMap;
import java.util.Map;

public class SeatModel {
    private Map<String, Seat> seats = new HashMap<>();

    public void initializeSeats() {
        char[] rows = {'A','B','C'};
        int cols = 4;

        for(char r: rows){
            for(int i=1;i<=cols;i++){
                String seat = r + String.valueOf(i);
                seats.put(seat, new Seat(seat));
            }
        }
    }

    public Seat getSeat(String seatNumber){
        return seats.get(seatNumber);
    }

    public Map<String, Seat> getAllSeats(){
        return seats;
    }
}
