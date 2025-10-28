package com.example.approval.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class createDocInputDto {
    private String doc_ttl;
    private String user_id;
    private String doc_text;
    private String doc_file;
    private List<docLineSubDto> doc_line;

    private String doc_no;
    private String crt_date;
    private String doc_ctgr1;
    private String doc_ctgr2;
}
