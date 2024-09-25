package com.ssafy.newspeak.conversation.service;

import com.ssafy.newspeak.conversation.dto.report.ReportDto;
import com.ssafy.newspeak.conversation.dto.report.ReportResponse;
import com.ssafy.newspeak.conversation.entity.Report;
import com.ssafy.newspeak.conversation.exception.NoSuchReportException;
import com.ssafy.newspeak.conversation.repository.ReportRepository;

import com.ssafy.newspeak.user.entity.User;
import com.ssafy.newspeak.user.repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class ReportService {

    private final ReportRepository reportRepository;
    private final UserRepo userRepository;

    public ReportDto create(String content) {
//        User user = userRepository.findById(userId)
//                .orElseThrow(RuntimeException::new);
        Report report = Report.of(content);
        reportRepository.save(report);

        return ReportDto.from(report);
    }

    @Transactional(readOnly = true)
    public List<ReportDto> getList() {
        return reportRepository.findAll().stream()
                .map(ReportDto::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public ReportDto getOne(Long reportId) throws NoSuchReportException {
        return reportRepository.findById(reportId)
                .map(ReportDto::from)
                .orElseThrow(() -> new NoSuchReportException(reportId));
    }

//    public ReportResponse findByUser

    public void deleteOne(Long reportId) throws NoSuchReportException {
        Report report = reportRepository.findById(reportId)
                .orElseThrow(RuntimeException::new);
        reportRepository.delete(report);
    }
}
