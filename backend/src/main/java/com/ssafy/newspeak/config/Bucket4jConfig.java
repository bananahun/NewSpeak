package com.ssafy.newspeak.config;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Refill;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.Duration;

@Configuration
public class Bucket4jConfig {

    // 회화에 사용할 bucket
    @Bean
    public Bucket openAiBucket() {

        // 30초당 버킷 충전량
        final Refill refill = Refill.intervally(20, Duration.ofSeconds(30));

        // 버킷의 총량
        final Bandwidth limit = Bandwidth.classic(200, refill);

        return Bucket.builder()
                .addLimit(limit)
                .build();
    }

    // 발음 평가에 사용할 bucket(gcs)
    @Bean
    public Bucket gcsBucket() {

        final Refill refill = Refill.intervally(10, Duration.ofSeconds(30));

        final Bandwidth limit = Bandwidth.classic(200, refill);

        return Bucket.builder()
                .addLimit(limit)
                .build();
    }
}
