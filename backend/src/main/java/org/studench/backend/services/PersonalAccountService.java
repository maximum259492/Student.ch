package org.studench.backend.services;

import lombok.RequiredArgsConstructor;
import org.springframework.cglib.core.Local;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.studench.backend.data.User;
import org.studench.backend.dto.UserShowDto;
import org.studench.backend.repo.UserRepo;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class PersonalAccountService {
    private final UserRepo userRepo;


    public UserShowDto getCurrentUserInformation() {
        var user = (User)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        var userShowDto = new UserShowDto();
        userShowDto.setFirstName(user.getFirstName());
        userShowDto.setLastName(user.getLastName());
        userShowDto.setUsername(user.getUsername());
        userShowDto.setRole(user.getRole());
        return userShowDto;

    }

    public void editUsername(String newUsername) {
        User user = (User)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        user.setUsername(newUsername);
        user.setUpdated_at(LocalDateTime.now());
        userRepo.save(user);

    }

    public String getRole() {
        User user = (User)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return user.getRole().getName();
    }
}
