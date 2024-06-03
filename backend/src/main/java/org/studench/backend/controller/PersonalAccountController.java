package org.studench.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.studench.backend.data.ThreadLike;
import org.studench.backend.dto.UserShowDto;
import org.studench.backend.dto.UsernameEditDto;
import org.studench.backend.services.PersonalAccountService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.studench.backend.services.ThreadService;


import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/me")
public class PersonalAccountController {
    private final PersonalAccountService personalAccountService;
    private final ThreadService threadService;
    private static final Logger log = LoggerFactory.getLogger(ThreadController.class);

    @GetMapping("/info")
    public ResponseEntity<UserShowDto> getPersonalInfo() {
        return ResponseEntity.ok(personalAccountService.getCurrentUserInformation());
    }

    @PatchMapping("/edit_username")
    public ResponseEntity<String> editUsername(@RequestBody UsernameEditDto usernameEditDto) {
        personalAccountService.editUsername(usernameEditDto.getNewUsername());
        return ResponseEntity.noContent().build();
    }


    @GetMapping("/likedThreads")
    public ResponseEntity<List<ThreadLike>> getLikedThreads() {
        try {
            List<ThreadLike> likes = threadService.getLikesByUser();
            return ResponseEntity.ok().body(likes);
        } catch (Exception e) {
            log.error("Error while getting likes", e);
            throw new RuntimeException("Error while getting likes", e);
        }

    }

    @GetMapping("/role")
    public ResponseEntity<String> getRole() {
        String role = personalAccountService.getRole();
        return ResponseEntity.ok().body("{\"role\":\"" + role + "\"}");
    }

}
