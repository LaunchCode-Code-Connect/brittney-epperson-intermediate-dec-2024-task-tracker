package com.launchcodeconnect.task_tracker.models.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResetPasswordDTO {

    private String token;
    private String newPassword;

}
