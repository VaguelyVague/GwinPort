class SeatModel {
    constructor() {
        this.seats = {};
    }

    initializeSeats(rows = ['A', 'B', 'C'], cols = 4) {
        rows.forEach(row => {
            for (let i = 1; i <= cols; i++) {
                const seatNumber = `${row}${i}`;
                this.seats[seatNumber] = {
                    seatNumber,
                    status: 'available',
                    lockedBy: null,
                    lockTimestamp: null
                };
            }
        });
    }

    getSeat(seatNumber) {
        return this.seats[seatNumber];
    }

    updateSeat(seatNumber, data) {
        Object.assign(this.seats[seatNumber], data);
    }

    getAllSeats() {
        return this.seats;
    }
}

module.exports = SeatModel;
