package org.studench.backend.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.studench.backend.data.ThreadTheme;
@Repository
public interface ThreadThemeRepo extends JpaRepository<ThreadTheme, Long> {

    boolean existsByName(String name);

    ThreadTheme findByName(String name);
}
