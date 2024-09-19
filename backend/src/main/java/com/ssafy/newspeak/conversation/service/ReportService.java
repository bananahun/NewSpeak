package com.ssafy.newspeak.conversation.service;

import com.ssafy.newspeak.conversation.dto.report.ReportDto;
import com.ssafy.newspeak.conversation.dto.report.ReportResponse;
import com.ssafy.newspeak.conversation.entity.Report;
import com.ssafy.newspeak.conversation.exception.NoSuchReportException;
import com.ssafy.newspeak.conversation.repository.ReportRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class ReportService {

    private final ReportRepository reportRepository;

    public ReportDto create(String content) {
        Report report = Report.of(content);
        reportRepository.save(report);

        return ReportDto.from(report);
    }

    @Transactional(readOnly = true)
    public ReportDto getOne(Long reportId) throws NoSuchReportException {
        return reportRepository.findById(reportId)
                .map(ReportDto::from)
                .orElseThrow(() -> new NoSuchReportException(reportId));
    }

    public ReportResponse findByTitle(String title) {
        return null;
    }
}
