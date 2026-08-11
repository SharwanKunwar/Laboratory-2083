package com.unpredictableXCoder.FocusPlannerBackend.application.repository;

import com.unpredictableXCoder.FocusPlannerBackend.application.dto.TaskFilterRequest;
import com.unpredictableXCoder.FocusPlannerBackend.application.entity.TaskEntity;
import org.springframework.data.jpa.domain.Specification;

public class TaskSpecification {

    public static Specification<TaskEntity> filterBy(TaskFilterRequest filter) {
        return (root, query, cb) -> {
            var predicates = cb.conjunction();

            if (filter.getStatus() != null) {
                predicates.getExpressions().add(cb.equal(root.get("status"), filter.getStatus()));
            }
            if (filter.getPriority() != null) {
                predicates.getExpressions().add(cb.equal(root.get("priority"), filter.getPriority()));
            }
            if (filter.getForWhen() != null) {
                predicates.getExpressions().add(cb.equal(root.get("forWhen"), filter.getForWhen()));
            }
            
            return predicates;
        };
    }
}
