package com.example.approval.dto;

import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class updateDocInput {
    private String doc_no;
    private String doc_ctgr1;
    private String doc_ctgr2;
}
