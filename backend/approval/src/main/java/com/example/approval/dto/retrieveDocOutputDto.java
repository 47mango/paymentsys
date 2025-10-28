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
    private String user_dept;
    private String crt_date;
}
