package com.unpredictableXDetails.People_IKnow.service.implementation;

import com.unpredictableXDetails.People_IKnow.entity.Person;
import com.unpredictableXDetails.People_IKnow.repository.PersonRepository;
import com.unpredictableXDetails.People_IKnow.service.PersonServiceHandler;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class PersonService implements PersonServiceHandler
{
    private final PersonRepository repository;

    @Override
    public Person createPerson(Person person) {
        return repository.save(person);
    }

    @Override
    public List<Person> getAllPersons() {
        return repository.findAll();
    }

    @Override
    public Person updatePerson(UUID id, Person person) {
        return null;
    }

    @Override
    public void deletePersonById(UUID id) {

    }
}
