package com.launchcodeconnect.task_tracker.service;

import com.launchcodeconnect.task_tracker.models.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;
    private final String frontendUrl;

    public EmailService(JavaMailSender mailSender, @Value("${frontend.url}") String frontendUrl) {
        this.mailSender = mailSender;
        this.frontendUrl = frontendUrl;
    }

    public void sendVerificationEmail(User user) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(user.getEmail());
        message.setSubject("Verify Your Email");

        String verificationUrl = frontendUrl + "/verify-email?token=" + user.getVerificationToken();
        message.setText("Click the link to verify your email: " + verificationUrl);

        mailSender.send(message);
    }

    public void sendPasswordResetEmail(User user) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(user.getEmail());
        message.setSubject("Password Reset Request");

        String resetUrl = frontendUrl + "/reset-password?token=" + user.getResetToken();
        message.setText("Click the link to reset your password: " + resetUrl);

        mailSender.send(message);
    }
}