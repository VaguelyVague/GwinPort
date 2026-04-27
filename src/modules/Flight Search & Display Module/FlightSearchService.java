import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;

public class FlightSearchService {
    private List<Flight> flights;

    public FlightSearchService() {
        flights = new ArrayList<>();
        loadFlights();
    }

    private void loadFlights() {
        flights.add(new Flight("GW101", "Cebu", "Manila", "2026-04-28", "08:00 AM", "09:30 AM", 2500, 50, 20));
        flights.add(new Flight("GW105", "Cebu", "Manila", "2026-04-29", "02:00 PM", "03:30 PM", 2700, 50, 45));
        flights.add(new Flight("GW102", "Cebu", "Davao", "2026-04-28", "01:00 PM", "02:20 PM", 2200, 40, 10));
        flights.add(new Flight("GW103", "Manila", "Cebu", "2026-04-28", "10:00 AM", "11:30 AM", 2400, 45, 45));
        flights.add(new Flight("GW104", "Cebu", "Iloilo", "2026-04-28", "03:00 PM", "04:00 PM", 1800, 35, 12));
        flights.add(new Flight("GW106", "Davao", "Cebu", "2026-04-28", "09:00 AM", "10:20 AM", 2100, 30, 5));
    }

    public Set<String> getAvailableLocations() {
        Set<String> locations = new TreeSet<>();

        for (Flight flight : flights) {
            locations.add(flight.getOrigin());
            locations.add(flight.getDestination());
        }

        return locations;
    }

    public boolean isValidLocation(String location) {
        for (String availableLocation : getAvailableLocations()) {
            if (availableLocation.equalsIgnoreCase(location.trim())) {
                return true;
            }
        }
        return false;
    }

    public List<Flight> searchFlightsByRoute(String origin, String destination) {
        List<Flight> results = new ArrayList<>();

        for (Flight flight : flights) {
            if (flight.getOrigin().equalsIgnoreCase(origin.trim()) &&
                flight.getDestination().equalsIgnoreCase(destination.trim())) {
                results.add(flight);
            }
        }

        return results;
    }
    
    public List<Flight> searchFlights(String origin, String destination, String date) {
        List<Flight> results = new ArrayList<>();

        for (Flight flight : flights) {
            if (flight.getOrigin().equalsIgnoreCase(origin.trim()) &&
                flight.getDestination().equalsIgnoreCase(destination.trim()) &&
                flight.getDate().equals(date.trim())) {
                results.add(flight);
            }
        }

        return results;
    }

    public String formatLocation(String location) {
        location = location.trim().toLowerCase();
        return location.substring(0, 1).toUpperCase() + location.substring(1);
    }
}