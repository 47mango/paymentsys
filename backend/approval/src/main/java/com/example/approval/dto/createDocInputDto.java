package com.example.approval.dto;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class createDocInputDto {
    private String user_id;
    private String doc_ttl;
    private List<docLineDto> doc_line;
    private String doc_file;
}
