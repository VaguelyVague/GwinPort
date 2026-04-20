//This will have the CRUD feature on flights
import flights from "../flights.js";

//Create
export function addFlight(newFlight) {
  flights.push(newFlight);
  return { success: true, message: "Flight added.", flight: newFlight };
}

//Read
export function getAllFlights() {
  return flights;
}

//Update
export function updateFlight(flightId, updatedData) {
  const flight = flights.find(f => f.flightId === flightId);

  if (!flight) return { success: false, message: "Flight not found." };

  Object.assign(flight, updatedData);
  return { success: true, message: "Flight updated.", flight };
}

//Delete
export function deleteFlight(flightId) {
  const index = flights.findIndex(f => f.flightId === flightId);

  if (index === -1) return { success: false, message: "Flight not found." };

  const removed = flights.splice(index, 1);
  return { success: true, message: "Flight deleted.", flight: removed[0] };
}