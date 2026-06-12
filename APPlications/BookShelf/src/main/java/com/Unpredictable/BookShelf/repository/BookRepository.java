package com.Unpredictable.BookShelf.repository;

import com.Unpredictable.BookShelf.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Long> {
    Book findByIsAvailable(boolean isAvailable);
}
