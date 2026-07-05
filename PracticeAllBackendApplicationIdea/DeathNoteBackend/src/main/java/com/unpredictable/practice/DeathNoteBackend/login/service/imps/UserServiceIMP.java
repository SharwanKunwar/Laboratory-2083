package com.unpredictable.practice.DeathNoteBackend.login.service.imps;

import com.unpredictable.practice.DeathNoteBackend.exceptions.BadRequestException;
import com.unpredictable.practice.DeathNoteBackend.exceptions.ResourceNotFoundException;
import com.unpredictable.practice.DeathNoteBackend.exceptions.UserAlreadyExistsException;
import com.unpredictable.practice.DeathNoteBackend.login.dtos.UserDTO;
import com.unpredictable.practice.DeathNoteBackend.login.entities.User;
import com.unpredictable.practice.DeathNoteBackend.login.enums.Provider;
import com.unpredictable.practice.DeathNoteBackend.login.helper.UserHelper;
import com.unpredictable.practice.DeathNoteBackend.login.repository.UserRepository;
import com.unpredictable.practice.DeathNoteBackend.login.service.UserServiceHelper;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceIMP implements UserServiceHelper
{

    private final UserRepository userRepository;
    private final ModelMapper  modelMapper;

    @Override
    public UserDTO createUser(UserDTO userDTO)
    {
        if(userDTO.getEmail() == null || userDTO.getEmail().isBlank()){
            throw new BadRequestException("Email is required");
        }
        if(userRepository.existsByEmail(userDTO.getEmail())){
            throw new UserAlreadyExistsException("User already exists with id " + userDTO.getEmail());
        }

        User user = modelMapper.map(userDTO, User.class);
        user.setProvider(userDTO.getProvider() != null ? userDTO.getProvider() : Provider.LOCAL);

        User savedUser = userRepository.save(user);
        return modelMapper.map(savedUser, UserDTO.class);
    }

    @Override
    public Iterable<UserDTO> getAllUsers()
    {
        return userRepository.findAll()
                .stream()
                .map(user -> modelMapper.map(user, UserDTO.class))
                .toList();
    }

    @Override
    public UserDTO getUserByEmail(String email)
    {
        User user = userRepository.findByEmail(email).orElseThrow(()-> new ResourceNotFoundException("User with email " + email + " not found"));
        User savedUser = modelMapper.map(user, User.class);
        return modelMapper.map(savedUser, UserDTO.class);
    }

    @Override
    public UserDTO getUserById(String userId)
    {
        UUID uId = UserHelper.parseUUID(userId);
        User user = userRepository.findById(uId).orElseThrow(()-> new ResourceNotFoundException("User with id " + userId + " not found"));
        return modelMapper.map(user, UserDTO.class);
    }

    @Override
    public UserDTO updateUser(UserDTO userDTO, String userId)
    {
        UUID uId = UserHelper.parseUUID(userId);
        User existingUser = userRepository.findById(uId).orElseThrow(()-> new ResourceNotFoundException("User with id " + userId + " not found"));
        //Email must not be changed
        //todo: change password update login... hashing
        if(userDTO.getPassword() != null) existingUser.setPassword(userDTO.getPassword());
        if(userDTO.getName() != null) existingUser.setName(userDTO.getName());
        if(userDTO.getProvider() != null) existingUser.setProvider(userDTO.getProvider());
        if(userDTO.getImage() != null) existingUser.setImage(userDTO.getImage());

        existingUser.setEnabled(userDTO.isEnabled());
        User user = userRepository.save(existingUser);
        return modelMapper.map(user, UserDTO.class);
    }

    @Override
    public void deleteUser(String userId)
    {
        UUID uId = UserHelper.parseUUID(userId);
        User user = userRepository.findById(uId).orElseThrow(()-> new ResourceNotFoundException("User with id " + userId + " not found"));
        userRepository.delete(user);
    }
}
