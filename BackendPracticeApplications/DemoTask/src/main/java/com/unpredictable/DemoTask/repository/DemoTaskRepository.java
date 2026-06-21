package com.unpredictable.DemoTask.repository;

import com.unpredictable.DemoTask.entity.TaskEntity;
import com.unpredictable.DemoTask.enums.ForWhen;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DemoTaskRepository extends JpaRepository<TaskEntity, Long>
{
    List<TaskEntity> findByForWhen(ForWhen forWhen);
}
