import { dataStore } from "./dataStore.js";
import { generateId } from "./utils.js";

export function createBooking(bookingData) {
  const bookings = dataStore.getBookings();

  const booking = {
    bookingId: generateId("BOOK"),
    passengerName: bookingData.passengerName,
    origin: bookingData.origin,
    destination: bookingData.destination,
    departureDate: bookingData.departureDate,
    baseFare: bookingData.baseFare,
    passengers: bookingData.passengers || 1,
    travelClass: bookingData.travelClass || "Economy",
    extraBaggage: bookingData.extraBaggage || 0,
    insurance: bookingData.insurance || false,
    paymentStatus: "Pending",
    bookingStatus: "Pending"
  };

  bookings.push(booking);
  dataStore.saveBookings(bookings);

  return booking;
}

export function confirmBookingAfterPayment(bookingId) {
  const bookings = dataStore.getBookings();
  const booking = bookings.find(b => b.bookingId === bookingId);

  if (!booking) {
    return { success: false, message: "Booking not found." };
  }

  if (booking.paymentStatus !== "Paid") {
    return { success: false, message: "Booking cannot be confirmed. Payment not completed." };
  }

  booking.bookingStatus = "Confirmed";
  dataStore.saveBookings(bookings);

  return {
    success: true,
    message: "Booking confirmed successfully.",
    booking
  };
}