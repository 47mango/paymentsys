package com.example.approval.controller;

import com.example.approval.dto.createDocInputDto;
import com.example.approval.dto.docLineDto;
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
    public ResponseEntity<?> createDraft(
            @RequestParam("user_id") String userId,
            @RequestParam("doc_ttl") String docTitle,
            @RequestParam("doc_line") String docLine,
            @RequestPart("doc_file") MultipartFile file
    ) {
        System.out.println("userId = " + userId);
        System.out.println("docTitle = " + docTitle);
        System.out.println("docLine = " + docLine);

        createDocInputDto input = new createDocInputDto();
        input.setUser_id(userId);
        input.setDoc_ttl(docTitle);
        try{
            ObjectMapper objectMapper = new ObjectMapper();
            List<docLineDto> temp = objectMapper.readValue(docLine, new TypeReference<List<docLineDto>>() {});
            System.out.println("temp = " + temp);
            input.setDoc_line(temp);
        } catch (Exception e) {
            e.printStackTrace();
        }

        String uploadDir = "C:/uploads/"; // 저장할 파일 경로
        input.setDoc_file(uploadDir + file.getOriginalFilename()); //파일경로 저장

        draftService.createDoc(input);

        // 디렉토리가 없다면 생성
        File directory = new File(uploadDir);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        File dest = new File(uploadDir + file.getOriginalFilename());

        try {
            file.transferTo(dest);  // 파일 저장
            System.out.println("파일 저장 완료: " + dest.getAbsolutePath());
            return ResponseEntity.ok("파일 저장 성공");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("파일 저장 실패");
        }

    }
}
