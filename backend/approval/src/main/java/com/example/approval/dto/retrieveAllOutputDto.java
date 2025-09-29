package com.example.approval.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class retrieveAllOutputDto {
    private int doc_no;
    private String doc_user_id;
    private String doc_ttl;
    private String user_dept;
    private String crt_date;
}
