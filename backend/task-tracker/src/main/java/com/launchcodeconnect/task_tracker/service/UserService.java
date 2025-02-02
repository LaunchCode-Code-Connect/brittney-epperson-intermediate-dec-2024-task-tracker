package com.launchcodeconnect.task_tracker.service;

import com.launchcodeconnect.task_tracker.data.UserRepository;
import com.launchcodeconnect.task_tracker.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    @Autowired
    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       EmailService emailService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
        return user;
    }

    public void generateResetToken(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
        user.generateResetToken();
        userRepository.save(user);
        emailService.sendPasswordResetEmail(user);
    }

    public void resetPassword(String token, String newPassword) {
        User user = userRepository.findByResetToken(token)
                .orElseThrow(() -> new UsernameNotFoundException("User not found using provided token"));
        if (!user.isResetTokenValid(token)) {
            throw new IllegalArgumentException("Reset token is invalid or expired");
        }
        user.setPassword(passwordEncoder.encode(newPassword));
        user.clearResetToken();
        userRepository.save(user);
    }

    @Transactional
    public List<User> getAllUsersWithTeams() {
        List<User> users = userRepository.findAll();
        for (User user : users) {
            user.getTeams().size(); // Initialize the teams collection
        }
        return users;
    }
}
