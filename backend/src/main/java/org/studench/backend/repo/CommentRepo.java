package org.studench.backend.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.studench.backend.data.Comment;

import java.util.List;
@Repository

public interface CommentRepo extends JpaRepository<Comment, Long> {

    List<Comment> findAllByThreadId(Long threadId);
}
