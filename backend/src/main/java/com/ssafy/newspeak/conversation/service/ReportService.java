package com.ssafy.newspeak.conversation.service;

import com.ssafy.newspeak.conversation.dto.report.ReportResponse;
import com.ssafy.newspeak.conversation.repository.ReportRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class ReportService {

    private final ReportRepository reportRepository;

    public ReportResponse create(String subject) {
        return null;
    }

    public ReportResponse findById(Long id) {
        return null;
    }

    public ReportResponse findByTitle(String title) {
        return null;
    }
}
