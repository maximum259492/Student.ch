package org.studench.backend.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.studench.backend.data.ExpiredToken;

import java.util.Optional;

@Repository
public interface ExpiredTokenRepo extends JpaRepository<ExpiredToken, Long> {
    boolean existsByToken(String token);

    Optional <ExpiredToken> findByToken(String token);
}
