package com.sizakan.backend.auth;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;


//User エンティティを主キーLongで自動CRUDする
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}