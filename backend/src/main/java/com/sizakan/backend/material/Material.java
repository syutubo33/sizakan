package com.sizakan.backend.material;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Material {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private int quantity;
    private String unit;

    private Long userId;

    @Column(name = "created_at")
    private java.sql.Timestamp createdAt;

    @PrePersist
protected void onCreate() {
    this.createdAt = new java.sql.Timestamp(System.currentTimeMillis());
}
}