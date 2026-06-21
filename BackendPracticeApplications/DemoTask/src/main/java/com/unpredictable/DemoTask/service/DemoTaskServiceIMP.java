package com.unpredictable.DemoTask.service;

import com.unpredictable.DemoTask.dto.DemoTaskRequestDTO;
import com.unpredictable.DemoTask.dto.DemoTaskResponseDTO;
import com.unpredictable.DemoTask.entity.TaskEntity;
import com.unpredictable.DemoTask.enums.ForWhen;
import com.unpredictable.DemoTask.enums.TaskStatus;
import com.unpredictable.DemoTask.mapper.DemoTaskMapper;
import com.unpredictable.DemoTask.repository.DemoTaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DemoTaskServiceIMP implements DemoTaskServiceHelper{

    private final DemoTaskRepository repository;
    private final DemoTaskMapper mapper;

    @Override
    public DemoTaskResponseDTO createTask(DemoTaskRequestDTO request) {
        TaskEntity task = mapper.mapToEntity(request);
        TaskEntity savedTask = repository.save(task);
        return mapper.mapToResponse(savedTask);
    }

    @Override
    public DemoTaskResponseDTO getTaskById(Long id)
    {
        TaskEntity task = repository.findById(id).orElseThrow(()-> new RuntimeException("Task not found with id: "+id));
        return mapper.mapToResponse(task);
    }


    @Override
    public List<DemoTaskResponseDTO> getAllTasks()
    {
        List<TaskEntity> allTasks = repository.findAll();
        return allTasks.stream().map(mapper::mapToResponse).toList();
    }

    @Override
    public List<DemoTaskResponseDTO> getAllTaskByForWhen(ForWhen forWhen) {
        List<TaskEntity> tasks = repository.findByForWhen(forWhen);
        return tasks.stream().map(mapper::mapToResponse).toList();
    }

    @Override
    public DemoTaskResponseDTO startTask(Long id)
    {
        TaskEntity task = repository.findById(id).orElseThrow(() -> new RuntimeException("Task not found with id: "+id));
        task.setStatus(TaskStatus.IN_PROGRESS);
        task.setStartedAt(LocalDateTime.now());
        return mapper.mapToResponse(repository.save(task));
    }

    @Override
    public DemoTaskResponseDTO completeTask(Long id)
    {
        TaskEntity task = repository.findById(id).orElseThrow(() -> new RuntimeException("Task not found with id: "+id));
        task.setStatus(TaskStatus.FINISHED);
        task.setFinishedAt(LocalDateTime.now());

        return mapper.mapToResponse(repository.save(task));
    }

    @Override
    public void deleteTask(Long id) {
        TaskEntity task = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: "+id));

        repository.delete(task);
    }
}
