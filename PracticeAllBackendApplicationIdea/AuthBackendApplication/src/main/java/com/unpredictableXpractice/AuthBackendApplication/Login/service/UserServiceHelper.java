package com.unpredictableXpractice.AuthBackendApplication.Login.service;

import com.unpredictableXpractice.AuthBackendApplication.Login.dtos.UserDTO;

public interface UserServiceHelper
{
    //Create user
    UserDTO createUser(UserDTO userDTO);

    //Get user by email
    UserDTO getUserByEmail(String email);

    //Update user
    UserDTO updateUser(UserDTO userDTO, String userId);

    //Delete user
    void deleteUser(String userId);

    //Get user by id
    UserDTO getUserById(String id);

    //Get all users
    Iterable<UserDTO> getAllUsers();

}
