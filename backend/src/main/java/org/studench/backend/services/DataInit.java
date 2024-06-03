package org.studench.backend.services;

import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.studench.backend.data.Role;
import org.studench.backend.data.Thread;
import org.studench.backend.data.ThreadTheme;
import org.studench.backend.data.User;
import org.studench.backend.repo.*;

import java.util.ArrayList;
import java.util.List;

@Component
@AllArgsConstructor
public class DataInit {
   private final RolesRepo rolesRepo;
   private final ThreadThemeRepo threadThemeRepo;
   private final ThreadRepo threadRepo;
   private final UserRepo userRepo;
   private final PasswordEncoder passwordEncoder;


   @PostConstruct
   public void init() {
        List<String> roles = new ArrayList<>();
        roles.add("ADMIN");
        roles.add("MODERATOR");
        roles.add("USER");

            for (String role : roles) {
                if (!rolesRepo.existsByName(role)) {
                    rolesRepo.save(new Role(role));
                }
            }

        List<String> themes = new ArrayList<>();
        themes.add("STUDY");
        themes.add("DORMITORY");
        themes.add("FOOD");

            for (String theme : themes) {
                if (!threadThemeRepo.existsByName(theme)) {
                    threadThemeRepo.save(new ThreadTheme(theme));
                }
            }
        List<User> users = new ArrayList<>();
        User user = new User();
        user.setUsername("user");
        user.setPassword((passwordEncoder.encode("user")));
        user.setRole(rolesRepo.findByName("USER"));
        user.setFirstName("Andrey");
        user.setLastName("Petrenko");
        users.add(user);

        User admin = new User();
        admin.setUsername("admin");
        admin.setPassword((passwordEncoder.encode("admin")));
        admin.setRole(rolesRepo.findByName("ADMIN"));
        admin.setFirstName("Ksenia");
        admin.setLastName("Koval");
        users.add(admin);

        User moderator = new User();
        moderator.setUsername("moderator");
        moderator.setPassword((passwordEncoder.encode("moderator")));
        moderator.setRole(rolesRepo.findByName("MODERATOR"));
        moderator.setFirstName("Taras");
        moderator.setLastName("Onyshchuk");
        users.add(moderator);

        for (User u : users) {
            if (!userRepo.existsByUsername(u.getUsername())) {
                userRepo.save(u);
            }
        }

        List <Thread> threads = new ArrayList<>();

        Thread thread = new Thread();
        thread.setTitle("В нашому університеті відкрили новий корпус");
        thread.setText("12.04.2024 урочисто відкрили новий корпус, де буде навчатися 1000 студентів. Відкриття відбулося в присутності ректора університету, міського голови та гостей. Всім присутнім було вручено подарунки та проведено екскурсію по новому корпусу.");
        thread.setTheme(threadThemeRepo.findByName("STUDY"));
        thread.setDate(java.time.LocalDateTime.now());
        thread.setAuthor(userRepo.findByUsername("user").orElseThrow( () -> new IllegalArgumentException("User not found")));
        threads.add(thread);

        Thread thread1 = new Thread();
        thread1.setTitle("В нашому університеті відкрили новий гуртожиток");
        thread1.setText("12.04.2024 урочисто відкрили новий гуртожиток, де буде проживати 1000 студентів. Відкриття відбулося в присутності ректора університету, міського голови та гостей. Всім присутнім було вручено подарунки та проведено екскурсію по новому гуртожитку.");
        thread1.setTheme(threadThemeRepo.findByName("DORMITORY"));
        thread1.setDate(java.time.LocalDateTime.now());
        thread1.setAuthor(userRepo.findByUsername("admin").orElseThrow( () -> new IllegalArgumentException("User not found")));
        threads.add(thread1);

        Thread thread2 = new Thread();
        thread2.setTitle("В нашому університеті відкрили нову їдальню");
        thread2.setText("12.04.2024 урочисто відкрили нову їдальню, де буде харчуватися 1000 студентів. Відкриття відбулося в присутності ректора університету, міського голови та гостей. Всім присутнім було вручено подарунки та проведено екскурсію по новій їдальні.");
        thread2.setTheme(threadThemeRepo.findByName("FOOD"));
        thread2.setDate(java.time.LocalDateTime.now());
        thread2.setAuthor(userRepo.findByUsername("moderator").orElseThrow( () -> new IllegalArgumentException("User not found")));
        threads.add(thread2);

        Thread thread3 = new Thread();
        thread3.setTitle("Завтра о 12:00 відбудеться концерт групи 'Океан Ельзи'");
        thread3.setText("Завтра о 12:00 відбудеться концерт групи 'Океан Ельзи' в актовій залі університету. Вхід вільний для всіх бажаючих.");
        thread3.setTheme(threadThemeRepo.findByName("STUDY"));
       thread3.setDate(java.time.LocalDateTime.now());
        thread3.setAuthor(userRepo.findByUsername("admin").orElseThrow( () -> new IllegalArgumentException("User not found")));
        threads.add(thread3);

        Thread thread4 = new Thread();
        thread4.setTitle("До речі, хто знає, де можна скуштувати смачну піцу?");
        thread4.setText("До речі, хто знає, де можна скуштувати смачну піцу? Якщо ви знаєте, напишіть, будь ласка, адресу та відгук про заклад.");
        thread4.setTheme(threadThemeRepo.findByName("FOOD"));
       thread4.setDate(java.time.LocalDateTime.now());
        thread4.setAuthor(userRepo.findByUsername("user").orElseThrow( () -> new IllegalArgumentException("User not found")));
        threads.add(thread4);

        Thread thread5 = new Thread();
        thread5.setTitle("Де можна купити книги для навчання? Які книги краще купувати? Порадьте, будь ласка.");
        thread5.setText("Я студентка першого курсу та шукаю книги для навчання. Де можна купити книги для навчання? Які книги краще купувати? Порадьте, будь ласка.");
        thread5.setTheme(threadThemeRepo.findByName("STUDY"));
       thread5.setDate(java.time.LocalDateTime.now());
        thread5.setAuthor(userRepo.findByUsername("moderator").orElseThrow( () -> new IllegalArgumentException("User not found")));
        threads.add(thread5);

        for (Thread t : threads) {
            if (!threadRepo.existsByText(t.getText())) {
                threadRepo.save(t);
            }
        }








            








   }
}
