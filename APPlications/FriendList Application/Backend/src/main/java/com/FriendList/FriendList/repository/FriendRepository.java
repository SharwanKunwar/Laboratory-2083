package com.FriendList.FriendList.repository;

/*
    it gives the useful method to get save
 */


import com.FriendList.FriendList.model.Friend;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FriendRepository extends JpaRepository<Friend, Long> {

}
