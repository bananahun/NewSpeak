package com.example.newspeak.pronounce.service;

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

import com.example.newspeak.pronounce.dto.ProRequest;
import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProService {

    private static final Logger LOGGER = Logger.getLogger(ProService.class.getName());
    private static final String OPEN_API_URL = "http://aiopen.etri.re.kr:8000/WiseASR/Pronunciation";  // 영어 발음 평가 URL

    @Value("${etri.api-key}")
    private String ACCESS_KEY;

    private final Gson gson;

    public String evaluatePronunciation(ProRequest request) {
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

        System.out.println("argument = " + argument);
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
                return responseBody;
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
