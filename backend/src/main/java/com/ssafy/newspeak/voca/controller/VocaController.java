package com.ssafy.newspeak.voca.controller;

import com.ssafy.newspeak.security.jwt.MyUserDetails;
import com.ssafy.newspeak.security.util.AuthUtil;
import com.ssafy.newspeak.user.repository.dto.VocaInfoDto;
import com.ssafy.newspeak.voca.entity.Voca;
import com.ssafy.newspeak.voca.service.VocaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/vocas")
public class VocaController {
    private final VocaService vocaService;
    @PostMapping("")
    public void makeVoca(@RequestBody VocaPostDto vocaPostDto) {
        MyUserDetails userDetails=AuthUtil.getUserDetails();
        vocaService.makeVoca(vocaPostDto,userDetails.getUserId());
    }

    @GetMapping("")
    public ResponseEntity<VocasDto> getVocas(){
        MyUserDetails userDetails=AuthUtil.getUserDetails();
        List<VocaInfoDto> vocas= vocaService.getVocasByUserId(userDetails.getUserId());
        return ResponseEntity.ok(new VocasDto(vocas));
    }

    @GetMapping("/{vocaId}")
    public VocaDto getVoca(@PathVariable Long vocaId) {
        MyUserDetails userDetails=AuthUtil.getUserDetails();
        Voca voca= vocaService.getVocaById(vocaId,userDetails.getUserId());
        return new VocaDto(voca);
    }

    @DeleteMapping("/{vocaId}")
    public ResponseEntity<String> deleteVoca(@PathVariable Long vocaId){
        MyUserDetails userDetails=AuthUtil.getUserDetails();
        vocaService.deleteVocaById(userDetails.getUserId(),vocaId);
        return ResponseEntity.ok("Deleted voca");
    }
}
