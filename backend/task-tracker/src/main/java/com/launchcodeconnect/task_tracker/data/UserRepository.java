package com.launchcodeconnect.task_tracker.data;

import com.launchcodeconnect.task_tracker.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findById (int id);

    User findByUsername (String username);

    Optional<User> findByEmail (String email);

    User findByVerificationToken(String token);

    Optional<User> findByResetToken(String resetToken);

}
