package com.ssafy.newspeak.voca.entity;

import com.ssafy.newspeak.voca.controller.DeleteWordRequest;
import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;

@EqualsAndHashCode
@Embeddable
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class VocaWordId implements Serializable {
    Long vocaId;
    Long wordId;

    @Builder
    public VocaWordId(Long vocaId, Long wordId) {
        this.vocaId = vocaId;
        this.wordId = wordId;
    }

    public VocaWordId(DeleteWordRequest deleteWordRequest){
        this.vocaId = deleteWordRequest.getVocaId();
        this.wordId = deleteWordRequest.getWordId();
    }
}
