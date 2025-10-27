package com.example.approval.dto;

import lombok.*;

@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class joinInputDto {
    private String user_id;
    private String user_name;

    private String crt_date;
}
