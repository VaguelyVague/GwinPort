public class Flight {
    private String flightId;
    private String origin;
    private String destination;
    private String date;
    private String departureTime;
    private String arrivalTime;
    private int fare;
    private int totalSeats;
    private int bookedSeats;

    public Flight(String flightId, String origin, String destination, String date,
                  String departureTime, String arrivalTime, int fare,
                  int totalSeats, int bookedSeats) {
        this.flightId = flightId;
        this.origin = origin;
        this.destination = destination;
        this.date = date;
        this.departureTime = departureTime;
        this.arrivalTime = arrivalTime;
        this.fare = fare;
        this.totalSeats = totalSeats;
        this.bookedSeats = bookedSeats;
    }

    public String getFlightId() {
        return flightId;
    }

    public String getOrigin() {
        return origin;
    }

    public String getDestination() {
        return destination;
    }

    public String getDate() {
        return date;
    }

    public String getDepartureTime() {
        return departureTime;
    }

    public String getArrivalTime() {
        return arrivalTime;
    }

    public int getFare() {
        return fare;
    }

    public int getAvailableSeats() {
        return totalSeats - bookedSeats;
    }

    public String getStatus() {
        int seats = getAvailableSeats();

        if (seats == 0) {
            return "Fully Booked";
        } else if (seats <= 10) {
            return "Few Seats Left";
        } else {
            return "Available";
        }
    }
}