package com.example.approval.controller;

import com.example.approval.dto.retrieveAllInputDto;
import com.example.approval.service.DraftService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/retrieve")
public class RetrieveController {

    @Autowired
    private DraftService draftService;

    @GetMapping
    public ResponseEntity<?> retrieveAll(retrieveAllInputDto input){

        return ResponseEntity.ok("전체조회 성공");
    }
}
