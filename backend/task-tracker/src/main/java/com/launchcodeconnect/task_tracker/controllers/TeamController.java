package com.launchcodeconnect.task_tracker.controllers;

import com.launchcodeconnect.task_tracker.data.TeamRepository;
import com.launchcodeconnect.task_tracker.data.UserRepository;
import com.launchcodeconnect.task_tracker.models.Team;
import com.launchcodeconnect.task_tracker.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/teams")
public class TeamController {

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<Team>> getAllTeams() {
        List<Team> teams = teamRepository.findAll();
        return ResponseEntity.ok(teams);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Team> getTeamById(@PathVariable("id") int id) {
        return teamRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Team> createTeam(@RequestBody Team team) {
        Team newTeam = teamRepository.save(team);
        return ResponseEntity.ok(newTeam);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Team> updateTeam(@PathVariable("id") int id, @RequestBody Team updatedTeam) {
        Optional<Team> teamOpt = teamRepository.findById(id);

        if (teamOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Team team = teamOpt.get();
        team.setName(updatedTeam.getName());
        team.setDescription(updatedTeam.getDescription());
        return ResponseEntity.ok(teamRepository.save(team));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTeam(@PathVariable("id") int id) {
        if (teamRepository.existsById(id)) {
            teamRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/{id}/users")
    public ResponseEntity<Team> assignUsersToTeam(@PathVariable("id") int id, @RequestBody List<User> users) {
        Optional<Team> teamOpt = teamRepository.findById(id);

        if (teamOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Team team = teamOpt.get();
        team.setUsers(users);
        return ResponseEntity.ok(teamRepository.save(team));
    }

}
