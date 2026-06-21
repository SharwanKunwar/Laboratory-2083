package com.unpredictable.DemoTask.dto;

import com.unpredictable.DemoTask.enums.ForWhen;
import com.unpredictable.DemoTask.enums.Priority;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class DemoTaskRequestDTO {

    @NotBlank(message = "Title is required")
    @Size(max = 100, message = "Title cannot exceed 100 character")
    private String title;

    @NotBlank(message = "Description is required")
    @Size(max = 300, message = "Description cannot exceed 100 character")
    private String description;

    @NotNull(message = "Priority is required")
    private Priority priority;

    @NotNull(message = "ForWhen is required")
    private ForWhen forWhen;
}