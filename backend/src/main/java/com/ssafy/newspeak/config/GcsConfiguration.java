package com.ssafy.newspeak.config;


import com.google.auth.oauth2.ServiceAccountCredentials;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import com.google.gson.Gson;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

import java.io.IOException;
import java.io.InputStream;

@Configuration
public class GcsConfiguration {

    private String credentialsFilePath="steady-citron-435112-b2-5e01616d4635.json";

    @Bean
    public Storage storage() throws IOException {
        Resource resource = new ClassPathResource(credentialsFilePath);
        try (InputStream inputStream = resource.getInputStream()) {
            return StorageOptions.newBuilder()
                    .setCredentials(ServiceAccountCredentials.fromStream(inputStream))
                    .build()
                    .getService();
        }
    }

    @Bean
    public Gson gson() {
        return new Gson();
    }
}