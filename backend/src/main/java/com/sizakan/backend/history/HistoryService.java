package com.sizakan.backend.history;

import com.sizakan.backend.auth.User;
import com.sizakan.backend.auth.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HistoryService {

    @Autowired
    private HistoryRepository historyRepository;

    @Autowired
    private UserRepository userRepository;

    public void addHistory(String materialName, String action, String oldValue, String newValue, Long userId) {
        History h = new History();
        h.setMaterialName(materialName);
        h.setAction(action);
        h.setOldValue(oldValue);
        h.setNewValue(newValue);
        h.setUserId(userId);

        User user = userRepository.findById(userId).orElse(null);
        if (user != null) {
            h.setUserName(user.getUsername());
        }

        historyRepository.save(h);
    }

    public List<History> getHistory(Long userId, int page, int size) {
        List<History> histories = historyRepository.findByUserIdOrderByCreatedAtDesc(userId);

        histories.forEach(h -> {
            if (h.getUserName() == null) {
                User user = userRepository.findById(h.getUserId()).orElse(null);
                if (user != null) {
                    h.setUserName(user.getUsername());
                }
            }
        });

        return histories.stream()
                .skip((long) page * size)
                .limit(size)
                .toList();
    }
}