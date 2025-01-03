package com.launchcodeconnect.task_tracker.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
public class Team extends AbstractEntity{

    private String name;

    private String description;

    @ManyToMany(mappedBy = "teams")
    @JsonBackReference
    private List<User> users;

    @OneToMany(mappedBy = "team")
    @JsonIgnore
    private List<Task> tasks;

    @OneToMany(mappedBy = "team")
    @JsonIgnore
    private List<Notification> notifications;

    public Team() {
    }

    public Team(String name, String description) {
        this.name = name;
        this.description = description;
    }

    @Override
    public String toString() {
        return name;
    }

}
