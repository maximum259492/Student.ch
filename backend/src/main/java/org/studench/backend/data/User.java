package org.studench.backend.data;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;


@Data
@Table(name = "users")
@Entity

public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name" , nullable = false)
    private String firstName;
    @Column(name = "last_name", nullable = false)
    private String lastName;
    @Column(name = "username", unique = true, nullable = false)
    private String username;
    @Column(name = "password" , nullable = false)
    private String password;


    @Column(name = "registered_at")
    private LocalDateTime registered_at;

    @Column(name = "updated_at")
    private LocalDateTime updated_at;

    @ManyToOne
    private Role role;


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        String roleNameWithPrefix = "ROLE_" + role.getName();
        return List.of(new SimpleGrantedAuthority(roleNameWithPrefix));
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Column(name = "is_enabled")
    private boolean isEnabled = true;


    public User() {
        this.registered_at = LocalDateTime.now();
        this.updated_at = LocalDateTime.now();
    }

    @Override
    public String getUsername() {
        return username;
    }
    @Override
     public String getPassword() {
         return password;
     }



}
