package com.unpredictableXpractice.AuthBackendApplication.Login.enitites;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.Instant;
import java.util.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "users")
public class User implements UserDetails {

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
    private boolean enable = true;
    private Instant createdAT = Instant.now();
    private Instant updatedAT = Instant.now();

    @Enumerated(EnumType.STRING)
    private Provider provider = Provider.LOCAL;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_role", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

    @PrePersist
    public void prePersist() {
        Instant now = Instant.now();
        if(createdAT == null) createdAT = now;
        else updatedAT = now;
    }

    @PreUpdate
    public void preUpdate() {
        updatedAT = Instant.now();
    }


    // securityConfig ---------------------------------------------------------------------------------------------

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities()
    {
        List<SimpleGrantedAuthority> authorities = roles
                .stream()
                .map(role -> new SimpleGrantedAuthority(role.getName()))
                .toList();

        return authorities;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return this.enable;
    }
}
