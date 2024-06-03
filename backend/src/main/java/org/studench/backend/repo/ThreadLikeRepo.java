package org.studench.backend.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.studench.backend.data.ThreadLike;

import java.util.List;
import java.util.Optional;
@Repository
public interface ThreadLikeRepo extends JpaRepository<ThreadLike, Long> {
    @Query("select count(tl) from ThreadLike tl where tl.thread.id = ?1")
    Long countByThreadId(Long threadId);

    @Query("select tl from ThreadLike tl where tl.user.id = ?1 and tl.thread.id = ?2")
    Optional<ThreadLike> findByUserIdAndThreadId(Long userId, Long threadId);

    @Query("select tl from ThreadLike tl where tl.user.id = ?1")
    List<ThreadLike> findByUserId(Long userId);
}
