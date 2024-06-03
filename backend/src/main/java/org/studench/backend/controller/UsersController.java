package org.studench.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.studench.backend.data.User;
import org.studench.backend.services.UserService;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UsersController {
    private final UserService userService;


    @GetMapping("/admin/all_users")
    public List<User> getAllUsers() {
        try {
            return userService.getAllUsers();
        } catch (Exception e) {
            throw new RuntimeException("Error while getting all users", e);
        }
    }

    @PatchMapping("/admin/{id}/ban")
    public void deleteUser(@PathVariable Long id) {
        try {
            userService.banUser(id);

        } catch (Exception e) {
            throw new RuntimeException("Error while deleting user", e);
        }
    }

    @PatchMapping("/admin/{id}/unban")
    public void unbanUser(@PathVariable Long id) {
        try {
            userService.unbanUser(id);

        } catch (Exception e) {
            throw new RuntimeException("Error while deleting user", e);
        }
    }
    @PatchMapping("/admin/{id}/set_moderator")
    public void setModerator(@PathVariable Long id) {
        try {
            userService.setModerator(id);

        } catch (Exception e) {
            throw new RuntimeException("Error while deleting user", e);
        }
    }

    @PatchMapping("/admin/{id}/set_user")
    public void setUser(@PathVariable Long id) {
        try {
            userService.setUser(id);

        } catch (Exception e) {
            throw new RuntimeException("Error while deleting user", e);
        }
    }
}
