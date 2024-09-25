package com.ssafy.newspeak.voca.repository;

import com.ssafy.newspeak.voca.entity.VocaWord;
import com.ssafy.newspeak.voca.entity.VocaWordId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VocaWordRepo extends JpaRepository<VocaWord, VocaWordId> {
}
