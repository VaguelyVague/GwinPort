import jakarta.persistence.*;

@Entity
public class Flight {

    @Id
    private String flightId;

    private String origin;
    private String destination;
    private double fare;

    // getters & setters
}