package org.studench.backend.data;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.*;


import java.sql.Types;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Data
@Entity
@Table(name = "threads")
@AllArgsConstructor
@NoArgsConstructor
public class Thread {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String text;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "thread")
    @JsonIgnore
    private List<Comment> comments;
    @ManyToOne
    private ThreadTheme theme;
    @ManyToOne
    private User author;
    private LocalDateTime date;
    @JdbcTypeCode(Types.BINARY)

    @Column (nullable = true)
    private byte[] imageData;

    @OneToMany (mappedBy = "thread", cascade = CascadeType.ALL)
    @JsonIgnore
    private List <ThreadLike> likes;

    @OneToMany (mappedBy = "thread", cascade = CascadeType.ALL)
    @JsonIgnore
    private List <HideThread> hides;



}
