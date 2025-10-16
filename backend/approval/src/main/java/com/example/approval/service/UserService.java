package com.example.approval.service;

import com.example.approval.dao.UserMapper;
import com.example.approval.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
public class UserService {

    private final UserMapper userMapper;

    public List<retrieveAllUserOutputDto> retrieveAllUser(){
        List<retrieveAllUserOutputDto> result = userMapper.retrieveAll();
        System.out.println("result>>>"+result);
        return result;
    }

    public loginOutputDto loginUser(loginInputDto input){
        loginOutputDto result = new loginOutputDto();
        try{
            result = userMapper.login(input);
            if(result != null){
                System.out.println("USER_YN>>>" + result.getUser_yn());
            }
//            else{
//                result = new loginOutputDto("N");
//            }
        } catch (Exception e) {
            System.out.println("로그인 실패");
            throw new RuntimeException();
        }

        return result;

    }

    public int joinUser(joinInputDto input){
        String crt_date = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        input.setCrt_date(crt_date);

        int result = userMapper.join(input);

        return result;
    }
}
