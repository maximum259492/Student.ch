package org.studench.backend.repo;

import jakarta.persistence.SequenceGenerators;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.studench.backend.data.HideThread;

import java.util.List;
import java.util.Optional;

@Repository
public interface HideThreadRepo extends JpaRepository<HideThread, Long> {

    void deleteByThreadIdAndUserId(Long threadId, Long userId);

   Optional<HideThread> findByUserIdAndThreadId(Long userId, Long threadId);

   List<HideThread> findByUserId(Long userId);
}
