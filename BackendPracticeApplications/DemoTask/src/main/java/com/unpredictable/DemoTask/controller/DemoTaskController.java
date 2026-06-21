package com.unpredictable.DemoTask.controller;

import com.unpredictable.DemoTask.dto.DemoTaskRequestDTO;
import com.unpredictable.DemoTask.dto.DemoTaskResponseDTO;
import com.unpredictable.DemoTask.enums.ForWhen;
import com.unpredictable.DemoTask.service.DemoTaskServiceHelper;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/tasks")
public class DemoTaskController {

    private final DemoTaskServiceHelper service;

    // ADD TASK
    @PostMapping
    public ResponseEntity<DemoTaskResponseDTO> addTask(@Valid @RequestBody DemoTaskRequestDTO request)
    {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(service.createTask(request));
    }

    // GET ALL TASKS
    @GetMapping
    public ResponseEntity<List<DemoTaskResponseDTO>> getAllTasks()
    {
        return ResponseEntity.ok(service.getAllTasks());
    }

    // FILTER BY FORWHEN
    @GetMapping("/filter/forWhen/{forWhen}")
    public ResponseEntity<List<DemoTaskResponseDTO>> getTasksByForWhen(@PathVariable ForWhen forWhen)
    {
        return ResponseEntity.ok(service.getAllTaskByForWhen(forWhen));
    }

    // GET TASK BY ID
    @GetMapping("/{id}")
    public ResponseEntity<DemoTaskResponseDTO> getTaskById(@PathVariable Long id)
    {
        return ResponseEntity.ok(service.getTaskById(id));
    }

    // START TASK
    @PutMapping("/{id}/start")
    public ResponseEntity<DemoTaskResponseDTO> startTask(@PathVariable Long id)
    {
        return ResponseEntity.ok(service.startTask(id));
    }

    // COMPLETE TASK
    @PutMapping("/{id}/complete")
    public ResponseEntity<DemoTaskResponseDTO> completeTask(@PathVariable Long id)
    {
        return ResponseEntity.ok(service.completeTask(id));
    }

    // DELETE TASK
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTask(@PathVariable Long id)
    {
        service.deleteTask(id);
        return ResponseEntity.noContent().build();
    }
}