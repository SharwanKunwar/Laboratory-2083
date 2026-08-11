package com.unpredictableXCoder.FocusPlannerBackend.application.service;

import com.unpredictableXCoder.FocusPlannerBackend.application.dto.CompleteTaskNoteAdd;
import com.unpredictableXCoder.FocusPlannerBackend.application.dto.DashboardResponse;
import com.unpredictableXCoder.FocusPlannerBackend.application.dto.TaskFilterRequest;
import com.unpredictableXCoder.FocusPlannerBackend.application.dto.TaskRequestDTO;
import com.unpredictableXCoder.FocusPlannerBackend.application.dto.TaskResponseDTO;
import com.unpredictableXCoder.FocusPlannerBackend.application.entity.TaskEntity;
import com.unpredictableXCoder.FocusPlannerBackend.application.enums.ForWhen;
import com.unpredictableXCoder.FocusPlannerBackend.application.enums.Status;
import com.unpredictableXCoder.FocusPlannerBackend.application.mapper.TaskMapper;
import com.unpredictableXCoder.FocusPlannerBackend.application.repository.TaskRepository;
import com.unpredictableXCoder.FocusPlannerBackend.application.repository.TaskSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskServiceIMP implements TaskServiceHelper {

    private final TaskRepository repository;
    private final TaskMapper mapper;

    @Override
    public TaskResponseDTO createTask(TaskRequestDTO request) {
        TaskEntity task = mapper.mapToEntity(request);
        TaskEntity savedTask = repository.save(task);
        return mapper.mapToResponse(savedTask);
    }

    @Override
    public List<TaskResponseDTO> getAllTasks() {
        List<TaskEntity> tasks = repository.findAll();
        return tasks.stream().map(mapper::mapToResponse).toList();
    }

    @Override
    public List<TaskResponseDTO> getAllTasksByForWhen(ForWhen forWhen) {
        TaskFilterRequest request = new TaskFilterRequest();
        request.setForWhen(forWhen);
        return filterTasks(request);
    }

    @Override
    public TaskResponseDTO getTaskById(Long id) {
        return mapper.mapToResponse(getTaskEntityById(id));
    }

    @Override
    public TaskResponseDTO startTask(Long id) {
        TaskEntity task = getTaskEntityById(id);

        if (task.getStatus() == Status.COMPLETED) {
            throw new IllegalStateException("Completed tasks cannot be started.");
        }

        task.setStatus(Status.IN_PROGRESS);
        task.setStartedAt(LocalDateTime.now());

        return mapper.mapToResponse(repository.save(task));
    }

    @Override
    public TaskResponseDTO completeTask(Long id, CompleteTaskNoteAdd taskNote) {
        TaskEntity task = getTaskEntityById(id);

        if (task.getStatus() == Status.COMPLETED) {
            throw new IllegalStateException("Task is already completed.");
        }
        if (task.getStatus() == Status.PENDING) {
            throw new IllegalStateException("Task is in pending state you cannot complete task at this moment.");
        }

        task.setStatus(Status.COMPLETED);
        task.setFinishedAt(LocalDateTime.now());

        if (taskNote != null && taskNote.getTaskNote() != null && !taskNote.getTaskNote().isBlank()) {
            task.setTaskNote(taskNote.getTaskNote().trim());
        }

        return mapper.mapToResponse(repository.save(task));
    }

    @Override
    public void deleteTaskById(Long id) {
        TaskEntity task = getTaskEntityById(id);
        repository.delete(task);
    }

    @Override
    public List<TaskResponseDTO> filterTasks(TaskFilterRequest filter) {
        List<TaskEntity> tasks = repository.findAll(TaskSpecification.filterBy(filter));
        return tasks.stream().map(mapper::mapToResponse).toList();
    }

    @Override
    public DashboardResponse getDashboardStats() {
        return DashboardResponse.builder()
                .totalTasks(repository.count())
                .pendingTasks(repository.countByStatus(Status.PENDING))
                .inProgressTasks(repository.countByStatus(Status.IN_PROGRESS))
                .completedTasks(repository.countByStatus(Status.COMPLETED))
                .todayTasks(repository.countByForWhen(ForWhen.TODAY))
                .tomorrowTasks(repository.countByForWhen(ForWhen.TOMORROW))
                .build();
    }

    private TaskEntity getTaskEntityById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task with id " + id + " not found"));
    }
}
