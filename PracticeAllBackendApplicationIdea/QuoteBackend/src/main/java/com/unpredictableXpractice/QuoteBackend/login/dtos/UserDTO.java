package com.unpredictableXpractice.QuoteBackend.login.dtos;

import com.unpredictableXpractice.QuoteBackend.login.entities.Provider;
import lombok.*;

import javax.management.relation.Role;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private UUID id;
    private String name;
    private String email;
    private String password;
    private String image;
    private boolean enabled = true;
    private Instant createdAt = Instant.now();
    private Instant updatedAt = Instant.now();
    private Provider  provider = Provider.LOCAL;
    private Set<Role> roles = new HashSet<>();

}
