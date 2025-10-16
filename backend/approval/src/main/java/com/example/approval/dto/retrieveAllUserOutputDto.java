package com.example.approval.dto;

import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class retrieveAllUserOutputDto {
    private String user_id;
    private String user_name;
}
