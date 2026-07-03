package com.unpredictableXpractice.AuthBackendApplication.Login.exception;

public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(String message) {
        super(message);
    }
}