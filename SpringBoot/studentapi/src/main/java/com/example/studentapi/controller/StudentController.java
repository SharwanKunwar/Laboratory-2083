package com.example.studentapi.controller;

import com.example.studentapi.model.Student;
import com.example.studentapi.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@RequiredArgsConstructor
public class StudentController {

    private final StudentService studentService;

    //    -------------------- Get request ----------------------
    // get all student mapping
    @GetMapping
    public ResponseEntity<List<Student>> getAll(){
        return ResponseEntity.ok(studentService.findAll());
    }

    // one student
    @GetMapping("/{id}")
    public ResponseEntity<Student> getById(@PathVariable Long id){
        return ResponseEntity.ok(studentService.getById(id));
    }

    //    -------------------- Post request ----------------------
    // PUT http://localhost:8080/api/students/1
    @PutMapping("/{id}")
    public ResponseEntity<Student> update(
            @PathVariable Long id,
            @RequestBody Student student) {
        return ResponseEntity.ok(studentService.update(id, student));
    }

    // post student one only
    @PostMapping
    public ResponseEntity<Student> create(@RequestBody Student student) {
        return ResponseEntity.ok(studentService.create(student));
    }

    // DELETE http://localhost:8080/api/students/1
    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        studentService.delete(id);
        return ResponseEntity.ok("Student with id " + id + " deleted successfully.");
    }
}
