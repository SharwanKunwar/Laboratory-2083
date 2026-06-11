package com.FriendList.FriendList.repository;


import com.FriendList.FriendList.model.Friend;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FriendRepository extends JpaRepository<Friend, Long> {
    
}
