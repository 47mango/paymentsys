package com.example.approval.controller;

import com.example.approval.dto.createDocInputDto;
import com.example.approval.dto.joinInputDto;
import com.example.approval.dto.loginInputDto;
import com.example.approval.dto.loginOutputDto;
import com.example.approval.service.DraftService;
import com.example.approval.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

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
}
