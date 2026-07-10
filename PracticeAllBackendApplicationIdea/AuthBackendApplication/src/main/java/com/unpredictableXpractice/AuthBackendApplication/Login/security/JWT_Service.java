package com.unpredictableXpractice.AuthBackendApplication.Login.security;

import com.unpredictableXpractice.AuthBackendApplication.Login.enitites.Role;
import com.unpredictableXpractice.AuthBackendApplication.Login.enitites.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class JWT_Service {

    private final SecretKey secretKey;
    private final long accessTtlSeconds;
    private final long refreshTtlSeconds;
    private final String issuer;

    public JWT_Service(
            @Value("${security.jwt.secret}") String secret,
            @Value("${security.jwt.access-ttl-seconds}") long accessTtlSeconds,
            @Value("${security.jwt.refresh-ttl-seconds}") long refreshTtlSeconds,
            @Value("${security.jwt.issuer}") String issuer
    ) {

        if (secret == null || secret.length() < 64) {
            throw new IllegalArgumentException(
                    "JWT secret must be at least 64 characters long."
            );
        }

        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        this.accessTtlSeconds = accessTtlSeconds;
        this.refreshTtlSeconds = refreshTtlSeconds;
        this.issuer = issuer;
    }

    /**
     * Generate Access Token
     */
    public String generateToken(User user) {

        Instant now = Instant.now();

        List<String> roles = user.getRoles() == null
                ? List.of()
                : user.getRoles()
                  .stream()
                  .map(Role::getName)
                  .collect(Collectors.toList());

        return Jwts.builder()
                .id(UUID.randomUUID().toString())
                .subject(user.getId().toString())
                .issuer(issuer)
                .issuedAt(Date.from(now))
                .expiration(Date.from(now.plusSeconds(accessTtlSeconds)))
                .claims(Map.of(
                        "email", user.getEmail(),
                        "roles", roles,
                        "typ", "access"
                ))
                .signWith(secretKey, SignatureAlgorithm.HS512)
                .compact();
    }

    /**
     * Generate Refresh Token
     */
    public String generateRefreshToken(User user, String jti) {

        Instant now = Instant.now();

        return Jwts.builder()
                .id(jti)
                .subject(user.getId().toString())
                .issuer(issuer)
                .issuedAt(Date.from(now))
                .expiration(Date.from(now.plusSeconds(refreshTtlSeconds)))
                .claim("typ", "refresh")
                .signWith(secretKey, SignatureAlgorithm.HS512)
                .compact();
    }

    /**
     * Parse JWT
     */
    public Jws<Claims> parse(String token) throws JwtException {
        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token);
    }

    /**
     * Check if token is Access Token
     */
    public boolean isAccessToken(String token) {
        Claims claims = parse(token).getPayload();
        return "access".equals(claims.get("typ"));
    }

    /**
     * Check if token is Refresh Token
     */
    public boolean isRefreshToken(String token) {
        Claims claims = parse(token).getPayload();
        return "refresh".equals(claims.get("typ"));
    }

    /**
     * Extract User ID
     */
    public UUID getUserId(String token) {
        return UUID.fromString(parse(token).getPayload().getSubject());
    }

    /**
     * Extract JWT ID (jti)
     */
    public String getJti(String token) {
        return parse(token).getPayload().getId();
    }

    /**
     * Extract Roles
     */
    @SuppressWarnings("unchecked")
    public List<String> getRoles(String token) {
        return (List<String>) parse(token).getPayload().get("roles");
    }

    /**
     * Extract Email
     */
    public String getEmail(String token) {
        return (String) parse(token).getPayload().get("email");
    }
}