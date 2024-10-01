package com.ssafy.newspeak.explog.controller;

import com.ssafy.newspeak.explog.entity.ExpLog;
import lombok.Getter;

@Getter
public class ExpResult {
  private Integer change;

  public ExpResult(ExpLog expLog){
    this.change=expLog.getExpChange();
  }
}
