package com.example.approval.service;

import com.example.approval.dao.DocMapper;
import com.example.approval.dto.createDocInputDto;
import com.example.approval.dto.createDocOutputDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;

@Service
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
public class DraftService {

    private final DocMapper docMapper;

    public createDocOutputDto createDoc(createDocInputDto input) {
        String crt_date = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        input.setCrt_date(crt_date);
        docMapper.insertDoc(input);
        return null;
    }
}
