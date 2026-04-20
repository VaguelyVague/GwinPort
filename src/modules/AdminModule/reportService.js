//this will create the reports
import { dataStore } from "../dataStore.js";

export function generateBookingReport() {
  const bookings = dataStore.getBookings();

  return {
    total: bookings.length,
    confirmed: bookings.filter(b => b.bookingStatus === "Confirmed").length,
    pending: bookings.filter(b => b.bookingStatus === "Pending").length
  };
}

export function generateRevenueReport() {
  const bookings = dataStore.getBookings();

  let revenue = 0;

  bookings.forEach(b => {
    if (b.paymentStatus === "Paid") {
      revenue += b.baseFare * b.passengers;
    }
  });

  return { totalRevenue: revenue };
}