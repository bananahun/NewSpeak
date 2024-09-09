package com.example.newspeak.article.entity;

import com.example.newspeak.category.entity.Category;
import com.example.newspeak.keyword.entity.Keyword;
import com.example.newspeak.sentence.entity.Sentence;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDateTime;
import java.util.List;

import static lombok.AccessLevel.PROTECTED;
import static lombok.AccessLevel.PUBLIC;

@Getter
@Builder
@Entity
@Table(name = "article")
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor(access = PUBLIC)
public class Article {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="article_id")
    private Long id;

    @Column
    private String title;

    @Column
    private String content;

    @Column(name="content_kr")
    private String contentKr;

    @Column(name="published_date")
    private LocalDateTime publishedDate;

    @Column(name="image_url")
    private String imageUrl;

    @Column(name="article_url")
    private String articleUrl;

    @Column
    private String publisher;

    @CreationTimestamp
    @Column(name="created_at")
    private LocalDateTime createdAt;

    @Column
    private String writer;

    @Column
    @Min(0)
    @Max(6)
    private Integer level;

    @ManyToOne
    @JoinColumn(name = "category_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Category category;

    @OneToMany(mappedBy = "article")
    private List<Sentence> sentences;

    @OneToMany(mappedBy = "article")
    private List<Keyword> keywords;
}
