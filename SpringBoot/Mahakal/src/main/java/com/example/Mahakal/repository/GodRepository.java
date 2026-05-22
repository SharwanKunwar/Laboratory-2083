package com.example.Mahakal.repository;

import com.example.Mahakal.modal.Mahakal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GodRepository extends JpaRepository<Mahakal, Long> {
    // it gives
    // findAll()      → SELECT * FROM student
    // findById(id)   → SELECT * FROM student WHERE id = ?
    // save(student)  → INSERT or UPDATE
    // deleteById(id) → DELETE FROM student WHERE id = ?
    // count()        → SELECT COUNT(*) FROM student
}
