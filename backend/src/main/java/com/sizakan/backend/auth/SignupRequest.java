package com.sizakan.backend.auth;

//フロントから送られてくるサインアップのリクエストを受けとるクラス
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignupRequest {
    private String username;
    private String email;
    private String password;
}