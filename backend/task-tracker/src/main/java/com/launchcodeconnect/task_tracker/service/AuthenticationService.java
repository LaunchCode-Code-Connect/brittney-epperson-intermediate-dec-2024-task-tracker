package com.launchcodeconnect.task_tracker.service;

import com.launchcodeconnect.task_tracker.data.UserRepository;
import com.launchcodeconnect.task_tracker.models.User;
import com.launchcodeconnect.task_tracker.models.dto.LoginFormDTO;
import com.launchcodeconnect.task_tracker.models.dto.RegisterFormDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    @Autowired
    private JavaMailSender mailSender;

    private final String frontendUrl = "http://localhost:3000";

    public AuthenticationService(
            UserRepository userRepository,
            AuthenticationManager authenticationManager,
            PasswordEncoder passwordEncoder
    ) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User signup(RegisterFormDTO input) {
        User user = new User(
                input.getUsername(),
                passwordEncoder.encode(input.getPassword()),
                input.getEmail()
        );

        user.generateVerificationToken();
        User savedUser = userRepository.save(user);
        sendVerificationEmail(savedUser);
        return savedUser;
    }

    public User authenticate(LoginFormDTO input) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getEmail(),
                        input.getPassword()
                )
        );

        return userRepository.findByEmail(input.getEmail())
                .orElseThrow();
    }

    public boolean verifyEmail(String token) {
        User user = userRepository.findByVerificationToken(token);

        user.setEnabled(true);
        user.setVerificationToken(null);
        userRepository.save(user);

        return true;
    }

    public void sendVerificationEmail(User user) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(user.getEmail());
        message.setSubject("Verify Your Email");

        String verificationUrl = frontendUrl + "/verify-email?token=" + user.getVerificationToken();

        message.setText("Click the link to verify your email: " + verificationUrl);

        mailSender.send(message);
    }
}
