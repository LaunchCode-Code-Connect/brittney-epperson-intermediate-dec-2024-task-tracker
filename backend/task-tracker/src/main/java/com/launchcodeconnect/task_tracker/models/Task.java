package com.launchcodeconnect.task_tracker.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@Entity
public class Task extends AbstractEntity{

    private String title;

    private String description;

    private Date dueDate;

    private boolean completed;

    public Task() {
    }

    public Task(String title, String description, Date dueDate, boolean completed, User assignee) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.completed = completed;
        this.assignee = assignee;
    }

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "assignee_id", nullable = false)
    @JsonBackReference
    private User assignee;

    @ManyToOne
    @JoinColumn(name = "team_id")
    private Team team;

    @OneToMany(mappedBy = "task")
    @JsonIgnore
    private List<Comment> comments;

    @OneToMany(mappedBy = "task")
    @JsonIgnore
    private List<Notification> notifications;

}
