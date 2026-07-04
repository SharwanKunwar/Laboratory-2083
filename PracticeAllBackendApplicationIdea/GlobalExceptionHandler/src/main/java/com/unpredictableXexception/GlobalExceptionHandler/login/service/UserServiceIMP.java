package com.unpredictableXexception.GlobalExceptionHandler.login.service;

import com.unpredictableXexception.GlobalExceptionHandler.exceptions.BadRequestException;
import com.unpredictableXexception.GlobalExceptionHandler.exceptions.UserAlreadyExistsException;
import com.unpredictableXexception.GlobalExceptionHandler.login.dtos.UserDTO;
import com.unpredictableXexception.GlobalExceptionHandler.login.entities.User;
import com.unpredictableXexception.GlobalExceptionHandler.login.enums.Provider;
import com.unpredictableXexception.GlobalExceptionHandler.login.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceIMP implements UserServiceHelper{

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    @Override
    public UserDTO createUser(UserDTO userDTO) {

        if(userDTO.getEmail() == null || userDTO.getEmail().isBlank()){
            throw new BadRequestException("Email is required");
        }
        if(userRepository.existsByEmail(userDTO.getEmail())){
            throw new UserAlreadyExistsException("Email already exists");
        }

        User user = modelMapper.map(userDTO, User.class);
        user.setProvider(userDTO.getProvider() != null ? userDTO.getProvider() : Provider.LOCAL);
        User savedUser = userRepository.save(user);
        return modelMapper.map(savedUser, UserDTO.class);
    }

    @Override
    public Iterable<UserDTO> getAllUsers() {
        return userRepository.findAll().stream().map(user -> modelMapper.map(user, UserDTO.class)).toList();
    }
}
