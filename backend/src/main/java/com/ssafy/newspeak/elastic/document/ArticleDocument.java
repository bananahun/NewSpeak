package com.ssafy.newspeak.elastic.document;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Map;
import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Document(indexName = "newspeak-articles")
public class ArticleDocument {

    @Field(type = FieldType.Long)
    private Long id;

    @Field(type = FieldType.Text)
    private String title;

    @Field(type = FieldType.Keyword)
    private String category;

    @Field(type = FieldType.Text)
    private String content;

    @Field(type = FieldType.Text, index = false, name="image_url")
    private String imageUrl;

    @Field(type = FieldType.Keyword)
    private String publisher;

    @Field(type = FieldType.Integer)
    private Integer level;

    @Field(type = FieldType.Date, format = {}, pattern = "uuuu-MM-dd", name="published_date")
    private String publishedDate;

    @Field(type = FieldType.Nested)
    private Map<String, String> sentences;

    @Field(type = FieldType.Object)
    private Map<String, String> translatedSentences;

    @Field(type = FieldType.Object)
    private Map<String, Integer> keywords;

    @Field(type = FieldType.Text)
    private String writer;

    @Field(type = FieldType.Text)
    private String url;
}
