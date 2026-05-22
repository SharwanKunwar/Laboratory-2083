package com.example.studentapi.repository;

import com.example.studentapi.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    // You get these methods for FREE — no code needed:
    // findAll()      → SELECT * FROM student
    // findById(id)   → SELECT * FROM student WHERE id = ?
    // save(student)  → INSERT or UPDATE
    // deleteById(id) → DELETE FROM student WHERE id = ?
    // count()        → SELECT COUNT(*) FROM student
}
