package com.sizakan.backend.auth;

import jakarta.persistence.*; //JPA(DBとつなぐためのアノテーション)

//getter,setterを自動生成
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity //クラスをDBに保存するため
@Table(name = "users") //table名を指定

//Lombokのアノテーション
@Getter
@Setter
@NoArgsConstructor

public class User {

    @Id //主キー
    @GeneratedValue(strategy = GenerationType.IDENTITY) //自動でIDを生成
    private Long id;

    private String username;
    private String email;
    private String password;
}
