package com.launchcodeconnect.task_tracker.data;

import com.launchcodeconnect.task_tracker.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {

    User findByUsername (String username);

    User findByEmail (String email);

}
