package com.ssafy.newspeak.conversation.dto.assistant;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import org.springframework.core.io.ByteArrayResource;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;

@Getter
public class ThreadAudio extends ByteArrayResource {


    public ThreadAudio(byte[] byteArray) {
        super(byteArray);
    }

    @Override
    @JsonIgnore
    public InputStream getInputStream() throws IOException {
        return super.getInputStream();
    }

    @Override
    public File getFile() throws IOException {
        throw new UnsupportedOperationException("File access is not supported for ByteArrayResource.");
    }
}