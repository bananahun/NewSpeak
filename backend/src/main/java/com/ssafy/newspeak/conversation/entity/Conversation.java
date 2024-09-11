package com.ssafy.newspeak.conversation.entity;

import com.ssafy.newspeak.article.entity.Article;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

import static lombok.AccessLevel.PROTECTED;
import static lombok.AccessLevel.PUBLIC;

@Entity
@Builder
@Getter
@Table(name = "conversation")
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor(access = PUBLIC)
public class Conversation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String content;

    @CreationTimestamp
    @Column
    private Timestamp createdAt;

    @ManyToOne
    @JoinColumn(name = "article_id")
    private Article article;

    @OneToOne
    @JoinColumn(name = "report_id")
    private Report report;
}
