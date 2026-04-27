const BASE_URL = "http://localhost:8080/api/admin";

// implemented but needs further completion
export async function getFlights() {
  try {
    const res = await fetch(`${BASE_URL}/flights`);
    return await res.json();
  } catch (err) {
    console.log("Backend not connected yet.");
    return [];
  }
}

// not implemented yet
export async function addFlight(flightData) {
  console.log("TODO: Connect to backend API for adding flight");
  return { success: false, message: "Feature not yet implemented." };
}

// not implemented yet
export async function deleteFlight(flightId) {
  console.log("TODO: Connect to backend API for deleting flight");
  return { success: false, message: "Feature not yet implemented." };
}

// not implemented yet
export async function getReport() {
  console.log("TODO: Waiting for booking/payment modules");
  return { report: [] };
}