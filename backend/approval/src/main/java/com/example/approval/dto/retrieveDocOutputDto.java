package com.example.approval.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class retrieveDocOutputDto {
    private String doc_no;
    private String doc_ttl;
    private String doc_text;
    private List<docLineSubDto> doc_line;
    private String doc_user_id;
    private String doc_ctgr1;
    private String doc_ctgr2;
    private String user_dept;
    private String crt_date;
    private String doc_file;
    private String doc_summary;
}
