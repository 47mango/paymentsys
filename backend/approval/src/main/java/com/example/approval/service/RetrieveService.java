package com.example.approval.service;

import com.example.approval.dao.DocMapper;
import com.example.approval.dto.retrieveAllInputDto;
import com.example.approval.dto.retrieveAllOutputDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
public class RetrieveService {
    private final DocMapper docMapper;

    public List<retrieveAllOutputDto> retrieveAll(retrieveAllInputDto input){
        List<retrieveAllOutputDto> output = new ArrayList<retrieveAllOutputDto>();
        output = docMapper.selectDoc(input);

        return output;
    }
}
