import { dataStore } from "./dataStore.js";
import { generateId, formatCurrency } from "./utils.js";
import { calculateFare } from "./fareModule.js";

export function validatePayment(paymentDetails) {
  const { method, amountPaid, cardNumber, gcashNumber } = paymentDetails;

  if (!method) {
    return { valid: false, message: "Payment method is required." };
  }

  if (!amountPaid || amountPaid <= 0) {
    return { valid: false, message: "Amount paid must be greater than 0." };
  }

  if (method === "Card") {
    if (!cardNumber || cardNumber.length < 12) {
      return { valid: false, message: "Invalid card number." };
    }
  }

  if (method === "GCash") {
    if (!gcashNumber || gcashNumber.length !== 11) {
      return { valid: false, message: "Invalid GCash number." };
    }
  }

  return { valid: true, message: "Payment details are valid." };
}

export function processPayment(bookingId, paymentDetails) {
  const bookings = dataStore.getBookings();
  const booking = bookings.find(b => b.bookingId === bookingId);

  if (!booking) {
    return { success: false, message: "Booking not found." };
  }

  const validation = validatePayment(paymentDetails);
  if (!validation.valid) {
    return { success: false, message: validation.message };
  }

  const fare = calculateFare(booking);

  if (paymentDetails.amountPaid < fare.total) {
    return {
      success: false,
      message: `Insufficient payment. Total amount is ${formatCurrency(fare.total)}`
    };
  }

  const paymentId = generateId("PAY");
  const change = paymentDetails.amountPaid - fare.total;

  booking.paymentStatus = "Paid";
  booking.paymentInfo = {
    paymentId,
    method: paymentDetails.method,
    amountPaid: paymentDetails.amountPaid,
    paidAt: new Date().toISOString()
  };

  dataStore.saveBookings(bookings);

  return {
    success: true,
    message: "Payment successful.",
    paymentId,
    change,
    formattedChange: formatCurrency(change)
  };
}