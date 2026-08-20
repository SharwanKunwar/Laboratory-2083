package com.unpredictableXDetails.People_IKnow.controller;

import com.unpredictableXDetails.People_IKnow.entity.Person;
import com.unpredictableXDetails.People_IKnow.service.PersonServiceHandler;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/people")
@AllArgsConstructor
public class PeopleController
{
    private final PersonServiceHandler service;

    //Create person in database
    @PostMapping
    public ResponseEntity<Person> create(@RequestBody Person person)
    {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.createPerson(person));
    }

    // Get all persons data form the database
    @GetMapping("/all")
    public ResponseEntity<List<Person>> getAllPerson()
    {
        return ResponseEntity.ok(service.getAllPerson());
    }
}
