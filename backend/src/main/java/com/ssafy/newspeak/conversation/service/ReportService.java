package com.ssafy.newspeak.conversation.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.newspeak.conversation.dto.report.BeforeReportCompleteResponse;
import com.ssafy.newspeak.conversation.dto.report.ReportDto;
import com.ssafy.newspeak.conversation.entity.Report;
import com.ssafy.newspeak.conversation.exception.NoSuchReportException;
import com.ssafy.newspeak.conversation.repository.ReportRepository;

import com.ssafy.newspeak.user.entity.User;
import com.ssafy.newspeak.user.repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ReportService {

    private final ReportRepository reportRepository;
    private final UserRepo userRepository;

    public ReportDto create(String title, BeforeReportCompleteResponse content, Long userId) throws JsonProcessingException {
        User user = userRepository.findById(userId)
                .orElseThrow(RuntimeException::new);
        ObjectMapper objectMapper = new ObjectMapper();
        String result = objectMapper.writeValueAsString(content);
        Report report = Report.of(title, result, user);
        reportRepository.save(report);

        return ReportDto.from(report);
    }

    @Transactional(readOnly = true)
    public List<ReportDto> getList(Long userId) {
        return reportRepository.findAll(userId).stream()
                .map(ReportDto::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public ReportDto getOne(Long reportId) throws NoSuchReportException {
        return reportRepository.findById(reportId)
                .map(ReportDto::from)
                .orElseThrow(() -> new NoSuchReportException(reportId));
    }

    public void deleteOne(Long reportId, Long userId) throws NoSuchReportException {
        Report report = reportRepository.findById(reportId)
                .orElseThrow(() -> new NoSuchReportException(reportId));

        if (!report.getUser().getId().equals(userId)) {
            throw new RuntimeException("You do not have permission to delete this report.");
        }

        reportRepository.delete(report);
    }
}
