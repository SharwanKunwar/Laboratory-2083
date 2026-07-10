package com.unpredictableXpractice.AuthBackendApplication.Login.security;

import com.unpredictableXpractice.AuthBackendApplication.Login.enitites.Role;
import com.unpredictableXpractice.AuthBackendApplication.Login.enitites.User;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.sql.Date;
import java.time.Instant;
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

    //Constructor
    public JWT_Service(
            @Value("${security.jwt.secret}") String secret,
            @Value("${security.jwt.access-ttl-seconds}") long accessTtlSeconds,
            @Value("${security.jwt.refreshTtlSeconds}") long refreshTtlSeconds,
            @Value("${security.jwt.issuer}") String issuer)
    {
        if(secret == null || secret.length() < 64)
        {
            throw new IllegalArgumentException("JWT Secret length must be at least 64 characters long");
        }

        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        this.accessTtlSeconds = accessTtlSeconds;
        this.refreshTtlSeconds = refreshTtlSeconds;
        this.issuer = issuer;

    }

    //For generate access token:
    public String generateToken(User  user)
    {
        Instant now = Instant.now();
        List<String> roles =user.getRoles() == null ? List.of() : user.getRoles().stream().map(Role::getName).collect(Collectors.toList());

        return Jwts.builder()
                .setId(UUID.randomUUID().toString())
                .setSubject(user.getId().toString())
                .setIssuer(issuer)
                .setIssuedAt(Date.from(now))
                .setExpiration(Date.from(now.plusSeconds(accessTtlSeconds)))
                .addClaims(Map.of(
                        "email", user.getEmail(),
                        "roles", roles,
                        "typ", "access"
                )).signWith(secretKey, SignatureAlgorithm.HS512).compact();
    }

    //For generate refresh token:
    public String generateToken(User  user, String jti)
    {
        Instant now = Instant.now();
        List<String> roles =user.getRoles() == null ? List.of() : user.getRoles().stream().map(Role::getName).collect(Collectors.toList());

        return Jwts.builder()
                .id(jti)
                .subject(user.getId().toString())
                .issuer(issuer)
                .issuedAt(Date.from(now))
                .expiration(Date.from(now.plusSeconds(accessTtlSeconds)))
                .claim("typ", "refresh").signWith(secretKey, SignatureAlgorithm.HS512).compact();
    }

    //Parse the token
    public Jws<Claims> parse(String token)
    {
        try{
            return Jwts.parser().verifyWith(secretKey).build().parseClaimsJws(token);
        }catch (JwtException e){
            throw e;
        }

    }

    // what is it
    public boolean isAccessToken(String token)
    {
        Claims c = parse(token).getPayload();
        return "refresh".equals(c.get("typ"));
    }

    //get user id
    public UUID getUserId(String token)
    {
        Claims c = parse(token).getPayload();
        return UUID.fromString(c.getSubject());
    }

    // token id
    public String getJti(String token)
    {
        return parse(token).getPayload().getId();
    }



}
