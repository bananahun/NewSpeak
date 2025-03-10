package com.ssafy.newspeak.voca.controller;

import com.ssafy.newspeak.activitytype.entity.ActivityTypeEnum;
import com.ssafy.newspeak.article.controller.AddWordRequest;
import com.ssafy.newspeak.explog.controller.ExpResult;
import com.ssafy.newspeak.explog.entity.ExpLog;
import com.ssafy.newspeak.explog.service.ExpLogRequest;
import com.ssafy.newspeak.explog.service.ExpLogService;
import com.ssafy.newspeak.security.jwt.MyUserDetails;
import com.ssafy.newspeak.security.util.AuthUtil;
import com.ssafy.newspeak.user.repository.dto.VocaInfoDto;
import com.ssafy.newspeak.voca.entity.Voca;
import com.ssafy.newspeak.voca.repository.dto.WordDetail;
import com.ssafy.newspeak.voca.service.VocaService;
import com.ssafy.newspeak.voca.service.WordQuiz;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/vocas")
public class VocaController {
    private final VocaService vocaService;
    private final ExpLogService expLogService;

    @PostMapping("")
    public ResponseEntity<MakeVocaResponse> makeVoca(@RequestBody VocaPostDto vocaPostDto) {
        MyUserDetails userDetails=AuthUtil.getUserDetails();
        Long vocaId=vocaService.makeVoca(vocaPostDto,userDetails.getUserId());
        return ResponseEntity.ok(new MakeVocaResponse(vocaId));
    }

    @PostMapping("/{vocaId}/word")
    public void addWord( @PathVariable Long vocaId,@RequestBody AddWordRequest addWordRequest) {
        MyUserDetails userDetails= AuthUtil.getUserDetails();
        addWordRequest.setVocaId(vocaId);
        vocaService.addWord(addWordRequest,userDetails.getUserId());
    }

    @DeleteMapping("/{vocaId}/word")
    public void deleteWord( @PathVariable Long vocaId,@RequestBody DeleteWordRequest deleteWordRequest) {
        MyUserDetails userDetails= AuthUtil.getUserDetails();
        deleteWordRequest.setVocaId(vocaId);
        vocaService.deleteWord(deleteWordRequest,userDetails.getUserId());
    }

    @GetMapping("")
    public ResponseEntity<VocasDto> getVocas(){
        MyUserDetails userDetails=AuthUtil.getUserDetails();
        List<VocaInfoDto> vocas= vocaService.getVocasByUserId(userDetails.getUserId());
        return ResponseEntity.ok(new VocasDto(vocas));
    }

    @GetMapping("/{vocaId}")
    public ResponseEntity<WordDetails> getVoca(@PathVariable Long vocaId) {
        MyUserDetails userDetails=AuthUtil.getUserDetails();
        List<WordDetail> wordDetails= vocaService.getVocaById(vocaId,userDetails.getUserId());
        return ResponseEntity.ok(new WordDetails(wordDetails));
    }

    @DeleteMapping("/{vocaId}")
    public ResponseEntity<String> deleteVoca(@PathVariable Long vocaId){
        MyUserDetails userDetails=AuthUtil.getUserDetails();
        vocaService.deleteVocaById(userDetails.getUserId(),vocaId);
        return ResponseEntity.ok("Deleted voca");
    }

    @GetMapping("/{vocaId}/quiz")
    public ResponseEntity<WordQuizs> getQuizsByVoca(@PathVariable Long vocaId){
        MyUserDetails userDetails=AuthUtil.getUserDetails();
        List<WordQuiz> wordQuizs=vocaService.makeQuizByVocaId(vocaId,userDetails.getUserId());

        return ResponseEntity.ok(new WordQuizs(wordQuizs));
    }

    @PostMapping("/{vocaId}/quiz/result")
    public ResponseEntity<ExpResult> postVocaQuizResult(@PathVariable Long vocaId,
                                                        @RequestBody VocaQuizResult vocaQuizResult){
        MyUserDetails userDetails=AuthUtil.getUserDetails();

        ExpLog expLog=expLogService.saveExpLogAndAddToUserExp(ExpLogRequest.from(
            ActivityTypeEnum.VOCAQUIZ,
            userDetails.getUserId(),
            (double) vocaQuizResult.getAnswerCount() / vocaQuizResult.getTotalCount(), vocaId
        ));
        return ResponseEntity.ok(new ExpResult(expLog));
    }
}
