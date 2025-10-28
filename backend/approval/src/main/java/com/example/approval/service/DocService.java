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


    public String createDoc(createDocInputDto input) {
        //생성날짜 세팅
        String crt_date = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        input.setCrt_date(crt_date);

        //문서ID 생성
        String docNo = docMapper.createDocId(input.getCrt_date());
        if(docNo == null){
            docNo = crt_date + "0001";
        }else{
            long docNoTemp = Long.parseLong(docNo);
            docNoTemp++;
            docNo = String.valueOf(docNoTemp);
        }
        input.setDoc_no(docNo);

        //문서 생성
        docMapper.insertDoc(input);

        return docNo;
    }

    public void createLine(createDocInputDto input){
        createDocLineInputDto bizInput = new createDocLineInputDto();
        for(docLineSubDto item : input.getDoc_line()){
            bizInput.setDoc_no(input.getDoc_no());
            bizInput.setSeq(item.getSeq());
            bizInput.setApvr_id(item.getApvr_id());

            docMapper.insertDocLine(bizInput);
        }

    }



    public List<retrieveAllOutputDto> retrieveAll(retrieveAllInputDto input){
        List<retrieveAllOutputDto> output = docMapper.selectAllDoc(input);

        return output;
    }

    public retrieveDocOutputDto retrieveDoc(retrieveDocInputDto input){
        retrieveDocOutputDto output = docMapper.selectDoc(input);
        List<docLineSubDto> bizOutput = docMapper.selectDocLine(input);
        if(bizOutput != null){
            output.setDoc_line(bizOutput);
        }
        return output;

    }

    public retrieveAllDocCategoryOutputDto retrieveAllDocCategory(retrieveAllDocCategoryInputDto input){

        List<String> bizOutput = docMapper.selectAllDocCategory(input);
        System.out.println("bizOutput>>>"+bizOutput);
        retrieveAllDocCategoryOutputDto output = new retrieveAllDocCategoryOutputDto(bizOutput);
        return output;
    }
}
