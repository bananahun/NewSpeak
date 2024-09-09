package com.example.newspeak.pronounce.service;

import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URL;
import java.util.concurrent.TimeUnit;

@Service
public class AudioFileUploadService {

    private final Storage storage;

    @Value("${gcloud.storage.bucket}")
    private String bucketName;

    public AudioFileUploadService() {
        this.storage = StorageOptions.getDefaultInstance().getService();
    }

    public String uploadFile(MultipartFile file) throws IOException {
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        BlobInfo blobInfo = BlobInfo.newBuilder(bucketName, fileName).build();

        // 파일 업로드
        storage.create(blobInfo, file.getInputStream());

        // URL 반환 (여기서는 만료시간이 있는 서명된 URL을 생성)
        URL signedUrl = storage.signUrl(blobInfo, 15, TimeUnit.MINUTES);  // 15분간 유효한 URL 생성
        return signedUrl.toString();
    }
}
