import * as flightService from "../services/flightAdminService.js";
import * as recordService from "../services/recordService.js";
import * as reportService from "../services/reportService.js";

export const adminController = {
  addFlight: (data) => flightService.addFlight(data),
  getFlights: () => flightService.getAllFlights(),

  getBookings: () => recordService.getAllBookings(),

  bookingReport: () => reportService.generateBookingReport(),
  revenueReport: () => reportService.generateRevenueReport()
};