package com.sizakan.backend.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;


//ユーザーを作り、DBに保存する
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public void signup(SignupRequest req) {
        User  user = new User();
        user.setUsername(req.getUsername());
        user.setEmail(req.getEmail());
        user.setPassword(req.getPassword()); //後でハッシュ化する
        userRepository.save(user);
    }
}