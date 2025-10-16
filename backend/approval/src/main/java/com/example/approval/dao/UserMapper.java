package com.example.approval.dao;

import com.example.approval.dto.*;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserMapper {
    loginOutputDto login(loginInputDto input);
    int join(joinInputDto input);

}
