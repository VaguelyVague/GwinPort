const readline = require("readline");
const flights = require("./flights");
const {
  getUniqueLocations,
  isValidLocation,
  searchFlightsByRoute,
  displayFlightsByRoute,
  formatLocation
} = require("./flightSearch");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function showHeader() {
  console.log("\n==============================================================");
  console.log("             GWINPORT AIRLINES FLIGHT SEARCH MODULE");
  console.log("==============================================================");
}

function showLocations() {
  const locations = getUniqueLocations(flights);
  console.log("\nAvailable Locations:");
  console.log(locations.join(", "));
}

function askOrigin() {
  rl.question("\nEnter Origin: ", (origin) => {
    if (!origin.trim()) {
      console.log("\nError: Origin is required.");
      return askOrigin();
    }

    if (!isValidLocation(origin, flights)) {
      console.log("\nError: Invalid origin. Please choose from the available locations.");
      return askOrigin();
    }

    askDestination(origin);
  });
}

function askDestination(origin) {
  rl.question("Enter Destination: ", (destination) => {
    if (!destination.trim()) {
      console.log("\nError: Destination is required.");
      return askDestination(origin);
    }

    if (!isValidLocation(destination, flights)) {
      console.log("\nError: Invalid destination. Please choose from the available locations.");
      return askDestination(origin);
    }

    if (origin.trim().toLowerCase() === destination.trim().toLowerCase()) {
      console.log("\nError: Origin and destination cannot be the same.");
      return askDestination(origin);
    }

    const results = searchFlightsByRoute(flights, origin, destination);
    displayFlightsByRoute(results, origin, destination);

    askSearchAgain();
  });
}

function askSearchAgain() {
  rl.question("\nDo you want to search again? (y/n): ", (answer) => {
    const response = answer.trim().toLowerCase();

    if (response === "y" || response === "yes") {
      startProgram();
    } else if (response === "n" || response === "no") {
      console.log("\nThank you for using Gwinport Airlines.");
      rl.close();
    } else {
      console.log("\nError: Please enter y or n only.");
      askSearchAgain();
    }
  });
}

function startProgram() {
  showHeader();
  showLocations();
  askOrigin();
}

startProgram();