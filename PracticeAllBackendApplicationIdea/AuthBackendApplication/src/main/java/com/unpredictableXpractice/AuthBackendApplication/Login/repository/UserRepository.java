package com.unpredictableXpractice.AuthBackendApplication.Login.repository;

import com.unpredictableXpractice.AuthBackendApplication.Login.enitites.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
}
