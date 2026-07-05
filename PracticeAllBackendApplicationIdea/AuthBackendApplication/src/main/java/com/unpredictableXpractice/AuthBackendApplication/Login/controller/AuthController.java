package com.unpredictableXpractice.AuthBackendApplication.Login.controller;

import com.unpredictableXpractice.AuthBackendApplication.Login.dtos.UserDTO;
import com.unpredictableXpractice.AuthBackendApplication.Login.service.AuthServiceHelper;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@AllArgsConstructor
public class AuthController {

    private final AuthServiceHelper authServiceHelper;

    @PostMapping("/register")
    public ResponseEntity<UserDTO> registerUser(@RequestBody UserDTO userDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authServiceHelper.registerUser(userDTO));
    }
}
