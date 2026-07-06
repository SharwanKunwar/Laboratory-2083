package com.unpredictableXpractice.AuthBackendApplication.Login.security;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

@Configuration
public class SecurityConfig {

    @Bean
    public UserDetailsService users(){
       User.UserBuilder userBuilder = User.withDefaultPasswordEncoder();

       UserDetails user01 = userBuilder.username("sharwan").password("xyz").roles("USER").build();
       return new InMemoryUserDetailsManager(user01);
    }
}
