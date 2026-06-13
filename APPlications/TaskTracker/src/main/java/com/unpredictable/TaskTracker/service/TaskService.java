package com.unpredictable.TaskTracker.service;

import com.unpredictable.TaskTracker.model.Task;

import java.util.List;

/**
 * Service interface for Task operations.
 *
 * This layer acts as a bridge between the Controller and Repository layers.
 * It defines all business operations that can be performed on Task objects.
 */
public interface TaskService {

    /**
     * Retrieve all tasks from the database.
     *
     * Purpose:
     * - Used when the user wants to view every task.
     * - Returns a list containing all stored tasks.
     *
     * @return List of all tasks.
     */
    List<Task> getAllTasks();

    /**
     * Create and save a new task.
     *
     * Purpose:
     * - Adds a new task to the database.
     * - Used when a user creates a task from the application.
     *
     * @param task Task object containing task details.
     * @return The saved task with generated ID.
     */
    Task createTask(Task task);

    /**
     * Find a task using its unique ID.
     *
     * Purpose:
     * - Retrieves a specific task.
     * - Useful for viewing task details or editing a task.
     *
     * @param id Task ID.
     * @return Task object if found.
     */
    Task getTaskById(Long id);

    /**
     * Update an existing task.
     *
     * Purpose:
     * - Modifies task information such as title,
     *   description, priority, or schedule.
     * - Replaces old task data with new values.
     *
     * @param id ID of the task to update.
     * @param task Updated task information.
     * @return Updated task object.
     */
    Task updateTask(Long id, Task task);

    /**
     * Delete a task using its ID.
     *
     * Purpose:
     * - Removes a task permanently from the database.
     * - Used when a task is no longer needed.
     *
     * @param id ID of the task to delete.
     */
    void deleteTaskById(Long id);
}