package com.sizakan.backend.history;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/history")
public class HistoryController {

    @Autowired
    private HistoryService historyService;

    @GetMapping
    public List<History> getHistory(@RequestParam Long userId) {
        return historyService.getHistory(userId);
    }
}