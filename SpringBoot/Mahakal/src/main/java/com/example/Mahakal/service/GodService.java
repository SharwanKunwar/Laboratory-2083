package com.example.Mahakal.service;

import com.example.Mahakal.modal.Mahakal;
import com.example.Mahakal.repository.GodRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GodService {
    private final GodRepository  godRepository;


    // get all god
    public List<Mahakal> findAll(){
        return godRepository.findAll();
    }

    // get one god
    public Mahakal getById(Long id){
        return godRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("God not found with id : " + id));
    }

    // save new god
    public Mahakal create(Mahakal mahakal){
        return godRepository.save(mahakal);
    }

    // find existing god , update, save
    public Mahakal update(Long id, Mahakal updateData){
        Mahakal existing = getById(id);
        existing.setName(updateData.getName());
        return godRepository.save(existing);
    }

    // delete god by id
    public void delete(Long id){
        godRepository.deleteById(id);
    }

}
