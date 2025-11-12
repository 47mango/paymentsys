package com.example.approval.controller;

import com.example.approval.dto.*;
import com.example.approval.service.CategoryService;
import com.example.approval.service.DocService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class DocController {

    @Autowired
    private DocService docService;

    @Autowired
    private CategoryService categoryService;

    @PostMapping("/draft")
    public ResponseEntity<?> createDraft(@RequestBody createDocInputDto input) {
        System.out.println("userId>>> " + input.getUser_id());
        System.out.println("docTitle>>> " + input.getDoc_ttl());
        System.out.println("docText>>> " + input.getDoc_text());
        System.out.println("docLine>>> " + input.getDoc_line());
        System.out.println("docLineSub Seq>>> " + input.getDoc_line().get(0).getSeq());
        System.out.println("docLineSub ApvrId>>> " + input.getDoc_line().get(0).getApvr_id());

        //카테고리 생성
        createCategoryOutputDto bizOutput1 = categoryService.extractKeywords(input.getDoc_ttl());

        //문서 저장
        input.setDoc_ctgr1(bizOutput1.getKeyword1());
        input.setDoc_ctgr2(bizOutput1.getKeyword2());
        String bizOutput2 = docService.createDoc(input);

        //결재선 생성
        input.setDoc_no(bizOutput2);
        docService.createLine(input);

        return ResponseEntity.ok("성공 docNo: " + bizOutput2);
    }

    @PostMapping("/retrieve")
    public ResponseEntity<?> retrieveAll(@RequestBody retrieveAllInputDto input){
        System.out.println("user_id>>> " + input.getUser_id());

        List<retrieveAllOutputDto> output = docService.retrieveAll(input);

        return ResponseEntity.ok(output);
    }

    @PostMapping("/retrieve/doc")
    public ResponseEntity<?> retrieveDoc(@RequestBody retrieveDocInputDto input){
        System.out.println("user_id>>> " + input.getDoc_no());

        retrieveDocOutputDto output = docService.retrieveDoc(input);

        return ResponseEntity.ok(output);
    }

    @PostMapping("/retrieve/category")
    public ResponseEntity<?> retrieveCategory(@RequestBody retrieveAllDocCategoryInputDto input){
        System.out.println("input>>>"+input);
        retrieveAllDocCategoryOutputDto output = docService.retrieveAllDocCategory(input);

        return ResponseEntity.ok(output);
    }

    @PostMapping("/update/doc")
    public ResponseEntity<?> updateDoc(@RequestBody updateDocInput input){
        System.out.println("input>>>"+input);
        docService.updateDoc(input);

        return ResponseEntity.ok("");
    }
}
