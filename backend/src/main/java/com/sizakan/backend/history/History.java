package com.sizakan.backend.history;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class History {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String materialName;
    private String action;
    private String oldValue;
    private String newValue;
    private Long userId;

    @Column(name = "created_at")
    private java.sql.Timestamp createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = new java.sql.Timestamp(System.currentTimeMillis());
    }
}