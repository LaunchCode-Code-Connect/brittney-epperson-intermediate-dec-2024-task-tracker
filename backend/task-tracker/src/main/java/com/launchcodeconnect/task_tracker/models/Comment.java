package com.launchcodeconnect.task_tracker.models;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;


@Getter
@Setter
@Entity
public class Comment extends AbstractEntity {

    private String message;

    private LocalDateTime timestamp;

    public Comment() {
    }

    public Comment(String message, LocalDateTime timestamp) {
        this.message = message;
        this.timestamp = timestamp;
    }

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "task_id")
    private Task task;

}