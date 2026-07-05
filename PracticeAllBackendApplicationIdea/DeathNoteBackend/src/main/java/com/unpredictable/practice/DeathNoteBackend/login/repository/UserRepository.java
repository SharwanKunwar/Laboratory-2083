package com.unpredictable.practice.DeathNoteBackend.login.repository;

import com.unpredictable.practice.DeathNoteBackend.login.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID>
{
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
}
