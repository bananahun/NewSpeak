package com.example.newspeak.conversation.repository;

import com.example.newspeak.conversation.entity.Report;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

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

    public List<Report> findAll() { return em.createQuery("from Report", Report.class).getResultList();}
}
