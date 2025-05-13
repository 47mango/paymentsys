package com.example.approval.controller;

import com.example.approval.service.DraftService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/draft")
public class DraftController {

    @Autowired
    private DraftService draftService;

    @PostMapping
    public ResponseEntity<Void> createDraft() {
//        draftService.
        return ResponseEntity.ok().build();
    }
}
