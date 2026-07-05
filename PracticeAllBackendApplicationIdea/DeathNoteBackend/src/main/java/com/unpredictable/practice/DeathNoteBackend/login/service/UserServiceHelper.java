package com.unpredictable.practice.DeathNoteBackend.login.service;

import com.unpredictable.practice.DeathNoteBackend.login.dtos.UserDTO;

public interface UserServiceHelper
{
    //Create user
    UserDTO createUser(UserDTO userDTO);

    //Get all user
    Iterable<UserDTO> getAllUsers();

    //Get user by email
    UserDTO getUserByEmail(String email);

    //Get user by id
    UserDTO getUserById(String userId);

    //Update user
    UserDTO updateUser(UserDTO userDTO, String userId);

    //Delete user
    void deleteUser(String userId);
}
