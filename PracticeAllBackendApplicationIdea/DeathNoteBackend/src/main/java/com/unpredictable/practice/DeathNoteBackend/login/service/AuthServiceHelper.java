package com.unpredictable.practice.DeathNoteBackend.login.service;

import com.unpredictable.practice.DeathNoteBackend.login.dtos.UserDTO;

public interface AuthServiceHelper {

    //Register User
    UserDTO registerUser(UserDTO userDTO);

    //Login User
}
