package com.unpredictable.practice.DeathNoteBackend.login.controller;

import com.unpredictable.practice.DeathNoteBackend.login.dtos.UserDTO;
import com.unpredictable.practice.DeathNoteBackend.login.entities.User;
import com.unpredictable.practice.DeathNoteBackend.login.service.UserServiceHelper;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
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
    public ResponseEntity<UserDTO> createUser(@RequestBody UserDTO userDTO)
    {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(userService.createUser(userDTO));
    }

    //Get mapping for Get All users
    @GetMapping("/all")
    public ResponseEntity<Iterable<UserDTO>> getAllUsers()
    {
        return ResponseEntity.
                ok(userService.getAllUsers());
    }

    //Get user by email
    @GetMapping("/{email}")
    public ResponseEntity<UserDTO> getUserByEmail(@PathVariable String email)
    {
        return ResponseEntity
                .ok(userService.getUserByEmail(email));
    }

    //Get user by id
    @GetMapping("/{userId}")
    public ResponseEntity<UserDTO> getUserById(@RequestParam String userId)
    {
        return ResponseEntity
                .ok(userService.getUserById(userId));
    }

    //Update user
    @PutMapping("/{userId}")
    public ResponseEntity<UserDTO> updateUser(@RequestBody UserDTO userDTO,@PathVariable String userId)
    {
        return ResponseEntity
                .ok(userService.updateUser(userDTO,userId));
    }

    //Delete user
    @DeleteMapping("/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable String userId)
    {
        userService.deleteUser(userId);
        return ResponseEntity.ok("User deleted successfully.");
    }



}
