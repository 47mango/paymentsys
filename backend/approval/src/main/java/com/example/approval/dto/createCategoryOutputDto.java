package com.example.approval.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class createCategoryOutputDto {
    private String text;
    private String keyword1;
    private String keyword2;
}
