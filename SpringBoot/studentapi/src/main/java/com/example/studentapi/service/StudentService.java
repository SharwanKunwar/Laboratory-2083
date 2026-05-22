package com.example.studentapi.service;

import com.example.studentapi.model.Student;
import com.example.studentapi.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentService {
    private final StudentRepository studentRepository;

    // get all students from the database
    public List<Student> findAll() {
        return studentRepository.findAll();
    }

    // one student only
    public Student getById(Long id) {
        return studentRepository.findById(id).orElseThrow(()-> new RuntimeException("Student not found with id : "+id));
    }

    // Save a new student to database
    public Student create(Student student) {
        return studentRepository.save(student);
    }

    // Find existing student, update fields, save back
    public Student update(Long id, Student updatedData) {
        Student existing = getById(id);
        existing.setName(updatedData.getName());
        existing.setAge(updatedData.getAge());
        return studentRepository.save(existing);
    }

    // Delete student by id
    public void delete(Long id) {
        studentRepository.deleteById(id);
    }
}
