import { dataStore } from "./dataStore.js";
import { calculateFare } from "./fareModel.js";

export function processPayment(bookingId, paymentDetails) {
  const bookings = dataStore.getBookings();
  const booking = bookings.find(b => b.bookingId === bookingId);

  if (!booking) return { success: false };

  const fare = calculateFare(booking);

  if (paymentDetails.amountPaid < fare.total) {
    return { success: false, message: "Insufficient payment" };
  }

  booking.paymentStatus = "Paid";
  dataStore.saveBookings(bookings);

  return { success: true };
}