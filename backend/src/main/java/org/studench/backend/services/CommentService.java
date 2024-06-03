package org.studench.backend.services;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.studench.backend.data.Comment;
import org.studench.backend.data.User;
import org.studench.backend.dto.CommentDto;
import org.studench.backend.repo.CommentRepo;
import org.studench.backend.repo.ThreadRepo;
import org.studench.backend.utils.ImageUtil;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.zip.DataFormatException;

import static org.studench.backend.utils.ImageUtil.uploadImage;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepo commentRepo;
    private final ThreadRepo threadRepo;

    private static final Logger log = LoggerFactory.getLogger(CommentService.class);

    public void createComment(CommentDto commentDto, Long threadId, MultipartFile image) throws IOException {
        Comment comment = new Comment();
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        comment.setText(commentDto.getText());
        comment.setThread(threadRepo.findById(threadId).orElseThrow(() -> new IllegalArgumentException("Thread with id " + threadId + " not found")));
        comment.setAuthor(currentUser);
        comment.setDate(LocalDateTime.now());

        if (image != null) {
            byte[] imageData = ImageUtil.compressImage(uploadImage(image));
            comment.setImageData(imageData);
        }
        commentRepo.save(comment);

    }

    public List<Comment> getCommentsByThread(Long threadId) {
        List<Comment> comments = commentRepo.findAllByThreadId(threadId);
        for (Comment comment : comments) {
            if (comment.getImageData() != null) {
                try {
                    comment.setImageData(ImageUtil.decompressImage(comment.getImageData()));
                } catch (DataFormatException | IOException e) {
                    log.error("Error while decompressing image", e);
                }
            }
        }
        return comments;
    }

    public List<Comment> getAllComments() {
        List<Comment> comments = commentRepo.findAll();
        for (Comment comment : comments) {
            if (comment.getImageData() != null) {
                try {
                    comment.setImageData(ImageUtil.decompressImage(comment.getImageData()));
                } catch (DataFormatException | IOException e) {
                    log.error("Error while decompressing image", e);
                }
            }
        }
        return comments;
    }

    public void deleteComment(Long commentId) {
        commentRepo.deleteById(commentId);
    }

}
