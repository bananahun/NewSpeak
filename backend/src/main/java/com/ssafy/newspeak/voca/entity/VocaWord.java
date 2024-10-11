package com.ssafy.newspeak.voca.entity;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name="voca_word")
public class VocaWord {

    @EmbeddedId
    private VocaWordId vocaWordId;

    Long sentenceId;

    public VocaWord(VocaWordId vocaWordId, Long sentenceId ){
        this.vocaWordId = vocaWordId;
        this.sentenceId = sentenceId;
    }
}
