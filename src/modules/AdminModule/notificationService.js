export function sendBookingConfirmation(booking) {
  console.log(`Notification: Booking confirmed for ${booking.passengerName}`);
}

export function sendPaymentNotification(booking) {
  console.log(`Notification: Payment received for booking ${booking.bookingId}`);
}

export function sendFlightUpdateNotification(flight) {
  console.log(`Notification: Flight ${flight.flightId} has been updated.`);
}