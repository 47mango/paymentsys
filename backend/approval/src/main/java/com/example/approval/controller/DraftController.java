package com.example.approval.controller;

import com.example.approval.dto.createDocInputDto;
import com.example.approval.dto.docLineSubDto;
import com.example.approval.service.DraftService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/draft")
public class DraftController {

    @Autowired
    private DraftService draftService;

    @PostMapping
    public ResponseEntity<?> createDraft(@RequestBody createDocInputDto input) {
        System.out.println("userId>>> " + input.getUser_id());
        System.out.println("docTitle>>> " + input.getDoc_ttl());
        System.out.println("docText>>> " + input.getDoc_text());
        System.out.println("docLine>>> " + input.getDoc_line());
        System.out.println("docLineSub Seq>>> " + input.getDoc_line().get(0).getSeq());
        System.out.println("docLineSub ApvrId>>> " + input.getDoc_line().get(0).getApvr_id());

        draftService.createDoc(input);

        return ResponseEntity.ok("문서 저장 성공... 전체 조회 시작");

    }
}
