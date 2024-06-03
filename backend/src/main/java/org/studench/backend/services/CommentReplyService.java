package org.studench.backend.services;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.studench.backend.data.CommentReply;
import org.studench.backend.data.User;
import org.studench.backend.dto.CommentReplyDto;
import org.studench.backend.repo.CommentReplyRepo;
import org.studench.backend.repo.CommentRepo;
import org.studench.backend.repo.ThreadRepo;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentReplyService {
    private final CommentRepo commentRepo;
    private final CommentReplyRepo commentReplyRepo;

    private static final Logger log = LoggerFactory.getLogger(CommentService.class);

    public void createCommentReply(CommentReplyDto commentReplyDto, Long commentId) {
        CommentReply commentReply = new CommentReply();
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        System.out.println(currentUser);
        commentReply.setText(commentReplyDto.getText());
        commentReply.setComment(commentRepo.findById(commentId).orElseThrow(() -> new IllegalArgumentException("Comment with id " + commentId + " not found")));
        commentReply.setAuthor(currentUser);
        commentReply.setDate(LocalDateTime.now());
        commentReplyRepo.save(commentReply);
    }

    public List<CommentReply> getCommentRepliesByComment(Long commentId) {
        return commentReplyRepo.findAllByCommentId(commentId);
    }

    public List<CommentReply> getAllCommentReplies() {
        return commentReplyRepo.findAll();
    }

}
