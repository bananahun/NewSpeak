package com.ssafy.newspeak.conversation.dto.assistant;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CustomAudioFile implements MultipartFile {

    private byte[] fileContent;   // 파일 데이터 (Lombok @Getter로 자동 생성)
    private String fileName;      // 파일 이름
    private String contentType;   // MIME 타입

    public CustomAudioFile(String fileName, String s, String contentType, byte[] audioData) {
        this.fileName = fileName;
        this.contentType = contentType;
        this.fileContent = audioData;
    }

    @Override
    public String getName() {
        return fileName;
    }

    @Override
    public String getOriginalFilename() {
        return fileName;
    }

    @Override
    public String getContentType() {
        return contentType;
    }

    @Override
    public boolean isEmpty() {
        return fileContent == null || fileContent.length == 0;
    }

    @Override
    public long getSize() {
        return fileContent.length;
    }

    @Override
    public byte[] getBytes() throws IOException {
        return fileContent;
    }

    @Override
    public InputStream getInputStream() throws IOException {
        return new ByteArrayInputStream(fileContent);
    }

    @Override
    public void transferTo(File dest) throws IOException, IllegalStateException {
        try (FileOutputStream fos = new FileOutputStream(dest)) {
            fos.write(fileContent);
        }
    }
}
