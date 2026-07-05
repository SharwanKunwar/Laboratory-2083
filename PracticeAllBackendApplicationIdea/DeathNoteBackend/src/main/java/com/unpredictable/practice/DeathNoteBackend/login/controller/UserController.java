package com.unpredictable.practice.DeathNoteBackend.login.controller;

import com.unpredictable.practice.DeathNoteBackend.login.dtos.UserDTO;
import com.unpredictable.practice.DeathNoteBackend.login.service.UserServiceHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController
{
    private final UserServiceHelper  userService;

    //Post mapping for creating user
    @PostMapping
    public ResponseEntity<UserDTO> createUser(@RequestBody UserDTO userDTO){
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(userService.createUser(userDTO));
    }

    //Get mapping for Get All users
    @GetMapping("/all")
    public ResponseEntity<Iterable<UserDTO>> getAllUsers(){
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(userService.getAllUsers());
    }

}
