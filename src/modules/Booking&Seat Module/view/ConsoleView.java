
package view;

import model.Seat;
import java.util.Map;

public class ConsoleView {

    public static void showSeats(Map<String, Seat> seats){
        System.out.println("\nSeats:");
        for(Seat s: seats.values()){
            System.out.println(s.seatNumber + " : " + s.status);
        }
    }

    public static void message(String msg){
        System.out.println(msg);
    }
}
