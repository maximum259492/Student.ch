package org.studench.backend.repo;

import io.jsonwebtoken.security.Jwks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.studench.backend.data.Thread;

import java.util.List;
import java.util.Optional;
@Repository
public interface ThreadRepo extends JpaRepository<Thread, Long> {

    @Query("select t from Thread t where t.theme.id = ?1")
    List<Thread> findAllByThemeId(Long themeId);

    @Query("select t from Thread t order by t.date desc")

    List<Thread> findLatestThreads();

    boolean existsByText (String text);
}
