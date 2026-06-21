package com.unpredictable.DemoTask.mapper;

import com.unpredictable.DemoTask.dto.DemoTaskRequestDTO;
import com.unpredictable.DemoTask.dto.DemoTaskResponseDTO;
import com.unpredictable.DemoTask.entity.TaskEntity;
import com.unpredictable.DemoTask.enums.TaskStatus;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class DemoTaskMapper {

    //toEntity
    public TaskEntity mapToEntity(DemoTaskRequestDTO request) {
        return TaskEntity.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .priority(request.getPriority())
                .status(TaskStatus.PENDING)
                .forWhen(request.getForWhen())
                .createdAt(LocalDateTime.now())
                .build();
    }


    //toResponse
    public DemoTaskResponseDTO mapToResponse(TaskEntity entity) {
        return DemoTaskResponseDTO.builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .description(entity.getDescription())
                .priority(entity.getPriority())
                .status(entity.getStatus())
                .forWhen(entity.getForWhen())
                .createdAt(entity.getCreatedAt())
                .startedAt(entity.getStartedAt())
                .finishedAt(entity.getFinishedAt())
                .build();
    }
}
