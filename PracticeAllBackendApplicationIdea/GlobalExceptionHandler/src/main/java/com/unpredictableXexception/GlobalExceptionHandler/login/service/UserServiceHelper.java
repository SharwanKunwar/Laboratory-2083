package com.unpredictableXexception.GlobalExceptionHandler.login.service;

import com.unpredictableXexception.GlobalExceptionHandler.login.dtos.UserDTO;

public interface UserServiceHelper {

    //Create user
    UserDTO createUser(UserDTO userDTO);
    //Get all user
    Iterable<UserDTO> getAllUsers();
}
