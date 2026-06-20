package com.unpredictable.Library.service;

import com.unpredictable.Library.dto.BookRequestDTO;
import com.unpredictable.Library.dto.BookResponseDTO;

import java.util.List;

public interface BookServiceHelper {
    BookResponseDTO addBook(BookRequestDTO request);
    List<BookResponseDTO> getAllBooks();
    List<BookResponseDTO> getBooksByAuthor(String author);
    void deleteBookById(Long id);
    //BookResponseDTO updateBook(BookRequestDTO request);
}
