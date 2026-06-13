package com.unpredictable.TaskTracker.repository;

import com.unpredictable.TaskTracker.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository interface for Task entity.
 *
 * By extending JpaRepository<Task, Long>, Spring Data JPA
 * automatically provides common database operations such as:
 *
 * - save()          -> Insert or update a task
 * - findById()      -> Find a task by its ID
 * - findAll()       -> Retrieve all tasks
 * - deleteById()    -> Delete a task using its ID
 * - delete()        -> Delete a task
 * - count()         -> Count total tasks
 * - existsById()    -> Check if a task exists
 *
 * No implementation class is required because Spring Data JPA
 * generates it automatically at runtime.
 */
public interface TaskRepository extends JpaRepository<Task, Long> {

    // Custom query methods can be added here.
    // Example:
    // List<Task> findByPriority(Priority priority);
    // List<Task> findByForWhen(ForWhen forWhen);

}