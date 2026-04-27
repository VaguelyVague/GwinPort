import * as adminService from "../services/adminService.js";

export async function showFlights() {
  const flights = await adminService.getFlights();

  if (!flights || flights.length === 0) {
    console.log("No flights available or backend not connected.");
    return;
  }

  console.log("\nFlights:");
  console.table(flights);
}

export async function createFlight(data) {
  const result = await adminService.addFlight(data);
  console.log(result.message);
}

export async function removeFlight(id) {
  const result = await adminService.deleteFlight(id);
  console.log(result.message);
}

export async function viewReport() {
  const report = await adminService.getReport();

  if (!report || report.length === 0) {
    console.log("Report not available yet.");
    return;
  }

  console.table(report);
}