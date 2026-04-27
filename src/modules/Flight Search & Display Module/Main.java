import java.util.List;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        FlightSearchService service = new FlightSearchService();

        boolean running = true;

        while (running) {
            showHeader();
            showLocations(service);

            System.out.print("\nEnter Origin: ");
            String origin = scanner.nextLine();

            while (origin.trim().isEmpty() || !service.isValidLocation(origin)) {
                System.out.println("Error: Invalid origin. Please choose from the available locations.");
                System.out.print("Enter Origin: ");
                origin = scanner.nextLine();
            }

            System.out.print("Enter Destination: ");
            String destination = scanner.nextLine();

            while (destination.trim().isEmpty() ||
                   !service.isValidLocation(destination) ||
                   origin.trim().equalsIgnoreCase(destination.trim())) {

                if (origin.trim().equalsIgnoreCase(destination.trim())) {
                    System.out.println("Error: Origin and destination cannot be the same.");
                } else {
                    System.out.println("Error: Invalid destination. Please choose from the available locations.");
                }

                System.out.print("Enter Destination: ");
                destination = scanner.nextLine();
            }

            System.out.print("Enter Date (YYYY-MM-DD): ");
            String date = scanner.nextLine();

            while (date.trim().isEmpty()) {
                System.out.println("Error: Date is required.");
                System.out.print("Enter Date (YYYY-MM-DD): ");
                date = scanner.nextLine();
            }

            List<Flight> results = service.searchFlights(origin, destination, date);
            displayFlights(results, origin, destination, date, service);

            System.out.print("\nDo you want to search again? (y/n): ");
            String choice = scanner.nextLine();

            while (!choice.equalsIgnoreCase("y") && !choice.equalsIgnoreCase("n")) {
                System.out.println("Error: Invalid input. Please enter 'y' or 'n'.");
                System.out.print("Do you want to search again? (y/n): ");
                choice = scanner.nextLine();
            }

            if (!choice.equalsIgnoreCase("y")) {
                running = false;
                System.out.println("\nThank you for using Gwinport Airlines.");
            }
        }

        scanner.close();
    }

    public static void showHeader() {
        System.out.println("\n==============================================================");
        System.out.println("             GWINPORT AIRLINES FLIGHT SEARCH MODULE");
        System.out.println("==============================================================");
    }

    public static void showLocations(FlightSearchService service) {
        System.out.println("\nAvailable Locations:");
        System.out.println(String.join(", ", service.getAvailableLocations()));
    }

    public static void displayFlights(List<Flight> results, String origin, String destination,
                                      String date, FlightSearchService service) {
        System.out.println("\n==============================================================");
        System.out.println("AVAILABLE FLIGHTS: "
                + service.formatLocation(origin) + " to "
                + service.formatLocation(destination)
                + " on " + date);
        System.out.println("==============================================================");

        if (results.isEmpty()) {
            System.out.println("No available flights found for this route and date.");
            return;
        }

        System.out.println("No. | Flight ID | Date       | Departure | Arrival | Fare     | Seats | Status");
        System.out.println("----|-----------|------------|-----------|---------|----------|-------|----------------");

        int count = 1;

        for (Flight flight : results) {
            System.out.printf(
                    "%-3d | %-9s | %-10s | %-9s | %-7s | PHP %-4d | %-5d | %s%n",
                    count,
                    flight.getFlightId(),
                    flight.getDate(),
                    flight.getDepartureTime(),
                    flight.getArrivalTime(),
                    flight.getFare(),
                    flight.getAvailableSeats(),
                    flight.getStatus()
            );
            count++;
        }
    }
}