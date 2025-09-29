package com.example.approval.controller;

import com.example.approval.dto.retrieveAllInputDto;
import com.example.approval.dto.retrieveAllOutputDto;
import com.example.approval.dto.retrieveDocInputDto;
import com.example.approval.dto.retrieveDocOutputDto;
import com.example.approval.service.RetrieveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/retrieve")
public class RetrieveController {

    @Autowired
    private RetrieveService retrieveService;

    @PostMapping
    public ResponseEntity<?> retrieveAll(@RequestBody retrieveAllInputDto input){
        System.out.println("user_id>>> " + input.getUser_id());

        List<retrieveAllOutputDto> output = retrieveService.retrieveAll(input);

        return ResponseEntity.ok(output);
    }

    @PostMapping("/doc")
    public ResponseEntity<?> retrieveDoc(@RequestBody retrieveDocInputDto input){
        System.out.println("user_id>>> " + input.getDoc_no());

        retrieveDocOutputDto output = retrieveService.retrieveDoc(input);

        return ResponseEntity.ok(output);
    }
}
