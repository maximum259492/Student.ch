package org.studench.backend.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AccessTokenDto {

        private String token;

        public AccessTokenDto(String token) {
                this.token = token;
        }
}
