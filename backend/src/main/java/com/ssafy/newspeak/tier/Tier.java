package com.ssafy.newspeak.tier;

import jakarta.persistence.*;
import org.hibernate.validator.constraints.UniqueElements;

@Entity
@Table(name = "tier")
public class Tier {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="tier_id")
    private Long id;

    @Column(unique = true)
    private String tierName;
}
