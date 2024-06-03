package org.studench.backend.dto;

import lombok.Data;
import org.studench.backend.data.Role;

@Data
public class UserShowDto {
    private String firstName;
    private String lastName;
    private String username;
    private Role role;
}
