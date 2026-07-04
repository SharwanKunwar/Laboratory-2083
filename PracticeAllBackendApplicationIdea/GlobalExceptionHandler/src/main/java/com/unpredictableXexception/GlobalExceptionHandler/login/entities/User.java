package com.unpredictableXexception.GlobalExceptionHandler.login.entities;

import com.unpredictableXexception.GlobalExceptionHandler.login.enums.Provider;
import jakarta.persistence.Entity;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.*;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User {
    private UUID id;
    private String name;
    private String email;
    private String password;
    private boolean enabled = true;
    private String image;
    private Provider provider = Provider.LOCAL;
    private Set<Role> roles = new HashSet<>();
    private Instant createdAt = Instant.now();
    private Instant updatedAt = Instant.now();

    @PrePersist
    public void prePersist() {
        Instant now = createdAt.now();
        if(createdAt == null) createdAt = now;
        else updatedAt = now;
    }

    @PreUpdate
    public void preUpdate() {
        updatedAt = Instant.now();
    }
}
