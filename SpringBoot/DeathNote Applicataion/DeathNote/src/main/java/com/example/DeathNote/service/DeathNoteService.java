package com.example.DeathNote.service;

import com.example.DeathNote.entity.DeathNote;
import com.example.DeathNote.repository.DeathNoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DeathNoteService {

    private final DeathNoteRepository repository;

    // Write a name in the Death Note
    public DeathNote writeEntry(DeathNote deathNote) {
        return repository.save(deathNote);
    }

    // Get all entries
    public List<DeathNote> getAllEntries() {
        return repository.findAll();
    }

    // Get single entry by id
    public DeathNote getEntryById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Entry not found with id: " + id));
    }

    // Delete an entry
    public void deleteEntry(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Entry not found with id: " + id);
        }
        repository.deleteById(id);
    }
}