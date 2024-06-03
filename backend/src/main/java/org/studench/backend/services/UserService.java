package org.studench.backend.services;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.studench.backend.data.Role;
import org.studench.backend.data.User;
import org.studench.backend.repo.RolesRepo;
import org.studench.backend.repo.UserRepo;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

        private final UserRepo repository;
        private final RolesRepo rolesRepo;

        /**
         *  User save
         *
         * @return saved user
         */
        public User save(User user) {
            return repository.save(user);
        }


        /**
         * User creating
         *
         * @return created user
         */
        public User create(User user) {
            if (repository.existsByUsername(user.getUsername())) {

                throw new RuntimeException("User with this username already exists");
            }


            return save(user);
        }

        /**
         * Get user by username
         *
         * @return user
         */
        public User getByUsername(String username) {
            return repository.findByUsername(username)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        }

        /**
         * Get user by username
         *
         * @return user
         */
        public UserDetailsService userDetailsService() {
            return this::getByUsername;
        }


        public User getCurrentUser()
        {
            // Get the username from the security context
            var username = SecurityContextHolder.getContext().getAuthentication().getName();
            return getByUsername(username);
        }


        boolean existsByUsername(String username) {
            return repository.existsByUsername(username);
        }

        public List<User> getAllUsers() {
            List <User> users = repository.findAllUsersAndModerators();
            return users;
        }

        public void banUser(Long id) {
            User user = repository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
            user.setEnabled(false);
            repository.save(user);
        }

        public void unbanUser(Long id) {
            User user = repository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
            user.setEnabled(true);
            repository.save(user);
        }

        public void setModerator(Long id) {
            User user = repository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
            user.setRole(rolesRepo.findByName("MODERATOR"));
            repository.save(user);
        }

        public void setUser(Long id) {
            User user = repository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
            user.setRole(rolesRepo.findByName("USER"));
            repository.save(user);
        }
    }

