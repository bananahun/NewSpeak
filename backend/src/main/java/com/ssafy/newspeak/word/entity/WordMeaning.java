package com.ssafy.newspeak.word.entity;

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
@Table(name = "word_meaning")
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor(access = PROTECTED)
public class WordMeaning {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "word_meaning_id")
    private Long id;

    @Column(name = "word_meaning")
    private String meaning;

    @ManyToOne
    @JoinColumn(name="word_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Word word;

    @OneToOne(mappedBy = "wordMeaning")
    private MeaningSentence meaningSentence;
}
