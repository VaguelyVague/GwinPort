export const dataStore = {
  getBookings() {
    return JSON.parse(localStorage.getItem("bookings")) || [];
  },

  saveBookings(bookings) {
    localStorage.setItem("bookings", JSON.stringify(bookings));
  },

  getTickets() {
    return JSON.parse(localStorage.getItem("tickets")) || [];
  },

  saveTickets(tickets) {
    localStorage.setItem("tickets", JSON.stringify(tickets));
  },

  getReceipts() {
    return JSON.parse(localStorage.getItem("receipts")) || [];
  },

  saveReceipts(receipts) {
    localStorage.setItem("receipts", JSON.stringify(receipts));
  }
};