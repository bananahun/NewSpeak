package com.example.newspeak.article.entity;

import com.example.newspeak.category.entity.Category;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

import static lombok.AccessLevel.PROTECTED;

@Getter
@Builder
@Entity
@Table(name = "article")
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor(access = PROTECTED)
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
    private String level;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
}
