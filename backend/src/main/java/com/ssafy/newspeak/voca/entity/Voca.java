package com.ssafy.newspeak.voca.entity;

import com.ssafy.newspeak.user.entity.User;
import com.ssafy.newspeak.voca.controller.VocaPostDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@Table(name="voca")
@NoArgsConstructor
public class Voca {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="voca_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

    private String title;

    private int quizSuccessCount;

    public Voca(VocaPostDto vocaPostDto, User user){
        this.user=user;
        this.title=vocaPostDto.getTitle();
    }
}
