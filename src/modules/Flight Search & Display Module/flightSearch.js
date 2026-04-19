function normalizeText(text) {
  return text.trim().toLowerCase();
}

function formatLocation(text) {
  const cleaned = text.trim().toLowerCase();
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

function getAvailableSeats(flight) {
  return flight.totalSeats - flight.bookedSeats;
}

function getFlightStatus(flight) {
  const availableSeats = getAvailableSeats(flight);

  if (availableSeats === 0) {
    return "Fully Booked";
  } else if (availableSeats <= 10) {
    return "Few Seats Left";
  } else {
    return "Available";
  }
}

function getUniqueLocations(flights) {
  const locations = new Set();

  flights.forEach((flight) => {
    locations.add(flight.origin);
    locations.add(flight.destination);
  });

  return Array.from(locations).sort();
}

function isValidLocation(input, flights) {
  const locations = getUniqueLocations(flights).map((location) =>
    location.toLowerCase()
  );

  return locations.includes(normalizeText(input));
}

function searchFlightsByRoute(flights, origin, destination) {
  return flights.filter((flight) => {
    return (
      normalizeText(flight.origin) === normalizeText(origin) &&
      normalizeText(flight.destination) === normalizeText(destination)
    );
  });
}

function sortFlightsByDateAndTime(results) {
  return results.sort((a, b) => {
    if (a.date === b.date) {
      return a.departureTime.localeCompare(b.departureTime);
    }
    return a.date.localeCompare(b.date);
  });
}

function displayFlightsByRoute(results, origin, destination) {
  const cleanOrigin = formatLocation(origin);
  const cleanDestination = formatLocation(destination);

  console.log(`\n==============================================================`);
  console.log(`AVAILABLE FLIGHTS: ${cleanOrigin} to ${cleanDestination}`);
  console.log(`==============================================================`);

  if (results.length === 0) {
    console.log("No available flights found for this route.");
    return;
  }

  const sortedResults = sortFlightsByDateAndTime(results);

  console.log(
    "No. | Flight ID | Date       | Departure | Arrival | Fare     | Seats | Status"
  );
  console.log(
    "----|-----------|------------|-----------|---------|----------|-------|----------------"
  );

  sortedResults.forEach((flight, index) => {
    const number = String(index + 1).padEnd(3);
    const flightId = String(flight.flightId).padEnd(9);
    const date = String(flight.date).padEnd(10);
    const departure = String(flight.departureTime).padEnd(9);
    const arrival = String(flight.arrivalTime).padEnd(7);
    const fare = (`PHP ${flight.fare}`).padEnd(8);
    const seats = String(getAvailableSeats(flight)).padEnd(5);
    const status = getFlightStatus(flight);

    console.log(
      `${number}| ${flightId} | ${date} | ${departure} | ${arrival} | ${fare} | ${seats} | ${status}`
    );
  });
}

module.exports = {
  normalizeText,
  formatLocation,
  getAvailableSeats,
  getFlightStatus,
  getUniqueLocations,
  isValidLocation,
  searchFlightsByRoute,
  displayFlightsByRoute
};