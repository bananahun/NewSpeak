package com.ssafy.newspeak.elastic.entity;

import jakarta.persistence.Id;
import lombok.*;
import org.springframework.data.elasticsearch.annotations.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString
@Builder
@Document(indexName = "newspeak-article")
@Mapping(mappingPath = "elastic-mapping.json")
//@Setting(settingPath = "static/elastic-token.json")
public class ArticleDocument {
    @Id
    private String id;

    @Field(type = FieldType.Text)
    private String url;

    @Field(type = FieldType.Keyword)
    private String category;

    @Field(type = FieldType.Text)
    private String content;

    @Field(type = FieldType.Text, index = false)  // 검색에 사용하지 않을 경우 index=false
    private String imageUrl;

    @Field(type = FieldType.Keyword)
    private String publisher;

    @Field(type = FieldType.Date, format = {}, pattern = "uuuu-MM-dd'T'HH:mm:ss.SSSXXX")
    private String timestamp;

    @Field(type = FieldType.Text)
    private String title;

    @Field(type = FieldType.Keyword)
    private String writer;

    @Field(type = FieldType.Nested)
    private List<String> sentences;

    @Field(type = FieldType.Nested)
    private List<String> translatedSentences;

    @Field(type = FieldType.Nested)
    private List<String> keywords;

    @Field(type = FieldType.Integer)
    private Integer cefr;
}
