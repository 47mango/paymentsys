package com.example.approval.dao;

import com.example.approval.dto.*;
import org.apache.ibatis.annotations.Mapper;

import javax.print.Doc;
import java.util.List;

@Mapper
public interface DocMapper {
    void insertDoc(createDocInputDto input);
    List<retrieveAllOutputDto> selectAllDoc(retrieveAllInputDto input);
    retrieveDocOutputDto selectDoc(retrieveDocInputDto input);
}
