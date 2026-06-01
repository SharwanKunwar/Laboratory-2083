package com.example.DeathNote.repository;

import com.example.DeathNote.entity.DeathNote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeathNoteRepository extends JpaRepository<DeathNote, Long> {

    ///

}