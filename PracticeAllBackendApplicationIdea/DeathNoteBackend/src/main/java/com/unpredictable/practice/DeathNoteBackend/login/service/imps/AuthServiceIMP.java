package com.unpredictable.practice.DeathNoteBackend.login.service.imps;

import com.unpredictable.practice.DeathNoteBackend.login.dtos.UserDTO;
import com.unpredictable.practice.DeathNoteBackend.login.service.AuthServiceHelper;
import com.unpredictable.practice.DeathNoteBackend.login.service.UserServiceHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceIMP implements AuthServiceHelper
{
    private final UserServiceHelper userServiceHelper;

    @Override
    public UserDTO registerUser(UserDTO userDTO)
    {
        //Logic : verify email, password, and default role
        UserDTO userDTO1 = userServiceHelper.createUser(userDTO);
        return userDTO1;
    }

}
