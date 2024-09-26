package com.ssafy.newspeak.voca.controller;

import com.ssafy.newspeak.voca.repository.dto.WordDetail;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class WordDetails {
    List<WordDetail> wordDetails;
}
