package com.example.newspeak.word.service;

import com.example.newspeak.word.dto.WordMeaningFindResponse;
import com.example.newspeak.word.entity.MeaningSentence;
import com.example.newspeak.word.entity.Word;
import com.example.newspeak.word.entity.WordMeaning;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Transactional
class WordServiceTest {

    @Autowired
    private WordService wordService;

    @BeforeEach
    public void setUp() {
        // 단어와 관련된 의미 및 예문 생성
        Word word = Word.builder().content("단어1").build();
        WordMeaning meaning1 = WordMeaning.builder().meaning("뜻1").word(word).build();
        WordMeaning meaning2 = WordMeaning.builder().meaning("뜻2").word(word).build();
        MeaningSentence meaningSentence1 = MeaningSentence.builder().meaningSentence("english1").sentenceKorean("예문1").wordMeaning(meaning1).build();
        MeaningSentence meaningSentence2 = MeaningSentence.builder().meaningSentence("english2").sentenceKorean("예문2").wordMeaning(meaning2).build();
        wordService.save(word);
    }

    @AfterEach
    void tearDown() {
        wordService.deleteAll();
    }

    @Test
    @DisplayName("단일 단어 뜻 조회")
    void findMeaning() {

        WordMeaningFindResponse response = wordService.findMeaningByContent("단어1");
        System.out.println("response = " + response.getData());

    }

}
