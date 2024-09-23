package com.ssafy.newspeak.voca.service;

import com.ssafy.newspeak.user.entity.User;
import com.ssafy.newspeak.user.repository.UserRepo;
import com.ssafy.newspeak.user.repository.dto.VocaInfoDto;
import com.ssafy.newspeak.voca.VocaRepo;
import com.ssafy.newspeak.voca.controller.VocaPostDto;
import com.ssafy.newspeak.voca.entity.Voca;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.expression.AccessException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.NoSuchElementException;

@Service
@Transactional
@RequiredArgsConstructor
public class VocaService {

    private final VocaRepo vocaRepo;
    private final UserRepo userRepo;

    public void makeVoca(VocaPostDto vocaPostDto,Long userId) {
        User user =userRepo.findById(userId).orElseThrow(NoSuchElementException::new);
        Voca voca = new Voca(vocaPostDto,user);
        vocaRepo.save(voca);
    }

    public List<VocaInfoDto>  getVocasByUserId(Long userId){
        return vocaRepo.findVocaByUserId(userId);
    }

    public Voca getVocaById(Long vocaId,Long userId) {
        Voca voca=vocaRepo.findById(vocaId).orElseThrow(NoSuchElementException::new);
        if(!voca.getUser().getId().equals(userId)){
            throw new AccessDeniedException("not your voca");
        }
        return voca;
    }

    public void deleteVocaById(Long userId, Long vocaId){
//        if(){}
//        return vocaRepo.deleteById(vocaId);
    }
}
