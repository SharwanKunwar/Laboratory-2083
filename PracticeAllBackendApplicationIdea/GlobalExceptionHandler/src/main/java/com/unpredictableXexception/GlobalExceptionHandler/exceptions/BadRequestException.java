package com.unpredictableXexception.GlobalExceptionHandler.exceptions;

public class BadRequestException extends RuntimeException {
    public BadRequestException(String message) {
        super(message);
    }
}
