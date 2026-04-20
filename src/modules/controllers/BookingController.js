class BookingController {
    constructor(bookingModel, seatController) {
        this.bookingModel = bookingModel;
        this.seatController = seatController;
    }

    generateBookingReference() {
        return 'BK-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    }

    validateBooking(userId, flightId, seatNumbers) {
        const uniqueSeats = new Set(seatNumbers);
        if (uniqueSeats.size !== seatNumbers.length) {
            return { success: false, message: "Duplicate seats selected." };
        }

        if (this.bookingModel.isDuplicate(userId, flightId, seatNumbers)) {
            return { success: false, message: "Duplicate booking detected." };
        }

        return { success: true };
    }

    createBooking(userId, flightId, seatNumbers) {
        const validation = this.validateBooking(userId, flightId, seatNumbers);
        if (!validation.success) return validation;

        for (let seat of seatNumbers) {
            const result = this.seatController.selectSeat(userId, seat);
            if (!result.success) return result;
        }

        seatNumbers.forEach(seat => this.seatController.bookSeat(seat));

        const booking = {
            userId,
            flightId,
            seats: seatNumbers,
            bookingReference: this.generateBookingReference(),
            createdAt: new Date()
        };

        this.bookingModel.addBooking(booking);

        return { success: true, booking };
    }
}

module.exports = BookingController;
