package com.unpredictableXpractice.AuthBackendApplication.Login.controller;

import com.unpredictableXpractice.AuthBackendApplication.Login.dtos.UserDTO;
import com.unpredictableXpractice.AuthBackendApplication.Login.service.UserServiceHelper;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {

    private final UserServiceHelper userServiceHelper;
    private final ModelMapper modelMapper;

    // post user
    @PostMapping
    public ResponseEntity<UserDTO> createUser(@RequestBody UserDTO userDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(userServiceHelper.createUser(userDTO));
    }

    // get all users
    @GetMapping("/all")
    public ResponseEntity<Iterable<UserDTO>> getAllUsers() {
        return ResponseEntity.ok(userServiceHelper.getAllUsers());
    }
}
