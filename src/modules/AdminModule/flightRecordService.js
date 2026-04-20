import { dataStore } from "../dataStore.js";

export function getAllBookings() {
  return dataStore.getBookings();
}

export function getAllTickets() {
  return dataStore.getTickets();
}

export function getAllReceipts() {
  return dataStore.getReceipts();
}

export function findBookingById(bookingId) {
  const bookings = dataStore.getBookings();
  return bookings.find(b => b.bookingId === bookingId) || null;
}