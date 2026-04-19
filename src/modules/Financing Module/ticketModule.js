import { dataStore } from "./dataStore.js";
import { generateId } from "./utils.js";
import { calculateFare } from "./fareModule.js";

export function generateTicket(bookingId) {
  const bookings = dataStore.getBookings();
  const tickets = dataStore.getTickets();

  const booking = bookings.find(b => b.bookingId === bookingId);

  if (!booking) {
    return { success: false, message: "Booking not found." };
  }

  if (booking.bookingStatus !== "Confirmed") {
    return { success: false, message: "Booking is not confirmed." };
  }

  const ticket = {
    ticketId: generateId("TICKET"),
    bookingId: booking.bookingId,
    passengerName: booking.passengerName,
    origin: booking.origin,
    destination: booking.destination,
    departureDate: booking.departureDate,
    travelClass: booking.travelClass,
    passengers: booking.passengers,
    issuedAt: new Date().toISOString()
  };

  tickets.push(ticket);
  dataStore.saveTickets(tickets);

  return {
    success: true,
    message: "E-ticket generated successfully.",
    ticket
  };
}

export function generateReceipt(bookingId) {
  const bookings = dataStore.getBookings();
  const receipts = dataStore.getReceipts();

  const booking = bookings.find(b => b.bookingId === bookingId);

  if (!booking) {
    return { success: false, message: "Booking not found." };
  }

  if (booking.paymentStatus !== "Paid") {
    return { success: false, message: "Payment not completed." };
  }

  const fare = calculateFare(booking);

  const receipt = {
    receiptId: generateId("RCPT"),
    bookingId: booking.bookingId,
    passengerName: booking.passengerName,
    paymentId: booking.paymentInfo?.paymentId || null,
    totalAmount: fare.total,
    issuedAt: new Date().toISOString()
  };

  receipts.push(receipt);
  dataStore.saveReceipts(receipts);

  return {
    success: true,
    message: "Receipt generated successfully.",
    receipt
  };
}

export function viewTicket(ticketId) {
  const tickets = dataStore.getTickets();
  const ticket = tickets.find(t => t.ticketId === ticketId);

  if (!ticket) {
    return { success: false, message: "Ticket not found." };
  }

  return {
    success: true,
    ticket
  };
}

export function downloadTicket(ticketId) {
  const result = viewTicket(ticketId);

  if (!result.success) {
    return result;
  }

  const ticket = result.ticket;

  const content = `
E-TICKET
--------------------------
Ticket ID: ${ticket.ticketId}
Booking ID: ${ticket.bookingId}
Passenger: ${ticket.passengerName}
Route: ${ticket.origin} -> ${ticket.destination}
Departure Date: ${ticket.departureDate}
Class: ${ticket.travelClass}
Passengers: ${ticket.passengers}
Issued At: ${ticket.issuedAt}
  `.trim();

  const blob = new Blob([content], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${ticket.ticketId}.txt`;
  link.click();

  return {
    success: true,
    message: "Ticket downloaded successfully."
  };
}