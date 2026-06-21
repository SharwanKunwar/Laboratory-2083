package com.unpredictable.BookShop.repository;

import com.unpredictable.BookShop.entity.BookEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface BookRepository extends JpaRepository<BookEntity, Long> {
    List<BookEntity> findByAuthor(String author);
    boolean existsByTitleAndAuthor(String title, String author);
}
