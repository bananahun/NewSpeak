package com.example.newspeak.word.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.validator.constraints.UniqueElements;

import java.time.LocalDateTime;
import java.util.List;

import static lombok.AccessLevel.PROTECTED;

@Getter
@Builder
@Entity
@Table(name = "word")
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor(access = PROTECTED)
public class Word {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "word_id")
    private Long id;

    @Column
    private String content;

    @Column
    @Min(0)
    @Max(6)
    private Integer level;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @CreationTimestamp
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "word")
    private List<WordMeaning> wordMeanings;
}
