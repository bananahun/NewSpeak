package com.ssafy.newspeak.voca.service;

import com.ssafy.newspeak.article.controller.AddWordRequest;
import com.ssafy.newspeak.user.entity.User;
import com.ssafy.newspeak.user.repository.UserRepo;
import com.ssafy.newspeak.user.repository.dto.VocaInfoDto;
import com.ssafy.newspeak.voca.entity.VocaWord;
import com.ssafy.newspeak.voca.entity.VocaWordId;
import com.ssafy.newspeak.voca.repository.VocaRepo;
import com.ssafy.newspeak.voca.controller.VocaPostDto;
import com.ssafy.newspeak.voca.entity.Voca;
import com.ssafy.newspeak.voca.repository.VocaWordRepo;
import com.ssafy.newspeak.voca.repository.dto.WordDetail;
import com.ssafy.newspeak.word.entity.Word;
import com.ssafy.newspeak.word.repository.WordRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;


import java.util.*;

@Service
@Transactional
@RequiredArgsConstructor
public class VocaService {

    private final VocaRepo vocaRepo;
    private final UserRepo userRepo;
    private final VocaWordRepo vocaWordRepo;
    private final WordRepository wordRepo;

    public Long makeVoca(VocaPostDto vocaPostDto,Long userId) {
        User user =userRepo.findById(userId).orElseThrow(NoSuchElementException::new);
        Voca voca = new Voca(vocaPostDto,user);
        vocaRepo.save(voca);
        return voca.getId();
    }

    public void makeVoca(VocaPostDto vocaPostDto,User user) {
        Voca voca = new Voca(vocaPostDto,user);
        vocaRepo.save(voca);
    }

    public List<VocaInfoDto>  getVocasByUserId(Long userId){
        return vocaRepo.findVocaByUserId(userId);
    }

    public List<WordDetail> getVocaById(Long vocaId, Long userId) {
        Voca voca=vocaRepo.findById(vocaId).orElseThrow(NoSuchElementException::new);
        if(!voca.getUser().getId().equals(userId)){
            throw new AccessDeniedException("not your voca");
        }

        List<Word> words=vocaWordRepo.findVocaWordsByVocaId(vocaId);
        List<WordDetail> wordDetails=WordDetail.from(words);

        return wordDetails;
    }

    public void addWord(AddWordRequest addWordRequest,Long userId){
        Word word=wordRepo.findByContent(addWordRequest.getWordContent());
        if(word==null){throw new NoSuchElementException();}
        Voca voca=vocaRepo.findById(addWordRequest.getVocaId()).orElseThrow(NoSuchElementException::new);

        if(!userId.equals(voca.getUser().getId())){
            throw new AccessDeniedException("not your voca");
        };
        VocaWordId vocaWordId= VocaWordId.builder().wordId(word.getId())
                .vocaId(addWordRequest.getVocaId()).build();

        VocaWord vocaWord=new VocaWord(vocaWordId, addWordRequest.getSentenceId());
        vocaWordRepo.save(vocaWord);
    }

    public void deleteVocaById(Long userId, Long vocaId){
        Voca voca=vocaRepo.findById(vocaId).orElseThrow(NoSuchElementException::new);
        if(!userId.equals(voca.getUser().getId())){
            throw new AccessDeniedException("not your voca");
        }
        vocaRepo.delete(voca);
    }

    public List<WordQuiz> makeQuizByVocaId(Long vocaId, Long userId) {
        Voca voca=vocaRepo.findById(vocaId).orElseThrow(NoSuchElementException::new);
        if(!userId.equals(voca.getUser().getId())){
            throw new AccessDeniedException("not your voca");
        }
        List<Word> words=vocaWordRepo.findVocaWordsByVocaId(vocaId);
        // 리스트를 무작위로 섞는다.
        Collections.shuffle(words);

        // 리스트가 10개 미만이면 그대로 사용하고, 10개 이상이면 상위 10개만 선택한다.
        List<Word> randomWords = words.size() > 10 ? words.subList(0, 10) : words;

        // 선택된 랜덤 단어 리스트를 WordQuiz.from()의 매개변수로 전달한다.
        List<WordQuiz> wordQuizs = WordQuiz.from(randomWords);

        return wordQuizs;
    }

}
