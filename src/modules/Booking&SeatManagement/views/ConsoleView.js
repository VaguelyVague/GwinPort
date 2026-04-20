class ConsoleView {
    static displaySeats(seats) {
        console.log("\nSeat Map:");
        Object.values(seats).forEach(seat => {
            console.log(`${seat.seatNumber}: ${seat.status}`);
        });
    }

    static showMessage(message) {
        console.log(message);
    }

    static showBooking(booking) {
        console.log("\nBooking Successful!");
        console.log(`Reference: ${booking.bookingReference}`);
        console.log(`Seats: ${booking.seats.join(', ')}`);
    }
}

module.exports = ConsoleView;
