package com.unpredictable.DemoTask.service;

import com.unpredictable.DemoTask.dto.DemoTaskRequestDTO;
import com.unpredictable.DemoTask.dto.DemoTaskResponseDTO;
import com.unpredictable.DemoTask.enums.ForWhen;

import java.util.List;

public interface DemoTaskServiceHelper
{
    DemoTaskResponseDTO createTask(DemoTaskRequestDTO request);
    DemoTaskResponseDTO getTaskById(Long id);
    List<DemoTaskResponseDTO> getAllTasks();
    List<DemoTaskResponseDTO> getAllTaskByForWhen(ForWhen forWhen);
    DemoTaskResponseDTO startTask(Long id);
    DemoTaskResponseDTO completeTask(Long id);
    void deleteTask(Long id);

}
