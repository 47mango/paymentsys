package com.example.approval.dto;

import lombok.*;

@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class createDocLineInputDto {
    private String doc_no;
    private int seq;
    private String apvr_id;
}
