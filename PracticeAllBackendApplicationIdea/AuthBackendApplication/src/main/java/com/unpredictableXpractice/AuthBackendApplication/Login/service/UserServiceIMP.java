package com.unpredictableXpractice.AuthBackendApplication.Login.service;

import com.unpredictableXpractice.AuthBackendApplication.Login.dtos.UserDTO;
import com.unpredictableXpractice.AuthBackendApplication.Login.enitites.Provider;
import com.unpredictableXpractice.AuthBackendApplication.Login.enitites.User;
import com.unpredictableXpractice.AuthBackendApplication.Login.repository.UserRepository;
import com.unpredictableXpractice.AuthBackendApplication.exception.ResourceNotFoundException;
import com.unpredictableXpractice.AuthBackendApplication.exception.UserAlreadyExistsException;
import com.unpredictableXpractice.AuthBackendApplication.exception.BadRequestException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.internal.bytebuddy.asm.Advice;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceIMP implements UserServiceHelper {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    @Override
    @Transactional
    public UserDTO createUser(UserDTO userDTO)
    {

        if (userDTO.getEmail() == null || userDTO.getEmail().isBlank()) {
            throw new BadRequestException("Email is required");
        }

        if (userRepository.existsByEmail(userDTO.getEmail())) {
            throw new UserAlreadyExistsException("Email already exists");
        }

        User user = modelMapper.map(userDTO, User.class);

        user.setProvider(
                userDTO.getProvider() != null
                        ? userDTO.getProvider()
                        : Provider.LOCAL
        );

        User savedUser = userRepository.save(user);

        return modelMapper.map(savedUser, UserDTO.class);
    }

    @Override
    public UserDTO getUserByEmail(String email)
    {
        User user = userRepository.findByEmail(email).orElseThrow(()-> new ResourceNotFoundException("User not found with email: " + email));
        User savedUser = modelMapper.map(user, User.class);

        return modelMapper.map(savedUser, UserDTO.class);
    }

    @Override
    public UserDTO updateUser(UserDTO userDTO, String userId) {
        return null;
    }

    @Override
    public void deleteUser(String userId) {

    }

    @Override
    public UserDTO getUserById(String id) {
        return null;
    }



    @Override
    @Transactional
    public Iterable<UserDTO> getAllUsers() {

        return userRepository
                .findAll()
                .stream()
                .map(user -> modelMapper.map(user, UserDTO.class))
                .toList();
    }
}