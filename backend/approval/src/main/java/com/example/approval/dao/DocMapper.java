package com.example.approval.dao;

import com.example.approval.dto.*;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface DocMapper {
    String createDocId(String input);
    void insertDoc(createDocInputDto input);
    void insertDocLine(createDocLineInputDto input);
    List<retrieveAllOutputDto> selectAllDoc(retrieveAllInputDto input);
    retrieveDocOutputDto selectDoc(retrieveDocInputDto input);
    List<docLineSubDto> selectDocLine(retrieveDocInputDto input);
    List<String> selectAllDocCategory(retrieveAllDocCategoryInputDto input);
    void updateDoc(updateDocInput input);
}
