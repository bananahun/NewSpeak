package com.example.newspeak.category.repository;

import com.example.newspeak.article.entity.Article;
import com.example.newspeak.category.entity.Category;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class CategoryRepository {

    private final EntityManager em;

    public void save(Category category) { em.persist(category); }

    public void delete(Category category) { em.remove(category); }

    public void deleteAll() { em.createQuery("delete from Category").executeUpdate(); }

    public List<Category> findAll() { return em.createQuery("from Category", Category.class).getResultList(); }

    public Optional<Category> findById(Long id) { return Optional.ofNullable(em.find(Category.class, id)); }
}
