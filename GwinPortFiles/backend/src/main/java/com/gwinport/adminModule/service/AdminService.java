import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AdminService {

    @Autowired
    private FlightRepository flightRepo;

    public List<Flight> getAllFlights() {
        return flightRepo.findAll();
    }

    public Flight addFlight(Flight flight) {
        return flightRepo.save(flight);
    }

    public void deleteFlight(String id) {
        flightRepo.deleteById(id);
    }
}