const SeatModel = require('./models/SeatModel');
const BookingModel = require('./models/BookingModel');
const SeatController = require('./controllers/SeatController');
const BookingController = require('./controllers/BookingController');
const ConsoleView = require('./views/ConsoleView');

const seatModel = new SeatModel();
seatModel.initializeSeats();

const bookingModel = new BookingModel();
const seatController = new SeatController(seatModel);
const bookingController = new BookingController(bookingModel, seatController);

const user1 = "User1";
const user2 = "User2";
const flightId = "FL123";

ConsoleView.displaySeats(seatModel.getAllSeats());

let result1 = bookingController.createBooking(user1, flightId, ["A1"]);
if (result1.success) ConsoleView.showBooking(result1.booking);
else ConsoleView.showMessage(result1.message);

let result2 = bookingController.createBooking(user2, flightId, ["A1"]);
ConsoleView.showMessage(result2.message);

let result3 = bookingController.createBooking(user1, flightId, ["A1"]);
ConsoleView.showMessage(result3.message);

ConsoleView.displaySeats(seatModel.getAllSeats());
