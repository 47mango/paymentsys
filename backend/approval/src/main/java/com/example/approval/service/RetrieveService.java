package com.example.approval.service;

import com.example.approval.dao.DocMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
public class RetrieveService {
    private final DocMapper docMapper;
}
