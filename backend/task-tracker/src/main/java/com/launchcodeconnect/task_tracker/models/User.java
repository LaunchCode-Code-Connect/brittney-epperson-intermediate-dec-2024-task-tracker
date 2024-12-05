package com.launchcodeconnect.task_tracker.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class User extends AbstractEntity {

    @NotNull
    @Column(unique = true)
    private String email;

    @NotNull
    @Size(min = 4, message = "Password must be at least 4 characters")
    @Column(name = "password")
    private String password;

    public User() {
    }

    public User(String password, String email) {
        this.password = password;
        this.email = email;
    }

    public boolean isMatchingPassword(String password) {
        return password.matches(getPassword());
    }

    public boolean isPasswordEmpty() {
        return getPassword() == null || getPassword().isEmpty();
    }
}
