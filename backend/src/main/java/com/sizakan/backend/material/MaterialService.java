package com.sizakan.backend.material;

import com.sizakan.backend.history.HistoryService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MaterialService {

    @Autowired
    private MaterialRepository materialRepository;

    @Autowired
    private HistoryService historyService;

    // 作成
    public Material create(Material material) {
        Material saved = materialRepository.save(material);

        historyService.addHistory(
            saved.getName(),
            "add",
            null,
            String.valueOf(saved.getQuantity()),
            saved.getUserId()
        );

        return saved;
    }

    // ユーザーごとの一覧取得
    public List<Material> getAll(Long userId) {
        return materialRepository.findByUserId(userId);
    }

    // 更新
    public Material update(Long id, Material newData) {
        Material m = materialRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Material not found"));

        String oldValue = String.valueOf(m.getQuantity());

        m.setName(newData.getName());
        m.setQuantity(newData.getQuantity());
        m.setUnit(newData.getUnit());

        Material updated = materialRepository.save(m);

        historyService.addHistory(
            updated.getName(),
            "update",
            oldValue,
            String.valueOf(updated.getQuantity()),
            updated.getUserId()
        );

        return updated;
    }

    // 削除
    public void delete(Long id) {
        Material m = materialRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Material not found"));

        historyService.addHistory(
            m.getName(),
            "delete",
            String.valueOf(m.getQuantity()),
            null,
            m.getUserId()
        );

        materialRepository.deleteById(id);
    }
}