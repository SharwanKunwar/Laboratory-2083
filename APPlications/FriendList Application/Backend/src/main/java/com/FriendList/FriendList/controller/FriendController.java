package com.FriendList.FriendList.controller;


import com.FriendList.FriendList.model.Friend;
import com.FriendList.FriendList.service.FriendService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RequestMapping("/api/friends")
@RestController
@RequiredArgsConstructor
public class FriendController {

    private final FriendService service;

    @PostMapping
    public Friend createFriend(@RequestBody Friend friend)
    {
        return service.addFriend(friend);
    }

    @GetMapping
    public List<Friend> getAllFriends()
    {
        return service.getAllFriends();
    }

    //--------------------------------------------- By ID ------

    @GetMapping("/{id}")
    public Friend getFriendById(@PathVariable Long id)
    {
        return service.getFriendById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteFriendById(@PathVariable Long id)
    {
        service.deleteFriend(id);
    }


}
