package com.sizakan.backend.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController //web API を返すコントローラー
@RequestMapping("/auth") //URLの共通部分の決定
public class UserController {

    @Autowired //userServiceを自動で注入
    private UserService userService;

    @PostMapping("/signup") //post,auth,signupが来たらこの関数を呼び出す
    
    //フロントから送られてくるサインアップのリクエストを受けとる関数
    public String signup(@RequestBody SignupRequest req) {
        userService.signup(req);
        return "ok";
    }
}