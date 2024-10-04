package com.ssafy.newspeak.pronounce.service;

import com.google.gson.JsonElement;
import com.ssafy.newspeak.pronounce.dto.ProRequest;
import com.ssafy.newspeak.pronounce.dto.ProResponse;
import com.ssafy.newspeak.pronounce.entity.Pronounce;
import com.ssafy.newspeak.pronounce.repository.ProRepository;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.ByteArrayOutputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

@Service
@RequiredArgsConstructor
public class ProService {

    private static final Logger LOGGER = Logger.getLogger(ProService.class.getName());
    private static final String OPEN_API_URL = "http://aiopen.etri.re.kr:8000/WiseASR/Pronunciation";

    @Value("${etri.api-key}")
    private String ACCESS_KEY;

    private final Gson gson;
    private final ProRepository proRepository;  // ProRepository 주입

    @Transactional
    public ProResponse evaluatePronunciation(ProRequest request) {
        String audioContents;

        // URL에서 오디오 파일 다운로드
        try {
            URL audioUrl = new URL(request.getSoundFilePath());
            HttpURLConnection connection = (HttpURLConnection) audioUrl.openConnection();
            connection.setRequestMethod("GET");

            try (InputStream inputStream = connection.getInputStream();
                 ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream()) {

                byte[] buffer = new byte[4096];
                int bytesRead;
                while ((bytesRead = inputStream.read(buffer)) != -1) {
                    byteArrayOutputStream.write(buffer, 0, bytesRead);
                }

                byte[] audioBytes = byteArrayOutputStream.toByteArray();
                audioContents = Base64.getEncoder().encodeToString(audioBytes);
                LOGGER.info("Audio file downloaded and encoded successfully.");

            } catch (IOException e) {
                LOGGER.log(Level.SEVERE, "Failed to download audio file.", e);
                throw new RuntimeException("Failed to download audio file.", e);
            }

        } catch (MalformedURLException e) {
            LOGGER.log(Level.SEVERE, "Invalid URL: " + request.getSoundFilePath(), e);
            throw new RuntimeException("Invalid URL: " + request.getSoundFilePath(), e);
        } catch (IOException e) {
            LOGGER.log(Level.SEVERE, "Failed to open connection.", e);
            throw new RuntimeException("Failed to open connection.", e);
        }

        // API 요청을 위한 데이터 준비
        Map<String, Object> input = new HashMap<>();
        Map<String, String> argument = new HashMap<>();

        argument.put("language_code", "english");
        argument.put("audio", audioContents);

        input.put("argument", argument);

        // API에 요청 보내기
        HttpURLConnection con = null;
        try {
            URL url = new URL(OPEN_API_URL);
            con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("POST");
            con.setDoOutput(true);
            con.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
            con.setRequestProperty("Authorization", ACCESS_KEY);

            // JSON 요청 바디 작성
            try (DataOutputStream wr = new DataOutputStream(con.getOutputStream())) {
                wr.write(gson.toJson(input).getBytes(StandardCharsets.UTF_8));
                wr.flush();
            }

            // 응답 처리
            int responseCode = con.getResponseCode();
            LOGGER.info("Response code: " + responseCode);
            try (InputStream is = con.getInputStream()) {
                byte[] buffer = is.readAllBytes();
                String responseBody = new String(buffer);

                LOGGER.info("Response body: " + responseBody);

                // 안전하게 score 값을 가져오기
                Double score = 0.0; // 기본값 설정

                // 응답 본문에서 score 값 추출
                JsonObject responseJson = gson.fromJson(responseBody, JsonObject.class);
                JsonObject returnObject = responseJson.getAsJsonObject("return_object");

                JsonElement scoreElement = returnObject.get("score");

                if (scoreElement != null && scoreElement.isJsonPrimitive() && scoreElement.getAsJsonPrimitive().isNumber()) {
                    try {
                        score = scoreElement.getAsDouble();
                    } catch (NumberFormatException e) {
                        // score가 숫자 형식이 아니면 기본값(0)을 유지
                        System.out.println("Score is not a valid double, using default value 0");
                    }
                } else {
                    System.out.println("Score is missing or not a number, using default value 0");
                }

                Pronounce pronounce = Pronounce.builder()
                        .proScore(score)
                        .audioPath(request.getSoundFilePath())
                        .build();
                proRepository.save(pronounce);
                return ProResponse.from(score);
            }

        } catch (IOException e) {
            LOGGER.log(Level.SEVERE, "Failed to connect to API.", e);
            throw new RuntimeException("Failed to connect to API.", e);
        } finally {
            if (con != null) {
                con.disconnect();
            }
        }
    }
}
