package com.example.approval.service;

import com.example.approval.dao.DocMapper;
import com.example.approval.dto.createDocInputDto;
import com.example.approval.dto.createDocOutputDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
public class DraftService {

    private final DocMapper docMapper;

    public createDocOutputDto createDoc(createDocInputDto input) {
        docMapper.insertDoc();
        return null;
    }
}
