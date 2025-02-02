package com.launchcodeconnect.task_tracker.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@Entity
public class User extends AbstractEntity implements UserDetails {

    @NotNull
    @Column(name = "username")
    @Size(min = 2, max = 40, message = "Username must be between 2 and 40 characters")
    private String username;

    @NotNull
    @Email(message = "Email format not valid")
    @Column(unique = true)
    private String email;

    @NotNull
    @Size(min = 4, message = "Password must be at least 4 characters")
    @Column(name = "password")
    private String password;

    public User() {
    }

    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    @Column(name = "enabled")
    private boolean enabled = false;

    @Column(name = "verification_token")
    private String verificationToken;

    @Column(name = "reset_token", unique = true)
    private String resetToken;

    @Column(name = "token_expiration")
    private LocalDateTime tokenExpiration;

    @OneToMany(mappedBy = "assignee", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Task> tasks;

    @ManyToMany
    @JoinTable(
            name = "user_team",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "team_id")
    )
    @JsonManagedReference
    private List<Team> teams;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Comment> comments;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Notification> notifications;

    public boolean isMatchingPassword(String password) {
        return password.matches(getPassword());
    }

    public boolean isPasswordEmpty() {
        return getPassword() == null || getPassword().isEmpty();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

    public void generateVerificationToken() {
        this.verificationToken = UUID.randomUUID().toString();
    }

    public boolean verifyToken(String token) {
        return this.verificationToken != null && this.verificationToken.equals(token);
    }

    public void generateResetToken() {
        this.resetToken = UUID.randomUUID().toString();
        this.tokenExpiration = LocalDateTime.now().plusDays(1); //Token valid for 1 day
    }

    public boolean isResetTokenValid(String token) {
        return this.resetToken != null && this.resetToken.equals(token) &&
                this.tokenExpiration != null && this.tokenExpiration.isAfter(LocalDateTime.now());
    }

    public void clearResetToken() {
        this.resetToken = null;
        this.tokenExpiration = null;
    }

}
