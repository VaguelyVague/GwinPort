class SeatController {
    constructor(seatModel) {
        this.seatModel = seatModel;
        this.LOCK_DURATION = 5 * 60 * 1000;
    }

    isLockExpired(seat) {
        if (!seat.lockTimestamp) return true;
        return (Date.now() - seat.lockTimestamp) > this.LOCK_DURATION;
    }

    selectSeat(userId, seatNumber) {
        const seat = this.seatModel.getSeat(seatNumber);

        if (!seat) return { success: false, message: "Invalid seat." };

        if (seat.status === 'booked') {
            return { success: false, message: "Seat already booked." };
        }

        if (seat.status === 'locked' && !this.isLockExpired(seat)) {
            return { success: false, message: "Seat is locked." };
        }

        this.lockSeat(userId, seatNumber);
        return { success: true, message: `Seat ${seatNumber} locked.` };
    }

    lockSeat(userId, seatNumber) {
        this.seatModel.updateSeat(seatNumber, {
            status: 'locked',
            lockedBy: userId,
            lockTimestamp: Date.now()
        });
    }

    releaseSeat(seatNumber) {
        this.seatModel.updateSeat(seatNumber, {
            status: 'available',
            lockedBy: null,
            lockTimestamp: null
        });
    }

    bookSeat(seatNumber) {
        this.seatModel.updateSeat(seatNumber, {
            status: 'booked',
            lockedBy: null,
            lockTimestamp: null
        });
    }
}

module.exports = SeatController;
