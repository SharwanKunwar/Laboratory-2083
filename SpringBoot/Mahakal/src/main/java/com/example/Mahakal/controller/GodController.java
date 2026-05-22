package com.example.Mahakal.controller;

import com.example.Mahakal.modal.Mahakal;
import com.example.Mahakal.service.GodService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/Gods")
@RequiredArgsConstructor
public class GodController {
    private final GodService  godService;

    // get all gods mapping
    @GetMapping
    public ResponseEntity<List<Mahakal>> getAll(){
        return ResponseEntity.ok(godService.findAll());
    }

    // get one god
    @GetMapping("/{id}")
    public ResponseEntity<Mahakal> getById(@PathVariable Long id){
        return ResponseEntity.ok(godService.getById(id));
    }

    //    ------------------ put request ----------------------------
    // post student one only
    @PostMapping
    public ResponseEntity<Mahakal> create(@RequestBody Mahakal mahakal){
        return ResponseEntity.ok(godService.create(mahakal));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Mahakal> update(@PathVariable Long id, @RequestBody Mahakal mahakal){
        return ResponseEntity.ok(godService.update(id, mahakal));
    }


    // delete
    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id){
        godService.delete(id);
        return ResponseEntity.ok("God with id "+id+" deleted sucessfully");
    }
}
