class BookingModel {
    constructor() {
        this.bookings = [];
    }

    addBooking(booking) {
        this.bookings.push(booking);
    }

    isDuplicate(userId, flightId, seatNumbers) {
        return this.bookings.some(b =>
            b.userId === userId &&
            b.flightId === flightId &&
            seatNumbers.some(seat => b.seats.includes(seat))
        );
    }

    getAllBookings() {
        return this.bookings;
    }
}

module.exports = BookingModel;
