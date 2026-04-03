package com.sizakan.backend.history;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface HistoryRepository extends JpaRepository<History, Long> {
    List<History> findByUserIdOrderByCreatedAtDesc(Long userId);
}