//package com.ssafy.newspeak.user.repository;
//
//import com.ssafy.newspeak.user.entity.userVoca.UserVoca;
//import com.ssafy.newspeak.user.entity.userVoca.UserVocaId;
//import com.ssafy.newspeak.voca.entity.Voca;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.query.Param;
//
//import java.util.List;
//
//
//public interface UserVocaRepo extends JpaRepository<UserVoca, UserVocaId> {
//
//    @Query("SELECT new com.ssafy.newspeak.user.repository.dto.VocaInfoDto(v.title,v.quizSuccessCount) " +
//            "FROM UserVoca uv JOIN uv.voca v WHERE uv.user.id = :userId")
//    List<Voca> findVocaByUserId(@Param("userId") Long userId);
//}
