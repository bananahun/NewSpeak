package com.ssafy.newspeak.category.service;

import com.ssafy.newspeak.category.dto.CategoryFindResponse;
import com.ssafy.newspeak.category.entity.Category;
import com.ssafy.newspeak.category.repository.CategoryRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public List<CategoryFindResponse> findAll() {
        List<Category> categories = categoryRepository.findAll();
        List<CategoryFindResponse> categoryFindResponses = new ArrayList<>();
        for (Category category : categories) {
            CategoryFindResponse categoryFindResponse = CategoryFindResponse.from(category);
            categoryFindResponses.add(categoryFindResponse);
        }
        return categoryFindResponses;
    }

    public void delete(Long id) {
        categoryRepository.findById(id)
                .ifPresent(categoryRepository::delete);
    }

    public void deleteAll() {
        categoryRepository.deleteAll();
    }

    public long save(Category category) {
        categoryRepository.save(category);
        return category.getId();
    }
}
