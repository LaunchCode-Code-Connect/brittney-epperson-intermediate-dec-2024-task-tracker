package com.launchcodeconnect.task_tracker.data;

import com.launchcodeconnect.task_tracker.models.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Integer> {

    List<Task> findAllByAssigneeId(int assigneeId);

    List<Task> findByTeamId(int teamId);

    List<Task> findByCompleted(boolean completed);

    //Find overdue tasks where due date is before current date
    @Query("SELECT t FROM Task t WHERE t.dueDate < CURRENT_DATE AND t.completed = false")
    List<Task> findOverdueTasks();

}
