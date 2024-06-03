package org.studench.backend.services;

import jakarta.validation.ValidationException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.studench.backend.data.User;
import org.studench.backend.dto.LoginDto;
import org.studench.backend.dto.SignUpDto;
import org.studench.backend.exceptions.UsernameAlreadyExistsException;
import org.studench.backend.repo.RolesRepo;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserService userService;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final RolesRepo rolesRepo;

    /**
     * Registration
     *
     * @param request user data
     *
     */
    public String signUp(SignUpDto request) {

        boolean exists = userService.existsByUsername(request.getUsername());
        if (exists) {
            throw new UsernameAlreadyExistsException("User with this username already exists");
        }
        else if (request.getUsername().length() < 5 || request.getUsername().length()> 50) {
            throw new ValidationException("Username should be between 5 and 50 characters");
        }
       try {
           User user = new User();

           user.setUsername(request.getUsername());
           user.setPassword(passwordEncoder.encode(request.getPassword()));
           user.setRole(rolesRepo.findById(request.getRoleId()).orElseThrow());
           user.setFirstName(request.getFirstName());
           user.setLastName(request.getLastName());

           userService.create(user);


           String accessToken = jwtService.generateAccessToken(user);

           return accessToken;
       }
         catch (Exception e) {
              throw new RuntimeException(e);
         }

    }

    /**
     * Authentication
     *
     * @param request user data
     * @return refresh and access tokens
     */
    public Map<String, String> signIn(LoginDto request) {

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                request.getUsername(),
                request.getPassword()
        ));

        var user = userService
                .userDetailsService()
                .loadUserByUsername(request.getUsername());

        String accessToken= jwtService.generateAccessToken(user);
        String refreshToken = jwtService.createRefreshToken(request.getUsername());
        Map<String, String> tokens = new HashMap<>();
        tokens.put("access_token", accessToken);
        tokens.put("refresh_token", refreshToken);
        return tokens;
    }


    public String refreshAccessToken(String refreshToken) {
        return jwtService.refreshToken(refreshToken);
    }
}
