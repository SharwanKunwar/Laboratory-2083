package com.unpredictableXpractice.AuthBackendApplication.Login.service;

import com.unpredictableXpractice.AuthBackendApplication.Login.dtos.UserDTO;
import com.unpredictableXpractice.AuthBackendApplication.Login.enitites.Provider;
import com.unpredictableXpractice.AuthBackendApplication.Login.enitites.User;
import com.unpredictableXpractice.AuthBackendApplication.Login.repository.UserRepository;
import com.unpredictableXpractice.AuthBackendApplication.Login.exception.UserAlreadyExistsException;
import com.unpredictableXpractice.AuthBackendApplication.Login.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceIMP implements UserServiceHelper {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    @Override
    public UserDTO createUser(UserDTO userDTO) {

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
    public UserDTO getUserByEmail(String email) {
        return null;
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
    public Iterable<UserDTO> getAllUsers() {

        return userRepository
                .findAll()
                .stream()
                .map(user -> modelMapper.map(user, UserDTO.class))
                .toList();
    }
}