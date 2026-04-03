package com.sizakan.backend.material;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/materials")
public class MaterialController {

    @Autowired
    private MaterialService materialService;

    // 作成
    @PostMapping
    public Material create(@RequestBody Material material) {
        return materialService.create(material);
    }

    // 一覧取得
    @GetMapping
    public List<Material> getAll(@RequestParam Long userId) {
        return materialService.getAll(userId);
    }

    // 更新
    @PutMapping("/{id}")
    public Material update(@PathVariable Long id, @RequestBody Material material) {
        return materialService.update(id, material);
    }

    // 削除
    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        materialService.delete(id);
        return "deleted";
    }
}