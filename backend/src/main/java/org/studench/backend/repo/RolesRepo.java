package org.studench.backend.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.studench.backend.data.Role;

@Repository
public interface RolesRepo extends JpaRepository<Role, Integer> {
Role findByName(String name);

boolean existsByName(String name);
}
