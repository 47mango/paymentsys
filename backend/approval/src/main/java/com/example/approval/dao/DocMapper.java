package com.example.approval.dao;

import com.example.approval.dto.createDocInputDto;
import com.example.approval.dto.retrieveAllInputDto;
import com.example.approval.dto.retrieveAllOutputDto;
import org.apache.ibatis.annotations.Mapper;

import javax.print.Doc;
import java.util.List;

@Mapper
public interface DocMapper {
    void insertDoc(createDocInputDto input);
    List<retrieveAllOutputDto> selectDoc(retrieveAllInputDto input);
}
