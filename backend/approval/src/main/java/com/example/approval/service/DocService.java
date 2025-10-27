package com.example.approval.service;

import com.example.approval.dao.DocMapper;
import com.example.approval.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
public class DocService {

    private final DocMapper docMapper;

    public int createDoc(createDocInputDto input) {
        String crt_date = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        input.setCrt_date(crt_date);
        int result = docMapper.insertDoc(input);

        return result;
    }

    public List<retrieveAllOutputDto> retrieveAll(retrieveAllInputDto input){
        List<retrieveAllOutputDto> output = docMapper.selectAllDoc(input);

        return output;
    }

    public retrieveDocOutputDto retrieveDoc(retrieveDocInputDto input){
        retrieveDocOutputDto output = docMapper.selectDoc(input);

        return output;

    }
}
