package com.launchcodeconnect.task_tracker.models;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;


@Getter
@Setter
@Entity
public class Chat extends AbstractEntity {

    private String message;

    private LocalDateTime timestamp;

}
