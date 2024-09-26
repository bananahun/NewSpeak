package com.ssafy.newspeak.activitytype.entity;

import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDateTime;

@Entity
@Getter
public class ActivityType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="act_type_id")
    private int id;
    private String actTypeName;
    private Integer actExp;
}
