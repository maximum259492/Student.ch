package org.studench.backend.services;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.studench.backend.data.User;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class JwtService {
    private final UserService userService;
    @Value("${jwt.signing.key}")
    private String jwtSigningKey;
    @Value("${jwt.refresh.expiration}")
    private String refreshExpiration;
    private final ExpiredTokenService expiredTokenService;



    /**
     * Extract username from token
     *
     * @param token token
     * @return username
     */
    public String extractUserName(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    /**
     * Generate token
     *
     * @param userDetails user data
     * @return token
     */
    public String generateAccessToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        if (userDetails instanceof User customUserDetails) {
            claims.put("id", customUserDetails.getId());
            claims.put("username", customUserDetails.getUsername());
            claims.put("role", customUserDetails.getRole());
        }
        return generateAccessToken(claims, userDetails);
    }

    public String createRefreshToken(String username) {
        Date now = new Date();
        Date refreshTokenValidity = new Date(now.getTime() + Long.parseLong(refreshExpiration));


        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(now)
                .setExpiration(refreshTokenValidity)
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();

    }


    /**
     * Check if token is valid
     *
     * @param token       token
     * @param userDetails user data
     * @return true, if token is valid
     */
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String userName = extractUserName(token);
        boolean loggedOutAndExpired = expiredTokenService.existsByToken(token) && !isTokenExpired(token);
        return (userName.equals(userDetails.getUsername())) && !isTokenExpired(token)  && !loggedOutAndExpired;
    }


    /**
     * Extract data from token
     *
     * @param token           token
     * @param claimsResolvers data resolver
     * @param <T>             data type
     * @return data
     */
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolvers) {
        final Claims claims = extractAllClaims(token);
        return claimsResolvers.apply(claims);
    }

    /**
     * Generate token
     *
     * @param extraClaims additional data
     * @param userDetails user data
     * @return token
     */
    private String generateAccessToken(Map<String, Object> extraClaims, UserDetails userDetails) {
        return Jwts.builder().setClaims(extraClaims).setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 100000 * 60 * 24))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256).compact();
    }


    /**
     * Check if token is expired
     *
     * @param token token
     * @return true, if token is expired
     */
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    /**
     * Extract expiration date from token
     *
     * @param token token
     * @return expiration date
     */
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    /**
     * Extract all data from token
     *
     * @param token token
     * @return data
     */
    private Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(getSigningKey()).build().parseClaimsJws(token)
                .getBody();
    }

    /**
     * Get signing key
     *
     * @return key
     */
    public Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(jwtSigningKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String refreshToken(String refreshToken) {
        if (isRefreshTokenValid(refreshToken)) {
            String username = extractUserName(refreshToken);

//            parse refresh token and get username
            var user = userService
                    .userDetailsService()
                    .loadUserByUsername(username);
            return generateAccessToken(user);
        } else {
            // Throw an exception or return null to indicate invalid refresh token
            throw new IllegalArgumentException("Invalid refresh token");
        }
    }

    // Helper method to check refresh token validity (already exists in the class)
    private boolean isRefreshTokenValid(String token) {
        // This method already exists in your class, reuse it for checking refresh token validity
        return !isTokenExpired(token);
    }


}