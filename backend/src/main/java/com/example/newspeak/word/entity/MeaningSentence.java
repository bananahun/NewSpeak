package com.example.newspeak.word.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import static lombok.AccessLevel.PROTECTED;

@Getter
@Builder
@Entity
@Table(name = "meaning_sentence")
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor(access = PROTECTED)
public class MeaningSentence {

    @Id
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="word_meaning_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private WordMeaning wordMeaning;

    @Column(name="meaning_sentence")
    private String meaningSentence;

    @Column(name="sentence_korean")
    private String sentenceKorean;
}
