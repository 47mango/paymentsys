package com.example.approval.controller;

import com.example.approval.dto.*;
import com.example.approval.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<?> retrieveAllUser(){
        List<retrieveAllUserOutputDto> result = userService.retrieveAllUser();
        return ResponseEntity.ok(result);
    }

    @PostMapping("login")
    public ResponseEntity<?> login(@RequestBody loginInputDto input){
        loginOutputDto result = userService.loginUser(input);
        return ResponseEntity.ok(result);
    }

    @PostMapping("join")
    public ResponseEntity<?> join(@RequestBody joinInputDto input){
        int bizOutput = userService.joinUser(input);
        ResponseEntity<?> result = null;
        if(bizOutput == 1) {
            result = ResponseEntity.ok("회원 가입 완료");
        }else {
            result = ResponseEntity.ok("회원 가입 실패");
        }

        return result;
    }

    @GetMapping("/position")
    public ResponseEntity<?> retrieveAllUserPosition(){
        List<retrieveAllUserPositionOutputDto> result = userService.retrieveAllUserPosition();
        return ResponseEntity.ok(result);
    }

}
