package com.launchcodeconnect.task_tracker.models.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponse {

    private String token;

    private long expiresIn;

    private String email;

    private String username;

}
