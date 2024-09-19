package com.ssafy.newspeak.conversation.entity;

import com.ssafy.newspeak.article.entity.Article;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;
import java.util.List;

import static lombok.AccessLevel.PROTECTED;
import static lombok.AccessLevel.PUBLIC;

@Getter
@Builder
@Entity
@Table(name = "report")
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor(access = PUBLIC)
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String title;

    @Column
    private String content;

    @CreationTimestamp
    private Timestamp createdAt;

//    @OneToOne(fetch = FetchType.EAGER)
//    @JoinColumn(name = "conversation_id")
//    private Conversation conversation;

    public static Report of(String content) {
        Report report = new Report();
        report.content = content;
        return report;
    }
}
