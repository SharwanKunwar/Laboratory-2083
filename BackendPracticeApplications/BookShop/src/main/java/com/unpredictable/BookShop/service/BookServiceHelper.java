package com.unpredictable.BookShop.service;

import com.unpredictable.BookShop.dto.BookRequestDTO;
import com.unpredictable.BookShop.dto.BookResponseDTO;

import java.util.List;

public interface BookServiceHelper {
    BookResponseDTO addBook(BookRequestDTO request);
    List<BookResponseDTO> getAllBooks();
    List<BookResponseDTO> getBooksByAuthor(String author);
    void deleteBookById(Long id);
}
