package org.studench.backend.data;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;

@Data
@Entity
@Table(name = "thread_themes")


public class ThreadTheme {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
//   LEARNING, DORMITORY, CANTEEN

    public ThreadTheme() {
    }

    public ThreadTheme(String name) {
        this.name = name;
    }
}
