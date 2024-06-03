package org.studench.backend.dto;

import lombok.Data;

@Data
public class ThreadDto {
    private String title;
    private String text;
    private Long themeId;

}
