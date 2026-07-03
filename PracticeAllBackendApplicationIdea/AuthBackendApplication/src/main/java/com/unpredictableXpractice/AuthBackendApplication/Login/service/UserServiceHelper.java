package com.unpredictableXpractice.AuthBackendApplication.Login.service;

import com.unpredictableXpractice.AuthBackendApplication.Login.dtos.UserDTO;

public interface UserServiceHelper
{

    UserDTO createUser(UserDTO userDTO);

    UserDTO getUserByEmail(String email);

    UserDTO updateUser(UserDTO userDTO, String userId);

    void deleteUser(String userId);

    UserDTO getUserById(String id);

    Iterable<UserDTO> getAllUsers();

}
