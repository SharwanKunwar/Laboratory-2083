package com.unpredictableXCoders.DemoLogin.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/")
    public String SayHello() {
        return "Hello World!";
    }
}
