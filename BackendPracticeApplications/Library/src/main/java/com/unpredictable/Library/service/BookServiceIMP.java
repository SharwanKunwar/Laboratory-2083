package com.unpredictable.Library.service;

import com.unpredictable.Library.dto.BookRequestDTO;
import com.unpredictable.Library.dto.BookResponseDTO;
import com.unpredictable.Library.entity.Book;
import com.unpredictable.Library.mapper.BookMapper;
import com.unpredictable.Library.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookServiceIMP implements BookServiceHelper {

    private final BookRepository bookRepository;
    private final BookMapper bookMapper;



    @Override
    public BookResponseDTO addBook(BookRequestDTO request) {
        Book book = bookMapper.mapToEntity(request);
        Book savedBook = bookRepository.save(book);
        return bookMapper.mapToResponse(savedBook);
    }


    @Override
    public List<BookResponseDTO> getAllBooks() {
        return bookRepository.findAll()
                .stream()
                .map(bookMapper::mapToResponse)
                .toList();
    }


    @Override
    public List<BookResponseDTO> getBooksByAuthor(String author) {
        List<Book> books = bookRepository.findByAuthor(author);
        return books.stream()
                .map(bookMapper::mapToResponse)
                .toList();
    }

    @Override
    public void deleteBookById(Long id) {
        Book book = bookRepository.findById(id).orElseThrow(() -> new RuntimeException("Book not found"));
        bookRepository.delete(book);
    }
}
