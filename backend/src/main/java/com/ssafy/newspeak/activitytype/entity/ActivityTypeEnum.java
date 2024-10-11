package com.ssafy.newspeak.activitytype.entity;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public enum ActivityTypeEnum {
  VOCAQUIZ(1L, "VocaQuiz"),
  CONVERSATION(2L, "Conversation");

  private final Long id;
  private final String actTypeName;


  public static ActivityTypeEnum fromId(Long id) {
    for (ActivityTypeEnum type : ActivityTypeEnum.values()) {
      if (type.getId() == id) {
        return type;
      }
    }
    throw new IllegalArgumentException("No matching ActivityType for id: " + id);
  }
}
