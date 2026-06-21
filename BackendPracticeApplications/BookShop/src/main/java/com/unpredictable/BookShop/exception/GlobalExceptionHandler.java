package com.unpredictable.BookShop.exception;

import com.unpredictable.BookShop.dto.ApiErrorResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.List;

@RestControllerAdvice // Applies exception handling globally to all REST controllers
public class GlobalExceptionHandler {

    // Handles validation errors thrown by @Valid
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiErrorResponse> handleValidationErrors( MethodArgumentNotValidException ex, HttpServletRequest request) {

        // Extract all validation error messages from the request
        List<String> errors = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(error -> error.getDefaultMessage())
                .toList();

        // Build a custom error response
        ApiErrorResponse response = ApiErrorResponse.builder()
                .timestamp(LocalDateTime.now())      // Time when the error occurred
                .status(400)                         // HTTP status code
                .error("Validation Failed")          // Short error title
                .message("Invalid request data")     // General error message
                .errors(errors)                     // List of validation errors
                .path(request.getRequestURI())      // API endpoint that caused the error
                .build();

        // Return HTTP 400 Bad Request with the custom response body
        return ResponseEntity.badRequest().body(response);
    }
}