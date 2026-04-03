package com.sizakan.backend.history;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HistoryService {

    @Autowired
    private HistoryRepository historyRepository;

    public void addHistory(String materialName, String action, String oldValue, String newValue, Long userId) {
        History h = new History();
        h.setMaterialName(materialName);
        h.setAction(action);
        h.setOldValue(oldValue);
        h.setNewValue(newValue);
        h.setUserId(userId);

        historyRepository.save(h);
    }

    public List<History> getHistory(Long userId) {
    return historyRepository.findByUserIdOrderByCreatedAtDesc(userId);

    }
}