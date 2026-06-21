package com.unpredictable.DemoTask.dto;

import com.unpredictable.DemoTask.enums.ForWhen;
import com.unpredictable.DemoTask.enums.Priority;
import com.unpredictable.DemoTask.enums.TaskStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DemoTaskResponseDTO
{
    private Long id;
    private String title;
    private String description;
    private Priority priority;
    private ForWhen forWhen;
    private TaskStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime startedAt;
    private LocalDateTime finishedAt;
}