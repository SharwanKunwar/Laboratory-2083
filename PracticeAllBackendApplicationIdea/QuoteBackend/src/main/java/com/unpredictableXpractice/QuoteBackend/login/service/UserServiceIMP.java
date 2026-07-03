package com.unpredictableXpractice.QuoteBackend.login.service;

import com.unpredictableXpractice.QuoteBackend.exceptions.BadRequestException;
import com.unpredictableXpractice.QuoteBackend.exceptions.UserAlreadyExistsException;
import com.unpredictableXpractice.QuoteBackend.login.dtos.UserDTO;
import com.unpredictableXpractice.QuoteBackend.login.entities.Provider;
import com.unpredictableXpractice.QuoteBackend.login.entities.User;
import com.unpredictableXpractice.QuoteBackend.login.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceIMP implements UserServiceHelper{

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;


    @Override
    public UserDTO createUser(UserDTO userDTO)
    {
        if(userDTO.getEmail() == null || userDTO.getEmail().isEmpty()){
            throw new BadRequestException("Email is required");
        }
        if(userRepository.existsByEmail(userDTO.getEmail())){
            throw new UserAlreadyExistsException("Email is already exists");
        }

        User user = modelMapper.map(userDTO, User.class);
        user.setProvider(userDTO.getProvider() != null ? userDTO.getProvider() : Provider.LOCAL);

        User savedUser = userRepository.save(user);

        return modelMapper.map(savedUser, UserDTO.class);
    }

    @Override
    public Iterable<UserDTO> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(user -> modelMapper.map(user, UserDTO.class))
                .toList();
    }

    @Override
    public UserDTO getUserByEmail(String email) {
        return null;
    }

    @Override
    public UserDTO getUserById(String id) {
        return null;
    }

    @Override
    public UserDTO updateUser(UserDTO userDTO, String userId) {
        return null;
    }

    @Override
    public void deleteUser(String userId) {

    }
}
