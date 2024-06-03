package org.studench.backend.services;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.multipart.MultipartFile;
import org.studench.backend.data.*;
import org.studench.backend.data.Thread;
import org.studench.backend.dto.ThreadDto;
import org.studench.backend.dto.ThreadLikeDto;
import org.studench.backend.repo.HideThreadRepo;
import org.studench.backend.repo.ThreadLikeRepo;
import org.studench.backend.repo.ThreadRepo;
import org.studench.backend.repo.ThreadThemeRepo;
import org.studench.backend.utils.ImageUtil;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.zip.DataFormatException;

import static org.studench.backend.utils.ImageUtil.uploadImage;

@Service
@RequiredArgsConstructor
public class ThreadService {
    private static final Logger log = LoggerFactory.getLogger(ThreadService.class);
    private final ThreadRepo threadRepo;
    private final ThreadThemeRepo threadThemeRepo;
    private final ThreadLikeRepo threadLikeRepo;
    private final HideThreadRepo hideThreadRepo;


    public Long createThread(ThreadDto threadDto, MultipartFile image) throws IOException {
        Thread thread = new Thread();

        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        thread.setAuthor(currentUser);
        thread.setTitle(threadDto.getTitle());
        thread.setText(threadDto.getText());
        thread.setDate(LocalDateTime.now());
        ThreadTheme theme = threadThemeRepo.findById(threadDto.getThemeId()).orElseThrow(() -> new IllegalArgumentException("Theme with id " + threadDto.getThemeId() + " not found"));
        thread.setTheme(theme);
        if (image != null) {
            byte[] imageData = ImageUtil.compressImage(uploadImage(image));
            thread.setImageData(imageData);
        }

        threadRepo.save(thread);

        return thread.getId();
    }


    public List<Thread> getThreadsByTheme(Long themeId) {
        List<Thread> foundThreads = threadRepo.findAllByThemeId(themeId);



//        get threads and for each thread get image and decompress it
        for (Thread thread : foundThreads) {
                if (thread.getImageData() != null) {
                    try {
                        thread.setImageData(ImageUtil.decompressImage(thread.getImageData()));
                    } catch (DataFormatException | IOException e) {
                        log.error("Error while decompressing image", e);
                    }
                }

        }

        List <Thread> threads = filterHiddenThreads(foundThreads);




//         add isPresent() check to avoid NullPointerException
        return threads;

    }

    public Thread getThread(Long threadId) {
        Thread thread = threadRepo.findById(threadId).orElseThrow(() -> new IllegalArgumentException("Thread with id " + threadId + " not found"));
        if (thread.getImageData() != null) {
            try {
                thread.setImageData(ImageUtil.decompressImage(thread.getImageData()));
            } catch (DataFormatException | IOException e) {
                log.error("Error while decompressing image", e);
            }
        }
        return thread;
    }

    public List<Thread> getLatestThreads() {
        List<Thread> foundThreads = threadRepo.findLatestThreads();


        for (Thread thread : foundThreads) {
            if (thread.getImageData() != null) {
                try {
                    thread.setImageData(ImageUtil.decompressImage(thread.getImageData()));
                } catch (DataFormatException | IOException e) {
                    log.error("Error while decompressing image", e);
                }
            }
        }
        List <Thread> threads = filterHiddenThreads(foundThreads);
        return threads.stream().limit(10).toList();
    }


    public List <Thread> filterHiddenThreads (List<Thread> threads){
        if (SecurityContextHolder.getContext().getAuthentication().getPrincipal() != "anonymousUser") {
            User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            threads.removeIf(thread -> hideThreadRepo.findByUserIdAndThreadId(currentUser.getId(), thread.getId()).isPresent());
        }
     return threads;
    }


    public boolean likeThread(Long threadId) {
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Thread thread = threadRepo.findById(threadId).orElseThrow(() -> new IllegalArgumentException("Thread with id " + threadId + " not found"));
        ThreadLike like = new ThreadLike();
        like.setUser(currentUser);
        like.setThread(thread);
        like.setLikedAt(LocalDateTime.now());
        threadLikeRepo.save(like);
        return threadLikeRepo.findByUserIdAndThreadId(currentUser.getId(), threadId).isPresent();

    }

    public boolean isLiked(Long threadId) {
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return threadLikeRepo.findByUserIdAndThreadId(currentUser.getId(), threadId).isPresent();
    }

    public List<ThreadLike> getLikesByUser(){
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return threadLikeRepo.findByUserId(currentUser.getId());
    }

    public boolean unlikeThread(Long threadId) {
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Optional<ThreadLike> like = threadLikeRepo.findByUserIdAndThreadId(currentUser.getId(), threadId);
        if (like.isPresent()) {
            threadLikeRepo.delete(like.get());
            return true;
        }
        return false;
    }

    public boolean hideThread(Long threadId) {
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Thread thread = threadRepo.findById(threadId).orElseThrow(() -> new IllegalArgumentException("Thread with id " + threadId + " not found"));
        HideThread hideThread = new HideThread();
        hideThread.setUser(currentUser);
        hideThread.setThread(thread);
        hideThreadRepo.save(hideThread);
        return hideThreadRepo.findByUserIdAndThreadId(currentUser.getId(), threadId).isPresent();
    }

    public List<Thread> getAllThreads() {
        List<Thread> threads = threadRepo.findAll();
        for (Thread thread : threads) {
            if (thread.getImageData() != null) {
                try {
                    thread.setImageData(ImageUtil.decompressImage(thread.getImageData()));
                } catch (DataFormatException | IOException e) {
                    log.error("Error while decompressing image", e);
                }
            }
        }
        return threads;
    }

    public void deleteThread(Long threadId) {
        threadRepo.deleteById(threadId);
    }

    public List <Thread> getAllHiddenThreads (){
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List <HideThread> hiddenThreads = hideThreadRepo.findByUserId(currentUser.getId());
        List <Thread> threads = hiddenThreads.stream().map(HideThread::getThread).collect(Collectors.toList());
        return threads;

    }

    @Transactional
    public void unhideThread(Long threadId) {
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        hideThreadRepo.deleteByThreadIdAndUserId(threadId, currentUser.getId());
    }


}
