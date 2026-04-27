
package model;

public class Seat {
    public String seatNumber;
    public String status; // available, locked, booked
    public String lockedBy;
    public long lockTimestamp;

    public Seat(String seatNumber) {
        this.seatNumber = seatNumber;
        this.status = "available";
        this.lockedBy = null;
        this.lockTimestamp = 0;
    }
}
