package com.unpredictableXpractice.LoginWithGoogle3.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                // Disable CSRF (OK for React + session/OAuth)
                .csrf(csrf -> csrf.disable())

                // Enable CORS
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                // Authorization rules
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/",
                                "/login/**",
                                "/oauth2/**",
                                "/api/auth/**"
                        ).permitAll()
                        .anyRequest().authenticated()
                )

                // Google OAuth2 login
                .oauth2Login(oauth2 -> oauth2
                        .defaultSuccessUrl("http://localhost:5173/loginTest", true)
                )

                // Logout support
                .logout(Customizer.withDefaults());

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration config = new CorsConfiguration();

        // ✅ FIXED: ONLY origin (NOT route)
        config.setAllowedOrigins(List.of("http://localhost:5173"));

        // HTTP methods for React frontend
        config.setAllowedMethods(List.of(
                "GET",
                "POST",
                "PUT",
                "DELETE",
                "OPTIONS"
        ));

        // Allow all headers
        config.setAllowedHeaders(List.of("*"));

        // Allow session cookies (important for OAuth2 login)
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", config);

        return source;
    }
}