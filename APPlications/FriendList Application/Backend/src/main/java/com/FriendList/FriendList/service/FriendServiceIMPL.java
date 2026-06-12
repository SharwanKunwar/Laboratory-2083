package com.FriendList.FriendList.service;

import com.FriendList.FriendList.model.Friend;
import com.FriendList.FriendList.repository.FriendRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FriendServiceIMPL implements FriendService {

    private final FriendRepository repository;

    @Override
    public Friend addFriend(Friend friend) {
        return repository.save(friend);
    }

    @Override
    public List<Friend> getAllFriends() {
        return repository.findAll();
    }

    @Override
    public Friend getFriendById(Long id) {
        return repository.findById(id).orElseThrow();
    }

    @Override
    public void deleteFriend(Long id) {
        repository.deleteById(id);

    }
}
