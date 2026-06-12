package com.FriendList.FriendList.service;

import com.FriendList.FriendList.model.Friend;

import java.util.List;

public interface FriendService {
    Friend addFriend(Friend friend);
    List<Friend> getAllFriends();
    Friend getFriendById(Long id);
    void deleteFriend(Long id);
}
