import * as bookingModule from "../models/bookingModule.js";

export function createBooking(req) {
  return bookingModule.createBooking(req);
}

export function confirmBooking(req) {
  return bookingModule.confirmBooking(req.bookingId);
}