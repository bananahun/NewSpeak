package com.example.newspeak.pronounce.service;

import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URL;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class AudioFileUploadService {

    private final Storage storage;

    @Value("${spring.cloud.gcp.storage.bucket}")
    private String bucketName;

    public String uploadFile(MultipartFile file) throws IOException {
        try {

            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();

            BlobInfo blobInfo = BlobInfo.newBuilder(bucketName, fileName).build();

            storage.create(blobInfo, file.getInputStream());

            URL signedUrl = storage.signUrl(blobInfo, 15, TimeUnit.MINUTES);
            
            System.out.println("signedUrl = " + signedUrl);
            System.out.println("signedUrl.toString() = " + signedUrl.toString());

            return signedUrl.toString();  // 파일 시스템 경로가 아닌 URL을 그대로 반환
        } catch (IOException e) {
            throw new IOException("Failed to upload file to Google Cloud Storage", e);
        }
    }
}