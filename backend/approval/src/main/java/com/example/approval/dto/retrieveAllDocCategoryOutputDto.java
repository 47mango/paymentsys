package com.example.approval.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class retrieveAllDocCategoryOutputDto {
    List<String> DOC_CTGR;
}
