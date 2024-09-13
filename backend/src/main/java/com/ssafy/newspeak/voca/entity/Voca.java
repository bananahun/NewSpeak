package com.ssafy.newspeak.voca.entity;

import com.ssafy.newspeak.user.entity.User;
import jakarta.persistence.*;

@Entity
@Table(name="voca")
public class Voca {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="voca_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

}
