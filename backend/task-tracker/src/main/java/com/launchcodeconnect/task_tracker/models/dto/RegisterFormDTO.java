package com.launchcodeconnect.task_tracker.models.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterFormDTO extends LoginFormDTO {

    @NotNull
    @NotBlank
    @Size(min = 2, max = 40, message = "Invalid username. Must be between 2 and 40 characters.")
    private String username;

    private String verifyPassword;

}
