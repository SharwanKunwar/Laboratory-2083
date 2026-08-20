package com.unpredictableXDetails.People_IKnow.service;

import com.unpredictableXDetails.People_IKnow.entity.Person;

import java.util.List;
import java.util.UUID;

public interface PersonServiceHandler
{
    //Create
    Person createPerson(Person person);

    //Read all
    List<Person> getAllPerson();

    //Update
    Person updatePerson(UUID id, Person person);

    //Delete
    void deletePersonById(UUID id);
}
