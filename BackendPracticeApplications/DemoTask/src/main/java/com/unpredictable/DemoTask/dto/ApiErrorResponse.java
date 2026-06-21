package com.unpredictable.DemoTask.dto;

import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApiErrorResponse
{
    private boolean success;
    private String message;
    private LocalDateTime timestamp;
}