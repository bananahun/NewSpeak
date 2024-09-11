package com.example.newspeak.pronounce.service;

import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

import com.example.newspeak.pronounce.dto.ProRequest;
import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProService {

    private static final String OPEN_API_URL = "http://aiopen.etri.re.kr:8000/WiseASR/Pronunciation";  // 영어 발음 평가 URL

    @Value("${etri.api-key}")
    private String ACCESS_KEY;

    private final Gson gson;

    public String evaluatePronunciation(ProRequest request) throws IOException {
        String audioContents;
        try {
            Path path = Paths.get(request.getSoundFilePath());
            byte[] audioBytes = Files.readAllBytes(path);
            audioContents = Base64.getEncoder().encodeToString(audioBytes);
        } catch (IOException e) {
            throw new IOException("Failed to read audio file.", e);
        }

        Map<String, Object> input = new HashMap<>();
        Map<String, String> argument = new HashMap<>();
        argument.put("language_code", "english");
        argument.put("script", request.getSentence());
        argument.put("audio", audioContents);
        input.put("argument", argument);

        URL url;
        HttpURLConnection con = null;
        try {
            url = new URL(OPEN_API_URL);
            con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("POST");
            con.setDoOutput(true);
            con.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
            con.setRequestProperty("Authorization", ACCESS_KEY);

            DataOutputStream wr = new DataOutputStream(con.getOutputStream());
            wr.write(gson.toJson(input).getBytes("UTF-8"));
            wr.flush();
            wr.close();

            int responseCode = con.getResponseCode();
            InputStream is = con.getInputStream();
            byte[] buffer = new byte[is.available()];
            int byteRead = is.read(buffer);
            String responBody = new String(buffer);

            System.out.println("[responseCode] " + responseCode);
            System.out.println("[responBody]");
            System.out.println(responBody);

            return responBody;

        } catch (MalformedURLException e) {
            throw new MalformedURLException("Invalid URL.");
        } catch (IOException e) {
            throw new IOException("Failed to connect to API.", e);
        } finally {
            if (con != null) {
                con.disconnect();
            }
        }
    }
}
