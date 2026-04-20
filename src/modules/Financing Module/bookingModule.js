import { dataStore } from "./dataStore.js";
import { generateId } from "../utils.js";

export function createBooking(data) {
  const bookings = dataStore.getBookings();

  const booking = {
    bookingId: generateId("BOOK"),
    ...data,
    paymentStatus: "Pending",
    bookingStatus: "Pending"
  };

  bookings.push(booking);
  dataStore.saveBookings(bookings);

  return booking;
}

export function confirmBooking(bookingId) {
  const bookings = dataStore.getBookings();
  const booking = bookings.find(b => b.bookingId === bookingId);

  if (!booking || booking.paymentStatus !== "Paid") {
    return { success: false };
  }

  booking.bookingStatus = "Confirmed";
  dataStore.saveBookings(bookings);

  return { success: true, booking };
}