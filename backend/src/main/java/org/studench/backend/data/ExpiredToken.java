package org.studench.backend.data;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "expired_tokens")
public class ExpiredToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String token;
}
