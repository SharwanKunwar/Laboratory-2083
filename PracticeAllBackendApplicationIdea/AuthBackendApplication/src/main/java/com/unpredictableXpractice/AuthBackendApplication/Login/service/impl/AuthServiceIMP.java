package com.unpredictableXpractice.AuthBackendApplication.Login.service.impl;


import com.unpredictableXpractice.AuthBackendApplication.Login.dtos.UserDTO;
import com.unpredictableXpractice.AuthBackendApplication.Login.service.AuthServiceHelper;
import com.unpredictableXpractice.AuthBackendApplication.Login.service.UserServiceHelper;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@AllArgsConstructor
public class AuthServiceIMP implements AuthServiceHelper {

    private final UserServiceHelper userServiceHelper;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDTO registerUser(UserDTO userDTO)
    {
        //logic : verify email, password, and default role
        userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        UserDTO userDTO1 = userServiceHelper.createUser(userDTO);
        return userDTO1;
    }
}
