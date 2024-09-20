package com.ssafy.newspeak.user.service;

import com.ssafy.newspeak.voca.VocaRepo;
import com.ssafy.newspeak.voca.entity.Voca;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
@Transactional
public class UserVocaService {
    private final VocaRepo vocaRepo;

    public List<Voca> getVocaByUserId(Long userId) {
        return vocaRepo.findVocaByUserId(userId);
    }

    public void addWord(){

    }

}
