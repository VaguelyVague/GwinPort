import { createBooking, confirmBookingAfterPayment } from "./bookingModule.js";
import { calculateFare } from "./fareModule.js";
import { processPayment } from "./paymentModule.js";
import { generateTicket, generateReceipt, viewTicket, downloadTicket } from "./ticketModule.js";

const booking = createBooking({
  passengerName: "Juan Dela Cruz",
  origin: "Cagayan de Oro",
  destination: "Manila",
  departureDate: "2026-05-01",
  baseFare: 1500,
  passengers: 2,
  travelClass: "Business",
  extraBaggage: 1,
  insurance: true
});

console.log("Booking:", booking);

const fare = calculateFare(booking);
console.log("Fare:", fare);

const paymentResult = processPayment(booking.bookingId, {
  method: "GCash",
  amountPaid: fare.total,
  gcashNumber: "09171234567"
});
console.log("Payment:", paymentResult);

const confirmResult = confirmBookingAfterPayment(booking.bookingId);
console.log("Confirmation:", confirmResult);

const ticketResult = generateTicket(booking.bookingId);
console.log("Ticket:", ticketResult);

const receiptResult = generateReceipt(booking.bookingId);
console.log("Receipt:", receiptResult);

const ticketView = viewTicket(ticketResult.ticket.ticketId);
console.log("View Ticket:", ticketView);

// optional
// downloadTicket(ticketResult.ticket.ticketId);