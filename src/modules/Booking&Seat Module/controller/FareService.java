
package controller;

public class FareService {

    public double calculateFare(int seats){
        double base = 1000;
        double tax = 0.12;
        return seats * base * (1 + tax);
    }
}
