package com.LearningSpringDay01.LoginWithGoogle2.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class Controller {

    @GetMapping("/hi")
    public String hi(){
        return "hello sharwan jung kunwar";
    }
    @GetMapping("/sharwan")
    public String aboutSharwan(){
        return "he is a software engineer who has skills to develop a scalable systems.";
    }
}
