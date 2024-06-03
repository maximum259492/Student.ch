package org.studench.backend.controller;

import jakarta.validation.Valid;
import jakarta.validation.ValidationException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.web.bind.annotation.*;
import org.studench.backend.dto.LoginDto;
import org.studench.backend.dto.RefreshTokenDto;
import org.studench.backend.dto.SignUpDto;
import org.studench.backend.exceptions.UsernameAlreadyExistsException;
import org.studench.backend.repo.ExpiredTokenRepo;
import org.studench.backend.repo.RolesRepo;
import org.studench.backend.services.AuthService;
import org.studench.backend.services.ExpiredTokenService;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

        private final AuthService authenticationService;
        private final RolesRepo rolesRepo;
    private final ExpiredTokenRepo expiredTokenRepo;
    private final ExpiredTokenService expiredTokenService;

    @PostMapping("/sign-up")
        public ResponseEntity <String> signUp(@RequestBody @Valid SignUpDto request) {
           try {
               return  ResponseEntity.ok().body("{\"access_token\":\"" + authenticationService.signUp(request) + "\"}");
           }
              catch (UsernameAlreadyExistsException e) {
                  return ResponseEntity.status(409).body("{\"error\":\"" + e.getMessage() + "\"}");
              } catch (ValidationException e) {
                  return ResponseEntity.badRequest().body("{\"error\":\"" + e.getMessage() + "\"}");

              } catch (Exception e) {
                    return ResponseEntity.internalServerError().body("{\"error\":\"" + e.getMessage() + "\"}");
              }


        }

        @PostMapping("/login")
        public ResponseEntity<Map<String,String>> signIn(@RequestBody @Valid LoginDto request) {
        try {
            return ResponseEntity.ok(authenticationService.signIn(request));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", e.getMessage()));
        }
        }

    @PostMapping("/refresh-token")
    public ResponseEntity<Map<String,String>> refreshToken(@RequestBody RefreshTokenDto refreshToken) {
        try {
            String newAccessToken = authenticationService.refreshAccessToken(refreshToken.getRefreshToken());
            Map<String, String> tokens = new HashMap<>();
            tokens.put("access_token", newAccessToken);
            return ResponseEntity.ok(tokens);
        } catch (Exception e) {
            // Handle any errors that occur during token refreshing
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", e.getMessage()));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(@RequestHeader("Authorization") String token) {
        try {
            String tokenValue = token.substring(7);
            expiredTokenService.saveToken(tokenValue);
            return ResponseEntity.ok().body("{\"result\":\"User logged out successfully\"}");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("{\"error\":\"" + e.getMessage() + "\"}");
        }
    }
}
