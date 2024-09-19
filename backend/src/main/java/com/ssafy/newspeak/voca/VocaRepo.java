package com.ssafy.newspeak.voca;

import com.ssafy.newspeak.voca.entity.Voca;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VocaRepo extends JpaRepository<Voca, Long> {
}
