package com.example.approval.service;

import com.example.approval.dao.DocMapper;
import com.example.approval.dto.createDocInputDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
public class DraftService {

    private final DocMapper docMapper;

    public void createDoc(createDocInputDto input) {
        String crt_date = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        input.setCrt_date(crt_date);
        docMapper.insertDoc(input);

    }
}
