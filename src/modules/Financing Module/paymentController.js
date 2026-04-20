import * as paymentModule from "../models/paymentModule.js";

export function makePayment(req) {
  return paymentModule.processPayment(req.bookingId, req.paymentDetails);
}