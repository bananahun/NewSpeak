package com.ssafy.newspeak.redis;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;

@SpringBootTest
public class RedisTest {

    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    @Test
    void redisTemplateString() {
        // RedisTemplate를 사용하여 간단히 값을 설정하고 가져오기
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();

        String key = "name";
        valueOperations.set(key, "giraffe");  // key에 값 설정
        String value = valueOperations.get(key);  // key에서 값 가져오기

        // 가져온 값이 예상한 값인지 검증
        Assertions.assertEquals(value, "giraffe");
    }
}
