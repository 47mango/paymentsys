package com.example.approval.service;

import com.example.approval.dto.createCategoryOutputDto;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class CategoryService {
    private final RestTemplate restTemplate = new RestTemplate();
    private final String fastApiUrl = "http://150.230.186.30:8000/extract_keywords";

    public createCategoryOutputDto extractKeywords(String text) {
        // 요청 바디 생성
        String jsonBody = "{\"text\":\"" + text + "\"}";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> request = new HttpEntity<>(jsonBody, headers);

        // FastAPI 호출
        ResponseEntity<createCategoryOutputDto> response = restTemplate.postForEntity(
                fastApiUrl,
                request,
                createCategoryOutputDto.class
        );

        createCategoryOutputDto keywordResponse = response.getBody();

        if (keywordResponse != null) {
            System.out.println("텍스트: " + keywordResponse.getText());
            System.out.println("키워드1: " + keywordResponse.getKeyword1());
            System.out.println("키워드2: " + keywordResponse.getKeyword2());
        } else {
            System.out.println("⚠️ FastAPI로부터 응답이 없습니다.");
        }

        return keywordResponse;
    }
}
