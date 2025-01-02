package com.launchcodeconnect.task_tracker.models.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class TaskDTO {

    private String title;
    private String description;
    private Date dueDate;
    private boolean completed;
    private int assigneeId;

}
