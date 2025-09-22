package com.example.approval.controller;

import com.example.approval.dto.retrieveAllInputDto;
import com.example.approval.dto.retrieveAllOutputDto;
import com.example.approval.service.RetrieveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/retrieve")
public class RetrieveController {

    @Autowired
    private RetrieveService retrieveService;

    @GetMapping
    public ResponseEntity<?> retrieveAll(@RequestBody retrieveAllInputDto input){
        List<retrieveAllOutputDto> output = retrieveService.retrieveAll(input);

        return ResponseEntity.ok(output);
    }
}
