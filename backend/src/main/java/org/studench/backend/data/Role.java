package org.studench.backend.data;

import jakarta.annotation.PostConstruct;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;

@Data
@Table(name = "roles")
@Entity
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "name")
    private String name;
//    ROLES: USER, MODERATOR, ADMIN

    public Role() {
    }

    public Role(String name) {
        this.name = name;
    }

}
