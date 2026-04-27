import readline from "readline";
import {
  showFlights,
  createFlight,
  viewReport
} from "../controllers/adminController.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

export function showAdminMenu() {
  console.log(`
==== ADMIN PANEL ====
1. View Flights
2. Add Flight (stub)
3. View Reports (stub)
0. Exit
====================
  `);

  rl.question("Choose: ", async (choice) => {

    switch (choice) {
      case "1":
        await showFlights();
        break;

      case "2":
        console.log("Creating dummy flight...");
        await createFlight({
          flightId: "TEMP001",
          origin: "Cebu",
          destination: "Manila"
        });
        break;

      case "3":
        await viewReport();
        break;

      case "0":
        rl.close();
        return;

      default:
        console.log("Invalid choice.");
    }

    showAdminMenu();
  });
}