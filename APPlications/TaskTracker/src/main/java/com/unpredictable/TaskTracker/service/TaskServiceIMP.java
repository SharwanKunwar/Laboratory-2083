package com.unpredictable.TaskTracker.service;

import com.unpredictable.TaskTracker.model.Task;
import com.unpredictable.TaskTracker.repository.TaskRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskServiceIMP implements TaskService {

    // used to perform database operation
    private final TaskRepository taskRepository;

    @Override
    public List<Task> getAllTasks() {
        // fetch and return all tasks from the db
        return taskRepository.findAll();
    }

    @Override
    public Task addTask(Task task) {
        // Save a new task into the database
        return taskRepository.save(task);
    }

    @Override
    public Task getTaskById(Long id) {
        // Find task by id, throw exception if not found
        return taskRepository.findById(id).orElseThrow(()->new RuntimeException("Task not found"));
    }

    @Override
    public Task updateTask(Long id, Task task) {
        // updates existing task
        return null;
    }

    @Override
    public void deleteTaskById(Long id) {
        taskRepository.deleteById(id);
    }
}
