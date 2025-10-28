package com.example.approval.dto;

import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class retrieveAllUserPositionOutputDto {
    private String user_position;
    private String user_position_eng;
}
