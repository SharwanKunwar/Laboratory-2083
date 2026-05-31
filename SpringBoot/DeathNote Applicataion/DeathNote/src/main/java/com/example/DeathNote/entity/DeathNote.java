package com.example.DeathNote.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "death_notes")
@Data
public class DeathNote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String target;

    @Column(nullable = false)
    private String deathReason;

    @Column(updatable = false)
    private LocalDateTime writtenAt = LocalDateTime.now();
}