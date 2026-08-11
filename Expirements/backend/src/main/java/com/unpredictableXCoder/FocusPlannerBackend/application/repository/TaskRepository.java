package com.unpredictableXCoder.FocusPlannerBackend.application.repository;

import com.unpredictableXCoder.FocusPlannerBackend.application.entity.TaskEntity;
import com.unpredictableXCoder.FocusPlannerBackend.application.enums.ForWhen;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import com.unpredictableXCoder.FocusPlannerBackend.application.enums.Status;

public interface TaskRepository extends JpaRepository<TaskEntity, Long>, JpaSpecificationExecutor<TaskEntity>
{
    long countByStatus(Status status);
    long countByForWhen(ForWhen forWhen);
}
