package com.ssafy.newspeak.conversation.repository;

import com.ssafy.newspeak.conversation.entity.Report;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional
@RequiredArgsConstructor
public class ReportRepository {

    private final EntityManager em;

    public void save(Report report) { em.persist(report);}

    public void delete(Report report) { em.remove(em.merge(report));}

    public Optional<Report> findById(Long id) { return Optional.ofNullable(em.find(Report.class, id));}

    public List<Report> findAll(Long userId) {
        return em.createQuery("SELECT r FROM Report r WHERE r.user.id = :userId", Report.class)
                .setParameter("userId", userId)
                .getResultList();
    }
}
