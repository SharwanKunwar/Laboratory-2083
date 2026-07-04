package com.unpredictableXexception.GlobalExceptionHandler.login.controller;

import com.unpredictableXexception.GlobalExceptionHandler.login.dtos.UserDTO;
import com.unpredictableXexception.GlobalExceptionHandler.login.service.UserServiceHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {

    private final UserServiceHelper userServiceHelper;

    // create user
    @PostMapping
    public ResponseEntity<UserDTO> createUser(@RequestBody UserDTO userDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(userServiceHelper.createUser(userDTO));
    }

    // get all user
    @GetMapping("/all")
    public ResponseEntity<Iterable<UserDTO>> getAllUsers() {
        return ResponseEntity.ok(userServiceHelper.getAllUsers());
    }
}
