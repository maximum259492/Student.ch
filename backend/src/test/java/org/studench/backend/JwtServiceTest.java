package org.studench.backend;

import io.jsonwebtoken.Claims;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.studench.backend.services.JwtService;

import java.util.Date;

import static org.mockito.Mockito.when;

public class JwtServiceTest {

    @InjectMocks
    private JwtService jwtService;

    @Mock
    private Claims mockClaims;

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testExtractExpiration() {
        // Given
        String token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0X3VzZXJxIiwiaWF0IjoxNzE0Njc3MjM0LCJleHAiOjE3MTcyNjkyMzR9.NdoD1dKRvJGQx9VYxkzetpgHflfbYqu-24759Nh2Geg";
        Date expirationDate = new Date();
        when(mockClaims.getExpiration()).thenReturn(expirationDate); // Ensure mockClaims returns a non-null value

        // When
        Date extractedExpiration = jwtService.extractExpiration(token);

        // Then
        System.out.println(extractedExpiration);
    }
}
