package org.studench.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.studench.backend.data.CommentReply;
import org.studench.backend.dto.CommentReplyDto;
import org.studench.backend.services.CommentReplyService;

import java.util.List;

@RestController
@RequestMapping("/comment/reply")
@RequiredArgsConstructor
public class CommentReplyController {
    private final CommentReplyService commentReplyService;
    @PostMapping("/create/{commentId}")
    public ResponseEntity<String> createCommentReply(@RequestBody CommentReplyDto commentReplyDto, @PathVariable Long commentId) {
        try {
            commentReplyService.createCommentReply(commentReplyDto, commentId);
            return ResponseEntity.ok("Comment reply created");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error while creating comment reply");
        }
    }

    @GetMapping("/get/{commentId}")
    public List <CommentReply> getCommentRepliesByComment(@PathVariable Long commentId) {
        try {

            return commentReplyService.getCommentRepliesByComment(commentId);
        } catch (Exception e) {
            throw new RuntimeException("Error while getting comment replies by comment", e);
        }
    }

    @GetMapping("/get")
    public List <CommentReply> getAllCommentReplies() {
        try {
            return commentReplyService.getAllCommentReplies();
        } catch (Exception e) {
            throw new RuntimeException("Error while getting all comment replies", e);
        }
    }
}
