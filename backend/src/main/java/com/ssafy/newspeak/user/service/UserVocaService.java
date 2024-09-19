package com.ssafy.newspeak.user.service;

import com.ssafy.newspeak.user.entity.userVoca.UserVoca;
import com.ssafy.newspeak.user.repository.UserVocaRepo;
import com.ssafy.newspeak.voca.entity.Voca;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
@Transactional
public class UserVocaService {
    private final UserVocaRepo userVocaRepo;

    public List<Voca> getVocaByUserId(Long userId) {
        return userVocaRepo.findVocaByUserId(userId);
    }

}
