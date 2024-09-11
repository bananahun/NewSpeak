package com.ssafy.newspeak.keyword.entity;

import com.ssafy.newspeak.article.entity.Article;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Getter
@Builder
@Entity
@Table(name = "keyword")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PUBLIC)
public class Keyword {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "keyword_id")
    private Long id;

    @Column(unique = true, nullable = false)
    private String content;

    @Column
    private Integer cnt;

    @ManyToOne
    @JoinColumn(name="article_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Article article;
}
