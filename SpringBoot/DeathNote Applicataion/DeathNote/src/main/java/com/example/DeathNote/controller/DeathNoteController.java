package com.example.DeathNote.controller;

import com.example.DeathNote.entity.DeathNote;
import com.example.DeathNote.service.DeathNoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/deathnote")
@RequiredArgsConstructor
public class DeathNoteController {

    private final DeathNoteService service;

    // POST - Write a name
    @PostMapping
    public ResponseEntity<DeathNote> writeEntry(@RequestBody DeathNote deathNote) {
        DeathNote saved = service.writeEntry(deathNote);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    // GET - Get all entries
    @GetMapping
    public ResponseEntity<List<DeathNote>> getAllEntries() {
        return ResponseEntity.ok(service.getAllEntries());
    }

    // GET - Get single entry
    @GetMapping("/{id}")
    public ResponseEntity<DeathNote> getEntry(@PathVariable Long id) {
        return ResponseEntity.ok(service.getEntryById(id));
    }

    // DELETE - Remove an entry
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEntry(@PathVariable Long id) {
        service.deleteEntry(id);
        return ResponseEntity.ok("Entry " + id + " has been erased from the Death Note.");
    }
}