package com.unpredictableXpractice.QuoteBackend.login.entities;

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

    @Column(name = "user_email", unique = true, length = 200)
    private String email;

    private String password;
    private String image;
    private boolean enabled = true;
    private Instant createdAt;
    private Instant updatedAt;

    @Enumerated(EnumType.STRING)
    private Provider provider = Provider.LOCAL;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

    @PrePersist
    public void prePersist()
    {
        Instant now = createdAt.now();
        if(createdAt == null)  createdAt = now;
        else updatedAt = now;
    }

    @PreUpdate
    public void preUpdate()
    {
        updatedAt = Instant.now();
    }

}
