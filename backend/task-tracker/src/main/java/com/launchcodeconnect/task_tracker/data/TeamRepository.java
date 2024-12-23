package com.launchcodeconnect.task_tracker.data;

import com.launchcodeconnect.task_tracker.models.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TeamRepository extends JpaRepository<Team, Integer> {

    //Find all teams a user belongs to
    @Query("SELECT t FROM Team t JOIN t.users u WHERE u.id = :userId")
    List<Team> findAllByUserId(@Param("userId") int userId);

    Optional<Team> findById(int id);

    Optional<Team> findByName(String name);

}
