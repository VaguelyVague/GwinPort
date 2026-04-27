package com.gwinport.adminModule.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin
public class AdminController {

    // temp
    @GetMapping("/flights")
    public List<Map<String, String>> getFlights() {
        List<Map<String, String>> flights = new ArrayList<>();

        Map<String, String> sample = new HashMap<>();
        sample.put("flightId", "GW101");
        sample.put("origin", "Cebu");
        sample.put("destination", "Manila");

        flights.add(sample);

        return flights;
    }

    // not implemented yet
    @PostMapping("/flights")
    public String addFlight() {
        return "TODO: Add flight not implemented";
    }

    // not implemented yet
    @DeleteMapping("/flights/{id}")
    public String deleteFlight(@PathVariable String id) {
        return "TODO: Delete flight not implemented";
    }

    // not implemented yet
    @GetMapping("/reports")
    public String getReports() {
        return "TODO: Reports depend on booking/payment modules";
    }
}