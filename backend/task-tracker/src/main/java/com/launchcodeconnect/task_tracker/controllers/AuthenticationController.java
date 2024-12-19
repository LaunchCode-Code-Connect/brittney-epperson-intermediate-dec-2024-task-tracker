package com.launchcodeconnect.task_tracker.controllers;

import com.launchcodeconnect.task_tracker.models.User;
import com.launchcodeconnect.task_tracker.models.dto.LoginFormDTO;
import com.launchcodeconnect.task_tracker.models.dto.LoginResponse;
import com.launchcodeconnect.task_tracker.models.dto.RegisterFormDTO;
import com.launchcodeconnect.task_tracker.service.AuthenticationService;
import com.launchcodeconnect.task_tracker.service.JwtService;
import com.launchcodeconnect.task_tracker.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class AuthenticationController {

    private final JwtService jwtService;

    private final AuthenticationService authenticationService;

    @Autowired
    private UserService userService;

    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody RegisterFormDTO registerUserDto) {
        User registeredUser = authenticationService.signup(registerUserDto);

        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginFormDTO loginUserDto) {
        User authenticatedUser = authenticationService.authenticate(loginUserDto);

        String jwtToken = jwtService.generateToken(authenticatedUser);

        LoginResponse loginResponse = new LoginResponse();
                loginResponse.setToken(jwtToken);
                loginResponse.setExpiresIn(jwtService.getExpirationTime());

        return ResponseEntity.ok(loginResponse);
    }

    @GetMapping("/verify-email")
    public ResponseEntity<String> showVerificationPage(@RequestParam String token) {
        return ResponseEntity.ok("Verification token received: " + token);
    }

    @PostMapping("/verify-email")
    public ResponseEntity<String> verifyEmail(@RequestParam String token) {
        boolean verified = authenticationService.verifyEmail(token);
        return verified
                ? ResponseEntity.ok("Email successfully verified")
                : ResponseEntity.badRequest().body("Invalid verification token");
    }


    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody String email) {
        userService.generateResetToken(email);
        return ResponseEntity.ok("Password reset link sent to your email.");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestParam String token, @RequestParam String newPassword) {
        userService.resetPassword(token, newPassword);
        return ResponseEntity.ok("Password has been successfully reset.");
    }

}
