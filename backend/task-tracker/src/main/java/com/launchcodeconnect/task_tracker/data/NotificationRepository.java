package com.launchcodeconnect.task_tracker.data;

import com.launchcodeconnect.task_tracker.models.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Integer> {

    //Find notifications for a user
    List<Notification> findByUserId(int userId);

}
