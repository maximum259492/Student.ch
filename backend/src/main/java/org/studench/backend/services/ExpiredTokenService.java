package org.studench.backend.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.studench.backend.data.ExpiredToken;
import org.studench.backend.repo.ExpiredTokenRepo;

@Service
@RequiredArgsConstructor
public class ExpiredTokenService {
    private final ExpiredTokenRepo expiredTokenRepo;

    public boolean existsByToken(String token) {
        return expiredTokenRepo.existsByToken(token);
    }



    public void saveToken(String token) {
        ExpiredToken expiredToken = new ExpiredToken();
        expiredToken.setToken(token);
        expiredTokenRepo.save(expiredToken);
    }

}
