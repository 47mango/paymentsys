package com.example.approval.dao;

import org.apache.ibatis.annotations.Mapper;

import javax.print.Doc;

@Mapper
public interface DocMapper {
    void insertDoc();
}
