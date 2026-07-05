package com.unpredictable.practice.DeathNoteBackend.login.entities;

import com.unpredictable.practice.DeathNoteBackend.login.enums.Provider;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "user_id")
    private UUID id;

    @Column(name = "user_name", length = 100)
    private String name;

    @Column(name = "user_email", length = 200)
    private String email;
    private String password;
    private String image;
    private boolean enabled = true;
    private Instant createdAt = Instant.now();
    private Instant updatedAt = Instant.now();

    @Enumerated(EnumType.STRING)
    private Provider provider = Provider.LOCAL;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name="role_id"))
    private Set<Role> roles = new HashSet<>();

    @PrePersist
    public void prePersist()
    {
        Instant now = Instant.now();
        if(createdAt == null) createdAt = now;
        else updatedAt = now;
    }

    @PreUpdate
    public void preUpdate()
    {
        updatedAt = Instant.now();
    }

}
