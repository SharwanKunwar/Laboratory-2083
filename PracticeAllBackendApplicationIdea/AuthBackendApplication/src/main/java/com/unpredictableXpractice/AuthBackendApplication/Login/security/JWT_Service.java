package com.unpredictableXpractice.AuthBackendApplication.Login.security;

import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;

@Service
public class JWT_Service {

    private final SecretKey secretKey;
    private final long accessTtlSeconds;
    private final long refreshTtlSeconds;
    private final String issuer;

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

    //generate token:



}
