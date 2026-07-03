package com.unpredictableXpractice.QuoteBackend.login.service;

import com.unpredictableXpractice.QuoteBackend.login.dtos.UserDTO;


public interface UserServiceHelper
{
    //Create user
    UserDTO createUser(UserDTO userDTO);

    // Get all user
    Iterable<UserDTO> getAllUsers();

    //Get user by email
    UserDTO getUserByEmail(String email);

    //Get user by id
    UserDTO getUserById(String id);

    //Update user
    UserDTO updateUser(UserDTO userDTO, String userId);

    //Delete user
    void deleteUser(String userId);
}
