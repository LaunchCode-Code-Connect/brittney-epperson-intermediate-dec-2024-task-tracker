package com.launchcodeconnect.task_tracker.data;

import com.launchcodeconnect.task_tracker.models.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {

    //Find all comments for a task
    List<Comment> findByTaskId(int taskId);

    //Find all comments for a user
    List<Comment> findByUserId(int userId);

}
