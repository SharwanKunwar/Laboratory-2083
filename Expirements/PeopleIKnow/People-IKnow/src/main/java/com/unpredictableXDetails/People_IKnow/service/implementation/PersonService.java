package com.unpredictableXDetails.People_IKnow.service.implementation;

import com.unpredictableXDetails.People_IKnow.entity.Person;
import com.unpredictableXDetails.People_IKnow.service.PersonServiceHandler;

import java.util.List;
import java.util.UUID;

public class PersonService implements PersonServiceHandler {
    @Override
    public Person createPerson(Person person) {
        return null;
    }

    @Override
    public List<Person> getAllPersons() {
        return List.of();
    }

    @Override
    public Person updatePerson(UUID id, Person person) {
        return null;
    }

    @Override
    public void deletePersonById(UUID id) {

    }
}
